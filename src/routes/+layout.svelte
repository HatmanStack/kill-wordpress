<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>WordPress Security Tracker</title>
	<meta name="description" content="Tracking WordPress vulnerabilities so you don't have to." />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
</svelte:head>

<nav class="nav">
	<a href="/">Tracker</a>
	<a href="/why">Why This Matters</a>
</nav>

{@render children()}

<footer class="footer">
	<p>Data sourced from WPScan, Wordfence, and NVD. Updated daily.</p>
	<p>Not affiliated with WordPress. Just counting.</p>
</footer>
