import { client } from '@/sanity/client'
import { SanityDocument } from 'next-sanity'
import Link from 'next/link'

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(title asc)[0...12]{_id, title, slug, publishedAt}`

export default async function Page() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY)

  return (
    <div className="">
      <h1>Posts Page</h1>
      <p>All the posts will be listed here.</p>
      <div className="ol">
        {posts.map((post) => {
          return (
            <div className="li" key={post.title}>
              <Link href={`/posts/${post.slug.current}`}>{post.title}</Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
