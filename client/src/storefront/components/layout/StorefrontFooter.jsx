import { Link } from 'react-router-dom'
import { storefrontNav } from '@/storefront/data/home'

export function StorefrontFooter() {
  return (
    <footer className="border-t border-hm-border bg-hm-muted/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl text-hm-text">HandMade</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-hm-text-muted">
            Quiet luxury gifts, crafted with intention — for people and brands who value the
            handmade.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-hm-text-subtle">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5">
            {storefrontNav.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="text-sm text-hm-text-muted transition hover:text-hm-text">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-hm-text-subtle">
            Studio
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-hm-text-muted">
            <li>
              <Link to="/contact" className="transition hover:text-hm-text">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/faq" className="transition hover:text-hm-text">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/admin" className="transition hover:text-hm-text">
                Admin ERP
              </Link>
            </li>
            <li>
              <Link to="/design-system" className="transition hover:text-hm-text">
                Design System
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-hm-border px-5 py-5 text-center text-xs text-hm-text-subtle sm:px-8">
        © {new Date().getFullYear()} HandMade. Crafted with care.
      </div>
    </footer>
  )
}
