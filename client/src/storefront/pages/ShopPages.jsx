import { Link } from 'react-router-dom'
import { PageHero } from '@/storefront/components/layout/PageHero'
import { featuredCategories } from '@/storefront/data/home'
import { catalogProducts } from '@/storefront/data/catalog'
import { ProductCard } from '@/storefront/components/product/ProductCard'
import { Button } from '@/shared/components/ui/Button'

export function CategoriesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Browse"
        title="Categories"
        description="Explore HandMade collections by style and purpose."
      />
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCategories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.path}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <img src={cat.image} alt="" className="h-full w-full object-cover transition group-hover:scale-[1.03]" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="font-display text-2xl">{cat.title}</p>
                <p className="text-sm text-white/75">{cat.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PersonalizedGiftsPage() {
  const products = catalogProducts.filter((p) => p.category === 'Personalized Gifts' || p.personalization?.customText)

  return (
    <div>
      <PageHero
        eyebrow="Personalized"
        title="Gifts with their name on it"
        description="Add monograms, notes, or logos — optional and easy at checkout."
        actions={
          <Link to="/products?category=Personalized%20Gifts">
            <Button variant="primary">Shop personalized</Button>
          </Link>
        }
      />
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={{ ...p, image: p.images[0], occasion: p.occasion[0] }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function BulkOrdersPage() {
  return (
    <div>
      <PageHero
        eyebrow="Bulk orders"
        title="Order 10+ gifts with ease"
        description="Share quantity, budget, and deadline — we’ll reply with options and pricing."
      />
      <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
        <form
          className="space-y-4 rounded-2xl border border-hm-border bg-hm-elevated p-6"
          onSubmit={(e) => {
            e.preventDefault()
            window.location.href = '/order-success'
          }}
        >
          <Field label="Company name" name="company" required />
          <Field label="Work email" name="email" type="email" required />
          <Field label="Phone" name="phone" type="tel" />
          <Field label="Quantity" name="qty" type="number" required />
          <Field label="Budget per gift (₹)" name="budget" type="number" />
          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-hm-text-muted">Notes</span>
            <textarea name="notes" rows={4} className="w-full rounded-xl border border-hm-border bg-hm-bg px-3 py-2 text-sm outline-none focus:border-hm-accent" placeholder="Occasion, branding needs, city…" />
          </label>
          <Button type="submit" variant="primary" className="w-full">Submit enquiry</Button>
        </form>
      </div>
    </div>
  )
}

function Field({ label, name, type = 'text', required }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-hm-text-muted">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="h-11 w-full rounded-xl border border-hm-border bg-hm-bg px-3 text-sm outline-none focus:border-hm-accent"
      />
    </label>
  )
}
