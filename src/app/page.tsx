import Link from 'next/link'

export default function Page() {
  return (
    <div className="">
      <h1>Home Page</h1>
      <ul>
        <li>
          <Link href="/blogs">Blogs</Link>
        </li>
        <li>
          <Link href="/posts">Posts</Link>
        </li>
      </ul>
    </div>
  )
}
