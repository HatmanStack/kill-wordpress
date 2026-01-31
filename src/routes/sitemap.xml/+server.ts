import stats from '$lib/data/stats.json';

const site = 'https://tracker.hatstack.fun';

export function GET() {
	const lastmod = new Date(stats.generated).toISOString().split('T')[0];

	const pages = [
		{ url: '/', changefreq: 'daily', priority: '1.0', lastmod },
		{ url: '/wordpress-security-problem', changefreq: 'monthly', priority: '0.8', lastmod: '2026-01-05' }
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${site}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
}

export const prerender = true;
