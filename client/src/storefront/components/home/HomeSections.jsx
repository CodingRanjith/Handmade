import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import {
  featuredCategories,
  howSteps,
  occasions,
  reviews,
  shopPaths,
  bestSellers,
} from '@/storefront/data/home'
import { ProductCard } from '@/storefront/components/product/ProductCard'
import { Button } from '@/shared/components/ui/Button'

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-hm-accent">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 font-display text-3xl tracking-tight text-hm-text sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-hm-text-muted sm:text-base">{description}</p>
      ) : null}
    </div>
  )
}

export function ShopPaths() {
  return (
    <section id="shop-paths" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
      <SectionHeading
        eyebrow="Start here"
        title="Who are you gifting?"
        description="Pick a path — we’ll show the right gifts."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {shopPaths.map((path) => (
          <Link
            key={path.id}
            to={path.path}
            className="group overflow-hidden rounded-2xl border border-hm-border bg-hm-elevated"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={path.image}
                alt=""
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <div className="space-y-2 p-5">
              <h3 className="font-display text-2xl text-hm-text">{path.title}</h3>
              <p className="text-sm text-hm-text-muted">{path.hint}</p>
              <span className="inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-hm-accent">
                {path.cta}
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function OccasionStrip() {
  return (
    <section className="border-y border-hm-border bg-hm-elevated/60 py-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-hm-text-subtle">
          Shop by occasion
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {occasions.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="rounded-full border border-hm-border bg-hm-bg px-4 py-2 text-xs font-semibold text-hm-text hover:border-hm-accent"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
      <SectionHeading eyebrow="Easy purchase" title="Gift in three steps" />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {howSteps.map((step) => (
          <div
            key={step.step}
            className="rounded-2xl border border-hm-border bg-hm-elevated p-6"
          >
            <p className="font-display text-3xl text-hm-accent/80">{step.step}</p>
            <h3 className="mt-2 text-lg font-semibold text-hm-text">{step.title}</h3>
            <p className="mt-2 text-sm text-hm-text-muted">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function FeaturedCategories() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
      <SectionHeading eyebrow="Collections" title="Browse by style" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featuredCategories.map((cat) => (
          <Link
            key={cat.id}
            to={cat.path}
            className="group relative block aspect-[3/4] overflow-hidden rounded-2xl"
          >
            <img
              src={cat.image}
              alt=""
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="font-display text-2xl text-white">{cat.title}</p>
              <p className="mt-1 text-sm text-white/75">{cat.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function BestSellers() {
  return (
    <section id="bestsellers" className="bg-hm-muted/40 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Ready to buy" title="Bestsellers" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/products">
            <Button variant="primary">
              View all products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export function CorporateBand() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1800&q=80"
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-hm-primary/78" />
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-20 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-hm-accent-soft">
            Bulk & corporate
          </p>
          <h2 className="mt-3 font-display text-4xl tracking-tight text-white sm:text-5xl">
            Need 10+ gifts? Get a quote
          </h2>
          <p className="mt-4 text-sm text-white/75 sm:text-base">
            Share budget and quantity — we’ll send options fast.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/corporate-gifts">
            <Button variant="accent" size="lg">
              Corporate gifts
            </Button>
          </Link>
          <Link to="/bulk-orders">
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Bulk orders
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export function ReviewsSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16">
      <SectionHeading eyebrow="Trusted" title="Loved by givers & receivers" />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {reviews.map((review) => (
          <blockquote
            key={review.id}
            className="rounded-2xl border border-hm-border bg-hm-elevated p-6"
          >
            <p className="font-display text-xl leading-snug text-hm-text">“{review.quote}”</p>
            <footer className="mt-5 text-sm text-hm-text-muted">
              <span className="font-medium text-hm-text">{review.name}</span> · {review.place}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}

export function NewsletterBand() {
  return (
    <section className="border-y border-hm-border bg-hm-elevated">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-5 py-14 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-3xl text-hm-text sm:text-4xl">Get new drops first</h2>
          <p className="mt-2 max-w-md text-sm text-hm-text-muted">
            Festival edits and bestsellers — one email a month.
          </p>
        </div>
        <form
          className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            required
            placeholder="Email address"
            className="h-11 flex-1 rounded-xl border border-hm-border bg-hm-bg px-4 text-sm outline-none focus:border-hm-accent focus:ring-2 focus:ring-hm-ring"
          />
          <Button type="submit" variant="primary">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  )
}
