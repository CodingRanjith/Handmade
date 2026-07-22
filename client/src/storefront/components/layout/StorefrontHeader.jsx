import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Heart, Menu, Moon, Search, ShoppingBag, Sun, User, X } from 'lucide-react'
import { storefrontNav } from '@/storefront/data/home'
import { Button } from '@/shared/components/ui/Button'
import { useTheme } from '@/shared/hooks/useTheme'
import { useCart } from '@/storefront/hooks/useCart'
import { cn } from '@/shared/utils/cn'

export function StorefrontHeader() {
  const { toggleTheme, isDark } = useTheme()
  const { count } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 sm:py-5">
        <button
          type="button"
          className="rounded-full bg-hm-elevated/70 p-2 text-hm-text shadow-hm-soft backdrop-blur-md transition hover:bg-hm-elevated md:hidden"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/" className="group rounded-full bg-hm-elevated/55 px-3 py-1.5 shadow-hm-soft backdrop-blur-md sm:px-4">
          <span className="font-display text-3xl tracking-tight text-hm-text transition group-hover:opacity-80 sm:text-4xl">
            HandMade
          </span>
        </Link>

        <nav
          className="hidden items-center gap-6 rounded-full bg-hm-elevated/55 px-5 py-2.5 shadow-hm-soft backdrop-blur-md md:flex"
          aria-label="Primary"
        >
          {storefrontNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'text-[13px] font-medium tracking-wide text-hm-text-muted transition hover:text-hm-text',
                  isActive && 'text-hm-text',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1 rounded-full bg-hm-elevated/70 p-1 shadow-hm-soft backdrop-blur-md sm:gap-1.5 sm:px-1.5">
          <Button variant="ghost" size="icon" aria-label="Search" className="text-hm-text">
            <Search className="h-4 w-4" />
          </Button>
          <Link to="/account">
            <Button variant="ghost" size="icon" aria-label="Account" className="text-hm-text">
              <User className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/wishlist">
            <Button variant="ghost" size="icon" aria-label="Wishlist" className="text-hm-text">
              <Heart className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" aria-label="Cart" className="text-hm-text">
              <ShoppingBag className="h-4 w-4" />
            </Button>
            {count > 0 ? (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-hm-accent px-1 text-[10px] font-bold text-hm-primary">
                {count}
              </span>
            ) : null}
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

      {open ? (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-hm-overlay md:hidden"
            onClick={() => setOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-[280px] border-r border-hm-border bg-hm-elevated p-6 md:hidden">
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
              {storefrontNav.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="text-lg text-hm-text"
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/cart" onClick={() => setOpen(false)} className="text-lg text-hm-text">
                Bag ({count})
              </Link>
              <Link to="/login" onClick={() => setOpen(false)} className="text-lg text-hm-text">
                Sign in
              </Link>
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="mt-4 text-sm text-hm-accent"
              >
                Admin ERP
              </Link>
            </nav>
          </aside>
        </>
      ) : null}
    </header>
  )
}
