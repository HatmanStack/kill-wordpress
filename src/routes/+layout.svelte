<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<meta name="description" content="10,575 WordPress vulnerabilities in 2025. 29 new ones per day. Track the count." />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="canonical" href="https://tracker.hatstack.fun" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="WordPress Security Tracker" />
	<meta property="og:title" content="WordPress Security Tracker" />
	<meta property="og:description" content="10,575 WordPress vulnerabilities in 2025. 29 new ones per day. 95% from plugins." />
	<meta property="og:url" content="https://tracker.hatstack.fun" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="WordPress Security Tracker" />
	<meta name="twitter:description" content="10,575 WordPress vulnerabilities in 2025. 29 new ones per day." />
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
