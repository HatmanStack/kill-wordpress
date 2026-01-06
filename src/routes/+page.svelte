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

	<a href="/why" class="cta">Why This Matters</a>
</main>

<style>
	.updated {
		color: var(--text-muted);
		font-size: 0.8rem;
		margin-top: 2rem;
	}
</style>
