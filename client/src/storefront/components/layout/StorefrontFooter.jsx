import { Link } from 'react-router-dom'
import { storefrontNav } from '@/storefront/data/home'

export function StorefrontFooter() {
  return (
    <footer className="border-t border-hm-border bg-hm-muted/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-display text-3xl text-hm-text">HandMade</p>
          <p className="mt-3 text-sm leading-relaxed text-hm-text-muted">
            Quiet luxury gifts, crafted with intention.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-hm-text-subtle">Shop</p>
          <ul className="mt-4 space-y-2.5">
            {storefrontNav.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="text-sm text-hm-text-muted hover:text-hm-text">
                  {item.label}
                </Link>
              </li>
            ))}
            <li><Link to="/bulk-orders" className="text-sm text-hm-text-muted hover:text-hm-text">Bulk orders</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-hm-text-subtle">Help</p>
          <ul className="mt-4 space-y-2.5 text-sm text-hm-text-muted">
            <li><Link to="/faq" className="hover:text-hm-text">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-hm-text">Contact</Link></li>
            <li><Link to="/account/orders" className="hover:text-hm-text">Track order</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-hm-text-subtle">Account</p>
          <ul className="mt-4 space-y-2.5 text-sm text-hm-text-muted">
            <li><Link to="/login" className="hover:text-hm-text">Login</Link></li>
            <li><Link to="/signup" className="hover:text-hm-text">Sign up</Link></li>
            <li><Link to="/account" className="hover:text-hm-text">My account</Link></li>
            <li><Link to="/wishlist" className="hover:text-hm-text">Wishlist</Link></li>
            <li><Link to="/admin" className="hover:text-hm-text">Admin ERP</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-hm-border px-5 py-5 text-center text-xs text-hm-text-subtle sm:px-8">
        © {new Date().getFullYear()} HandMade
      </div>
    </footer>
  )
}
