/**
 * WordPress Vulnerability Scraper
 *
 * Pulls from Wordfence Intelligence API (free, no auth required for basic access)
 * https://www.wordfence.com/threat-intel/
 *
 * Run: npx tsx scripts/scrape.ts
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

const WORDFENCE_API = 'https://www.wordfence.com/api/intelligence/v2/vulnerabilities/production';

interface WordfenceVuln {
	id: string;
	title: string;
	software: Array<{
		type: string;
		name: string;
		slug: string;
		affected_versions: Record<string, { from_version: string; to_version: string }>;
	}>;
	cvss?: {
		score: number;
		rating: string;
	};
	cwe?: {
		id: string;
		name: string;
	};
	published: string;
	updated: string;
	references?: string[];
}

interface ProcessedVuln {
	id: string;
	name: string;
	severity: 'critical' | 'high' | 'medium' | 'low';
	type: 'plugin' | 'theme' | 'core';
	software: string;
	published: string;
	cvssScore: number;
}

interface Stats {
	generated: string;
	totals: {
		year2024: number;
		year2025: number;
		year2026: number;
	};
	last30Days: {
		plugins: number;
		themes: number;
		core: number;
		total: number;
	};
	recentVulns: ProcessedVuln[];
	bySeverity: {
		critical: number;
		high: number;
		medium: number;
		low: number;
	};
}

function getSeverity(cvssScore: number | undefined): ProcessedVuln['severity'] {
	if (!cvssScore) return 'medium';
	if (cvssScore >= 9.0) return 'critical';
	if (cvssScore >= 7.0) return 'high';
	if (cvssScore >= 4.0) return 'medium';
	return 'low';
}

function getType(software: WordfenceVuln['software']): ProcessedVuln['type'] {
	if (!software?.length) return 'plugin';
	const type = software[0].type?.toLowerCase();
	if (type === 'theme') return 'theme';
	if (type === 'core') return 'core';
	return 'plugin';
}

async function fetchVulnerabilities(): Promise<WordfenceVuln[]> {
	console.log('Fetching from Wordfence Intelligence API...');

	const response = await fetch(WORDFENCE_API);

	if (!response.ok) {
		throw new Error(`API request failed: ${response.status} ${response.statusText}`);
	}

	const data = await response.json();

	// Wordfence returns an object with vuln IDs as keys
	const vulns = Object.values(data) as WordfenceVuln[];
	console.log(`Fetched ${vulns.length} total vulnerabilities`);

	return vulns;
}

function processVulnerabilities(vulns: WordfenceVuln[]): Stats {
	const now = new Date();
	const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
	const year2024Start = new Date('2024-01-01');
	const year2025Start = new Date('2025-01-01');
	const year2026Start = new Date('2026-01-01');

	let year2024 = 0;
	let year2025 = 0;
	let year2026 = 0;
	const last30Days = { plugins: 0, themes: 0, core: 0, total: 0 };
	const bySeverity = { critical: 0, high: 0, medium: 0, low: 0 };

	const processed: ProcessedVuln[] = [];

	for (const vuln of vulns) {
		const published = new Date(vuln.published);
		const severity = getSeverity(vuln.cvss?.score);
		const type = getType(vuln.software);

		// Count by year
		if (published >= year2026Start) {
			year2026++;
		} else if (published >= year2025Start) {
			year2025++;
		} else if (published >= year2024Start) {
			year2024++;
		}

		// Count last 30 days
		if (published >= thirtyDaysAgo) {
			last30Days.total++;
			last30Days[type === 'plugin' ? 'plugins' : type === 'theme' ? 'themes' : 'core']++;
		}

		// Count by severity (all time)
		bySeverity[severity]++;

		// Store processed version
		processed.push({
			id: vuln.id,
			name: vuln.title,
			severity,
			type,
			software: vuln.software?.[0]?.name || 'Unknown',
			published: vuln.published,
			cvssScore: vuln.cvss?.score || 0
		});
	}

	// Sort by date, get most recent
	processed.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());

	const recentVulns = processed
		.filter(v => v.severity === 'critical' || v.severity === 'high')
		.slice(0, 10);

	return {
		generated: now.toISOString(),
		totals: { year2024, year2025, year2026 },
		last30Days,
		recentVulns,
		bySeverity
	};
}

async function main() {
	try {
		const vulns = await fetchVulnerabilities();
		const stats = processVulnerabilities(vulns);

		const outputPath = join(import.meta.dirname, '../src/lib/data/stats.json');
		writeFileSync(outputPath, JSON.stringify(stats, null, 2));

		console.log('\nStats generated:');
		console.log(`  2024: ${stats.totals.year2024} vulnerabilities`);
		console.log(`  2025: ${stats.totals.year2025} vulnerabilities`);
		console.log(`  2026: ${stats.totals.year2026} vulnerabilities`);
		console.log(`  Last 30 days: ${stats.last30Days.total} total`);
		console.log(`    - Plugins: ${stats.last30Days.plugins}`);
		console.log(`    - Themes: ${stats.last30Days.themes}`);
		console.log(`    - Core: ${stats.last30Days.core}`);
		console.log(`\nWritten to: ${outputPath}`);
	} catch (error) {
		console.error('Error:', error);
		process.exit(1);
	}
}

main();
