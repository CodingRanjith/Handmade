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
    <footer
      id="footer"
      className="relative mt-10 overflow-hidden border-t border-hm-border bg-gradient-to-br from-hm-primary via-[#8f2448] to-[#c44536] text-white"
    >
      <div className="pointer-events-none absolute -right-16 top-0 h-56 w-56 rounded-full bg-hm-teal/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-hm-gold/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-14 sm:px-8 lg:grid-cols-5 lg:gap-10">
        <div className="col-span-2 lg:col-span-1">
          <p className="font-display text-3xl text-white">HandMade</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
            India&apos;s premium gifting experience — personalized, corporate, and surprise.
          </p>
        </div>
        {footerColumns.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
              {col.title}
            </p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="inline-flex min-h-9 items-center text-sm text-white/80 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="relative border-t border-white/15 px-5 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-center text-xs text-white/60 sm:px-8">
        © {new Date().getFullYear()} HandMade · Crafted for memorable moments
      </div>
    </footer>
  )
}
