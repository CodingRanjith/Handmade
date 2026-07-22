import { Outlet } from 'react-router-dom'
import { StorefrontHeader } from '@/storefront/components/layout/StorefrontHeader'
import { StorefrontFooter } from '@/storefront/components/layout/StorefrontFooter'
import { CartProvider } from '@/storefront/hooks/useCart'
import { CartToast } from '@/storefront/components/cart/CartToast'

export function StorefrontLayout() {
  return (
    <CartProvider>
      <div className="min-h-svh bg-hm-bg text-hm-text">
        <StorefrontHeader />
        <main>
          <Outlet />
        </main>
        <StorefrontFooter />
        <CartToast />
      </div>
    </CartProvider>
  )
}
