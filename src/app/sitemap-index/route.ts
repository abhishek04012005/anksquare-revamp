import { getNumberOfSitemapChunks } from '@/lib/sitemap-utils'

export async function GET(request: Request) {
  const baseUrl = 'https://anksquare.com'
  
  try {
    const numberOfChunks = getNumberOfSitemapChunks()

    const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from({ length: numberOfChunks }, (_, index) => {
  const sitemapIndex = index + 1
  return `  <sitemap>
    <loc>${baseUrl}/sitemap/${sitemapIndex}.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>`
}).join('\n')}
</sitemapindex>`

    return new Response(sitemapIndexXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap index:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
