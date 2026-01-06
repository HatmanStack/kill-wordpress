<article>
	<h1>WordPress Has a Security Problem Nobody Talks About</h1>

	<p>WordPress powers 43% of the web. It also accounts for over 90% of CMS-related security incidents.</p>

	<p>This isn't an opinion piece. It's a tally.</p>

	<h2>By the numbers</h2>

	<p><strong>2025:</strong></p>
	<ul>
		<li>10,575 documented vulnerabilities across WordPress core, plugins, and themes</li>
		<li>27% increase over 2024's 8,286</li>
		<li>95% were plugin vulnerabilities</li>
	</ul>

	<p>That's 29 new vulnerabilities per day. Every day.</p>

	<h2>The plugin ecosystem is the attack surface</h2>

	<p>WordPress core is reasonably secure. The issue is the 60,000+ plugins that site owners install and forget about.</p>

	<ul>
		<li>The average WordPress site runs 20-30 plugins</li>
		<li>52% of plugins with known vulnerabilities are still installed on live sites 90 days after disclosure</li>
		<li>Many site owners don't know a plugin was compromised until their site is defaced or blacklisted</li>
	</ul>

	<h2>"Just keep it updated" isn't a strategy</h2>

	<p>The standard advice is to enable auto-updates. But:</p>

	<ul>
		<li>Plugin updates regularly break sites</li>
		<li>Many plugins are abandoned (no updates coming)</li>
		<li>Updates don't help when you're in the 3-day exploitation window</li>
	</ul>

	<p>Running WordPress responsibly requires constant vigilance. You need to monitor security feeds, test updates in staging, maintain backups, and pray your hosting provider's WAF catches what you miss.</p>

	<p>That's not a website. That's a part-time job.</p>

	<h2>The attack economics favor attackers</h2>

	<p>WordPress's market share makes it the obvious target. Write one exploit, potentially hit millions of sites. Attackers don't need to find your site—they scan the entire internet for vulnerable plugin versions.</p>

	<p>This isn't theoretical. Automated scanners probe WordPress sites constantly. The comments section of this site's author was recently hit with the exact probes we're describing—SQL injection tests, template injection attempts, PHP code execution payloads. All automated. All from the same IP. All in one afternoon.</p>

	<h2>The alternative isn't hard</h2>

	<p>Most WordPress sites are brochure sites, blogs, or simple storefronts. They don't need:</p>

	<ul>
		<li>A database</li>
		<li>Server-side PHP</li>
		<li>A plugin for every feature</li>
	</ul>

	<p>A static site generator eliminates this entire attack surface. No PHP, no MySQL, no plugins, no updates, no vulnerabilities.</p>

	<p>Same result. Zero maintenance. Nothing to exploit.</p>

	<p>The tooling has caught up. Astro, Hugo, 11ty, Next.js—these aren't experimental anymore. They're production-ready, often faster, and they deploy for free on Cloudflare Pages, Vercel, or Netlify.</p>

	<h2>Who should still use WordPress?</h2>

	<p>No one.</p>

	<h2>The point of this site</h2>

	<p>We're not here to sell you anything. We just count vulnerabilities and let the numbers speak.</p>

	<a href="/" class="cta">See the current count</a>
</article>
