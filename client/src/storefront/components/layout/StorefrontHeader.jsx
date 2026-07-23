import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  Bell,
  Heart,
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
  const { count, openCart } = useCart()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  function onSearch(e) {
    e.preventDefault()
    const q = query.trim()
    setOpen(false)
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-hm-border/80 bg-hm-elevated/90 shadow-hm-soft backdrop-blur-xl">
      <div className="bg-gradient-to-r from-hm-primary via-[#9a2748] to-hm-accent text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-1.5 text-center text-[11px] font-medium tracking-wide sm:text-xs">
          <Truck className="hidden h-3.5 w-3.5 shrink-0 sm:block" />
          <span className="line-clamp-1">
            India&apos;s most premium gifting experience — curated delivery nationwide
          </span>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2.5 sm:gap-4 sm:px-6 sm:py-3 lg:px-8">
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-hm-text hover:bg-hm-muted lg:hidden"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/" className="min-w-0 shrink-0">
          <span className="font-display text-xl tracking-tight text-hm-primary sm:text-3xl">
            HandMade
          </span>
        </Link>

        <form onSubmit={onSearch} className="relative hidden min-w-0 flex-1 md:block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-hm-text-subtle" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search gifts, occasions, surprises..."
            className="h-11 w-full rounded-xl border border-hm-border bg-white/80 pl-10 pr-4 text-sm text-hm-text outline-none transition placeholder:text-hm-text-subtle focus:border-hm-accent focus:ring-2 focus:ring-hm-ring"
            aria-label="Search"
          />
        </form>

        <div className="ml-auto flex min-w-0 shrink-0 items-center">
          <Link
            to="/search"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-hm-text hover:bg-hm-muted md:hidden"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            to="/wishlist"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-hm-text hover:bg-hm-muted"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
          </Link>
          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-hm-text hover:bg-hm-muted"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 ? (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-hm-accent px-1 text-[10px] font-bold text-hm-primary">
                {count}
              </span>
            ) : null}
          </button>
          <Link
            to="/account"
            className="hidden min-h-11 min-w-11 items-center justify-center rounded-lg text-hm-text hover:bg-hm-muted sm:inline-flex"
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            to="/reminders"
            className="hidden min-h-11 min-w-11 items-center justify-center rounded-lg text-hm-text hover:bg-hm-muted sm:inline-flex"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            className="hidden text-hm-text sm:inline-flex"
            onClick={toggleTheme}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <nav className="hidden border-t border-hm-border lg:block" aria-label="Primary">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-6 lg:px-8">
          {primaryNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'shrink-0 border-b-2 border-transparent px-3 py-3 text-[13px] font-semibold tracking-wide text-hm-text-muted transition hover:text-hm-primary',
                  isActive && 'border-hm-accent text-hm-primary',
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
          <aside className="fixed inset-y-0 left-0 z-50 flex w-[min(300px,100vw)] flex-col overflow-y-auto border-r border-hm-border bg-hm-elevated p-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pl-[max(1.25rem,env(safe-area-inset-left))] lg:hidden">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-display text-2xl text-hm-text">HandMade</p>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-hm-text-muted hover:bg-hm-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={onSearch} className="relative mb-5">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-hm-text-subtle" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search gifts…"
                className="h-11 w-full rounded-xl border border-hm-border bg-hm-bg pl-10 pr-3 text-sm outline-none focus:border-hm-accent"
                aria-label="Search"
              />
            </form>

            <nav className="flex flex-col">
              {primaryNav.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="border-b border-hm-border/60 py-3.5 text-base font-medium text-hm-text"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/account"
                onClick={() => setOpen(false)}
                className="border-b border-hm-border/60 py-3.5 text-base font-medium text-hm-text"
              >
                Account
              </Link>
              <Link
                to="/reminders"
                onClick={() => setOpen(false)}
                className="border-b border-hm-border/60 py-3.5 text-base font-medium text-hm-text"
              >
                Notifications
              </Link>
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  openCart()
                }}
                className="border-b border-hm-border/60 py-3.5 text-left text-base font-medium text-hm-text"
              >
                Bag ({count})
              </button>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="border-b border-hm-border/60 py-3.5 text-base font-medium text-hm-text"
              >
                Sign in
              </Link>
              <button
                type="button"
                onClick={() => {
                  toggleTheme()
                  setOpen(false)
                }}
                className="py-3.5 text-left text-base font-medium text-hm-text"
              >
                {isDark ? 'Light mode' : 'Dark mode'}
              </button>
            </nav>
          </aside>
        </>
      ) : null}
    </header>
  )
}
