import { client } from '@/sanity/client'
import { SanityDocument } from 'next-sanity'
import Link from 'next/link'

const POSTS_QUERY = `*[
	_type == "post"
	&& defined(slug.current) 	
]
{	slug }	
|order(title asc)[0...12]{_id, title, slug, publishedAt}`

const POST_SLUG_QUERY = `
	*[_type == "post" && slug.current == $slug][0] {
		_id,
		title,
		slug,
		publishedAt,
		body
	}
`

export async function generateStaticParams() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY)
  return posts.map((post) => ({
    slug: post.slug.current,
  }))
}

interface PageParams {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: PageParams) {
  const { slug } = await params
  const post = await client.fetch(POST_SLUG_QUERY, { slug })
  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.publishedAt}</p>
      <p>{post.body}</p>
      <Link href="/posts">Back to posts</Link>
    </main>
  )
}
