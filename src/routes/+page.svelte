<script lang="ts">
	import stats from '$lib/data/stats.json';

	const generated = new Date(stats.generated).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
</script>

<svelte:head>
	<title>WordPress Security Tracker | {stats.totals.year2025.toLocaleString()} Vulnerabilities in 2025</title>
	<meta name="description" content="{stats.totals.year2025.toLocaleString()} WordPress vulnerabilities in 2025. {stats.totals.year2026} so far in 2026. Track plugin, theme, and core security issues daily." />
	<link rel="canonical" href="https://tracker.hatstack.fun" />

	<meta property="og:type" content="website" />
	<meta property="og:title" content="WordPress Security Tracker | {stats.totals.year2025.toLocaleString()} Vulnerabilities" />
	<meta property="og:description" content="{stats.totals.year2025.toLocaleString()} WordPress vulnerabilities in 2025. {Math.round(stats.totals.year2025 / 365)} new ones per day. 95% from plugins." />
	<meta property="og:url" content="https://tracker.hatstack.fun" />

	<meta name="twitter:title" content="WordPress Security Tracker" />
	<meta name="twitter:description" content="{stats.totals.year2025.toLocaleString()} WordPress vulnerabilities in 2025. Updated daily." />

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "Dataset",
		"name": "WordPress Vulnerability Statistics",
		"description": "Daily-updated statistics on WordPress core, plugin, and theme vulnerabilities sourced from Wordfence Intelligence.",
		"url": "https://tracker.hatstack.fun",
		"license": "https://creativecommons.org/publicdomain/zero/1.0/",
		"creator": {
			"@type": "Organization",
			"name": "WordPress Security Tracker"
		},
		"temporalCoverage": "2024/2026",
		"variableMeasured": [
			{
				"@type": "PropertyValue",
				"name": "2025 Vulnerabilities",
				"value": ${stats.totals.year2025}
			},
			{
				"@type": "PropertyValue",
				"name": "2026 Vulnerabilities",
				"value": ${stats.totals.year2026}
			},
			{
				"@type": "PropertyValue",
				"name": "Last 30 Days",
				"value": ${stats.last30Days.total}
			}
		]
	}
	</script>`}
</svelte:head>

<main>
	<h1>WordPress Security Tracker</h1>
	<p>Counting vulnerabilities so you don't have to.</p>

	<div class="stat-grid">
		<div class="stat-card">
			<div class="number">{stats.totals.year2025.toLocaleString()}</div>
			<div class="label">Vulnerabilities in 2025</div>
		</div>
		<div class="stat-card">
			<div class="number">{stats.totals.year2026.toLocaleString()}</div>
			<div class="label">2026 (so far)</div>
		</div>
		<div class="stat-card">
			<div class="number">{stats.last30Days.total.toLocaleString()}</div>
			<div class="label">Last 30 days</div>
		</div>
	</div>

	<h2>Last 30 Days Breakdown</h2>
	<ul class="vuln-list">
		<li>
			<span class="vuln-info">
				<span class="vuln-name">{stats.last30Days.plugins} plugin vulnerabilities</span>
			</span>
		</li>
		<li>
			<span class="vuln-info">
				<span class="vuln-name">{stats.last30Days.themes} theme vulnerabilities</span>
			</span>
		</li>
		<li>
			<span class="vuln-info">
				<span class="vuln-name">{stats.last30Days.core} core vulnerabilities</span>
			</span>
		</li>
	</ul>

	<h2>Recent Critical & High Severity</h2>
	<ul class="vuln-list">
		{#each stats.recentVulns as vuln}
			<li>
				<span class="severity {vuln.severity}">{vuln.severity}</span>
				<span class="vuln-info">
					<span class="vuln-name">{vuln.name}</span>
					<span class="vuln-installs">CVSS {vuln.cvssScore} · {vuln.software}</span>
				</span>
			</li>
		{/each}
	</ul>

	<p class="updated">Last updated: {generated}</p>

	<a href="/wordpress-security-problem" class="cta">Why This Matters</a>
</main>

<style>
	.updated {
		color: var(--text-muted);
		font-size: 0.8rem;
		margin-top: 2rem;
	}
</style>
