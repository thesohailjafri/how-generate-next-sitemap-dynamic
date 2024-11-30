import { client } from '@/sanity/client'
import { SanityDocument } from 'next-sanity'

const siteUrl = 'https://example.com'
const defaultPriority = 0.8
const defaultFrequency = 'weekly'
const POSTS_QUERY = `*[
	_type == "post"
	&& defined(slug.current) 	
]
{	slug }	
|order(title asc)[0...12]{_id, title, slug, publishedAt}`

export async function GET() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY)

  const urls = posts
    .filter((post) => post.slug.current)
    .map((post) => `${siteUrl}/posts/${post.slug.current}`)

  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls
          .map((location) => {
            return `<url>
                        <loc>${location}</loc>
                        <changefreq>${defaultFrequency}</changefreq>
                        <priority>${defaultPriority}</priority>
                    </url>`
          })
          .join('')}
    </urlset>`

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
