import { Link, Outlet } from 'react-router-dom'
import { PageHero } from '@/storefront/components/layout/PageHero'
import { AccountNav } from '@/storefront/components/layout/PageHero'
import { Button } from '@/shared/components/ui/Button'

export function AccountLayout() {
  return (
    <div>
      <PageHero
        eyebrow="Account"
        title="My account"
        description="Manage profile, orders, addresses, and notifications."
        actions={
          <Link to="/login">
            <Button variant="outline" size="sm">Sign out</Button>
          </Link>
        }
      />
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8">
        <AccountNav />
        <div className="mt-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export function AccountOverviewPage() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {[
        { label: 'Orders', value: '3', to: '/account/orders' },
        { label: 'Addresses', value: '2', to: '/account/addresses' },
        { label: 'Wishlist', value: '0', to: '/wishlist' },
      ].map((card) => (
        <Link
          key={card.label}
          to={card.to}
          className="rounded-2xl border border-hm-border bg-hm-elevated p-5 hover:border-hm-accent"
        >
          <p className="text-xs uppercase tracking-wider text-hm-text-subtle">{card.label}</p>
          <p className="mt-2 text-3xl font-semibold text-hm-text">{card.value}</p>
        </Link>
      ))}
    </div>
  )
}

export function AccountOrdersPage() {
  const orders = [
    { id: 'HM-10482', date: '18 Jul 2026', total: '₹4,280', status: 'Processing' },
    { id: 'HM-10390', date: '2 Jul 2026', total: '₹1,650', status: 'Delivered' },
    { id: 'HM-10211', date: '14 Jun 2026', total: '₹8,990', status: 'Delivered' },
  ]

  return (
    <div className="overflow-hidden rounded-2xl border border-hm-border bg-hm-elevated">
      <table className="w-full min-w-[520px] text-left text-sm">
        <thead className="border-b border-hm-border bg-hm-muted/40 text-xs uppercase tracking-wider text-hm-text-muted">
          <tr>
            <th className="px-4 py-3 font-medium">Order</th>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Total</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b border-hm-border/70 last:border-0">
              <td className="px-4 py-3 font-medium text-hm-text">{o.id}</td>
              <td className="px-4 py-3 text-hm-text-muted">{o.date}</td>
              <td className="px-4 py-3 text-hm-text">{o.total}</td>
              <td className="px-4 py-3 text-hm-text-muted">{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function AccountProfilePage() {
  return (
    <form
      className="max-w-lg space-y-4 rounded-2xl border border-hm-border bg-hm-elevated p-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <h2 className="text-sm font-semibold text-hm-text">Profile</h2>
      <input defaultValue="Gayathri" className="h-11 w-full rounded-xl border border-hm-border bg-hm-bg px-3 text-sm outline-none focus:border-hm-accent" />
      <input defaultValue="hello@handmade.in" type="email" className="h-11 w-full rounded-xl border border-hm-border bg-hm-bg px-3 text-sm outline-none focus:border-hm-accent" />
      <input defaultValue="+91 98765 43210" className="h-11 w-full rounded-xl border border-hm-border bg-hm-bg px-3 text-sm outline-none focus:border-hm-accent" />
      <Button type="submit" variant="primary">Save profile</Button>
    </form>
  )
}

export function AccountAddressesPage() {
  const addresses = [
    { id: 1, label: 'Home', line: '12, Atelier Lane, Bengaluru 560001' },
    { id: 2, label: 'Office', line: 'Nexa HQ, Koramangala, Bengaluru 560034' },
  ]
  return (
    <div className="space-y-4">
      {addresses.map((a) => (
        <div key={a.id} className="rounded-2xl border border-hm-border bg-hm-elevated p-5">
          <p className="text-sm font-semibold text-hm-text">{a.label}</p>
          <p className="mt-1 text-sm text-hm-text-muted">{a.line}</p>
        </div>
      ))}
      <Button variant="outline">Add address</Button>
    </div>
  )
}

export function AccountNotificationsPage() {
  const notes = [
    { id: 1, text: 'Order HM-10482 is being packed', time: '2h ago' },
    { id: 2, text: 'Your wishlist item is back in stock', time: '1d ago' },
    { id: 3, text: 'Festival collection is live', time: '3d ago' },
  ]
  return (
    <ul className="space-y-3">
      {notes.map((n) => (
        <li key={n.id} className="rounded-2xl border border-hm-border bg-hm-elevated px-5 py-4">
          <p className="text-sm text-hm-text">{n.text}</p>
          <p className="mt-1 text-xs text-hm-text-muted">{n.time}</p>
        </li>
      ))}
    </ul>
  )
}
