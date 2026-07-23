import { Link } from 'react-router-dom'
import { primaryNav } from '@/storefront/config/sitemap'

const footerColumns = [
  {
    title: 'Shop',
    links: [
      ...primaryNav,
      { label: 'Gift Ideas', path: '/gift-ideas' },
    ],
  },
  {
    title: 'Surprise',
    links: [
      { label: 'Local Surprise', path: '/surprise/local' },
      { label: 'Digital Surprise', path: '/surprise/digital' },
      { label: 'AI Gift Finder', path: '/ai/quiz' },
      { label: 'Gift Registry', path: '/registry' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'FAQ', path: '/faq' },
      { label: 'Contact', path: '/contact' },
      { label: 'Track order', path: '/track-order' },
      { label: 'Refer & Earn', path: '/refer' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Login', path: '/login' },
      { label: 'Sign up', path: '/signup' },
      { label: 'My account', path: '/account' },
      { label: 'Wishlist', path: '/wishlist' },
    ],
  },
]

export function StorefrontFooter() {
  return (
    <footer id="footer" className="border-t border-hm-border bg-hm-muted/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-5">
        <div className="md:col-span-1">
          <p className="font-display text-3xl text-hm-text">HandMade</p>
          <p className="mt-3 text-sm leading-relaxed text-hm-text-muted">
            India&apos;s premium gifting experience — personalized, corporate, and surprise.
          </p>
        </div>
        {footerColumns.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-hm-text-subtle">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-sm text-hm-text-muted hover:text-hm-text">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-hm-border px-5 py-5 text-center text-xs text-hm-text-subtle sm:px-8">
        © {new Date().getFullYear()} HandMade · Crafted for memorable moments
      </div>
    </footer>
  )
}
