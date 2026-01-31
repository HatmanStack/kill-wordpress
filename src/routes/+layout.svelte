<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<meta property="og:site_name" content="WordPress Security Tracker" />
	<meta property="og:image" content="https://tracker.hatstack.fun/og-image.webp" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="https://tracker.hatstack.fun/og-image.webp" />

	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": "WordPress Security Tracker",
		"url": "https://tracker.hatstack.fun",
		"description": "Track WordPress vulnerabilities in real-time. Updated daily with data from Wordfence Intelligence.",
		"publisher": {
			"@type": "Organization",
			"name": "WordPress Security Tracker",
			"url": "https://tracker.hatstack.fun"
		}
	}
	</script>`}
</svelte:head>

<nav class="nav">
	<a href="/">Tracker</a>
	<a href="/wordpress-security-problem">Why This Matters</a>
</nav>

{@render children()}

<footer class="footer">
	<p>Data sourced from WPScan, Wordfence, and NVD. Updated daily.</p>
	<p>Not affiliated with WordPress. Just counting.</p>
</footer>
