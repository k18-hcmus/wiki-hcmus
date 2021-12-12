import Link from 'next/link'
const SiteHeader = () => {
  return (
    <div className="site-header">
      <div className="left-site-header">
        <Link href={'/'}>
          <a>
            <h1>Create Post</h1>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default SiteHeader
