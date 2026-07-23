import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  Bell,
  Building2,
  ChevronDown,
  Heart,
  MapPin,
  Menu,
  Moon,
  Search,
  ShoppingBag,
  Sun,
  Truck,
  User,
  X,
} from 'lucide-react'
import { primaryNav } from '@/storefront/config/sitemap'
import { Button } from '@/shared/components/ui/Button'
import { useTheme } from '@/shared/hooks/useTheme'
import { useCart } from '@/storefront/hooks/useCart'
import { cn } from '@/shared/utils/cn'

export function StorefrontHeader() {
  const { toggleTheme, isDark } = useTheme()
  const { count } = useCart()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  function onSearch(e) {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-hm-border bg-hm-elevated shadow-hm-soft">
      {/* Top announcement bar */}
      <div className="bg-hm-primary text-hm-bg-elevated">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-1.5 text-center text-[11px] font-medium tracking-wide sm:text-xs">
          <Truck className="hidden h-3.5 w-3.5 shrink-0 sm:block" />
          <span>India&apos;s most premium gifting experience — curated delivery nationwide</span>
        </div>
      </div>

      {/* Main utility bar */}
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6 lg:px-8">
        <button
          type="button"
          className="rounded-lg p-2 text-hm-text hover:bg-hm-muted lg:hidden"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/" className="shrink-0">
          <span className="font-display text-2xl tracking-tight text-hm-text sm:text-3xl">
            HandMade
          </span>
        </Link>

        <button
          type="button"
          className="hidden max-w-[140px] items-center gap-1.5 rounded-lg border border-hm-border px-2.5 py-2 text-left hover:border-hm-accent md:flex"
        >
          <MapPin className="h-4 w-4 shrink-0 text-hm-accent" />
          <span className="min-w-0">
            <span className="block text-[10px] text-hm-text-subtle">Where to deliver?</span>
            <span className="flex items-center gap-0.5 text-xs font-semibold text-hm-text">
              Select city
              <ChevronDown className="h-3.5 w-3.5 text-hm-text-muted" />
            </span>
          </span>
        </button>

        <form onSubmit={onSearch} className="relative hidden min-w-0 flex-1 sm:block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-hm-text-subtle" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search gifts, occasions, surprises..."
            className="h-11 w-full rounded-xl border border-hm-border bg-hm-bg pl-10 pr-4 text-sm text-hm-text outline-none transition placeholder:text-hm-text-subtle focus:border-hm-accent focus:ring-2 focus:ring-hm-ring"
            aria-label="Search"
          />
        </form>

        <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
          <Link
            to="/reminders"
            className="hidden items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-hm-text-muted hover:bg-hm-muted hover:text-hm-text xl:flex"
          >
            <Bell className="h-4 w-4" />
            My Reminders
          </Link>
          <Link
            to="/corporate"
            className="hidden items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-hm-text-muted hover:bg-hm-muted hover:text-hm-text lg:flex"
          >
            <Building2 className="h-4 w-4" />
            Corporate
          </Link>
          <Link to="/search" className="rounded-lg p-2 text-hm-text hover:bg-hm-muted sm:hidden">
            <Search className="h-5 w-5" />
          </Link>
          <Link to="/wishlist" className="rounded-lg p-2 text-hm-text hover:bg-hm-muted" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
          </Link>
          <Link to="/cart" className="relative rounded-lg p-2 text-hm-text hover:bg-hm-muted" aria-label="Cart">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 ? (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-hm-accent px-1 text-[10px] font-bold text-hm-primary">
                {count}
              </span>
            ) : null}
          </Link>
          <Link
            to="/account"
            className="hidden items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-hm-text-muted hover:bg-hm-muted hover:text-hm-text sm:flex"
          >
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Account</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            className="text-hm-text"
            onClick={toggleTheme}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Category nav strip */}
      <nav
        className="hidden border-t border-hm-border lg:block"
        aria-label="Primary"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-6 lg:px-8">
          {primaryNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'shrink-0 border-b-2 border-transparent px-3 py-3 text-[13px] font-semibold tracking-wide text-hm-text-muted transition hover:text-hm-text',
                  isActive && 'border-hm-accent text-hm-text',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      {open ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-hm-overlay lg:hidden"
            onClick={() => setOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-[300px] overflow-y-auto border-r border-hm-border bg-hm-elevated p-6 lg:hidden">
            <div className="mb-8 flex items-center justify-between">
              <p className="font-display text-2xl text-hm-text">HandMade</p>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-hm-text-muted hover:bg-hm-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {primaryNav.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="text-lg text-hm-text"
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/corporate" onClick={() => setOpen(false)} className="text-lg text-hm-text">
                Corporate
              </Link>
              <Link to="/cart" onClick={() => setOpen(false)} className="text-lg text-hm-text">
                Bag ({count})
              </Link>
              <Link to="/login" onClick={() => setOpen(false)} className="text-lg text-hm-text">
                Sign in
              </Link>
            </nav>
          </aside>
        </>
      ) : null}
    </header>
  )
}
