import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { PageHero } from '@/storefront/components/layout/PageHero'
import { Button } from '@/shared/components/ui/Button'

function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="mx-auto flex min-h-[80svh] max-w-md flex-col justify-center px-5 py-24 sm:px-8">
      <Link to="/" className="font-display text-3xl text-hm-text">HandMade</Link>
      <h1 className="mt-8 font-display text-4xl text-hm-text">{title}</h1>
      {subtitle ? <p className="mt-2 text-sm text-hm-text-muted">{subtitle}</p> : null}
      <div className="mt-8">{children}</div>
      {footer ? <div className="mt-6 text-sm text-hm-text-muted">{footer}</div> : null}
    </div>
  )
}

function Text({ label, type = 'text', register, error }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-hm-text-muted">{label}</span>
      <input
        type={type}
        className="h-11 w-full rounded-xl border border-hm-border bg-hm-elevated px-3 text-sm outline-none focus:border-hm-accent"
        {...register}
      />
      {error ? <span className="text-xs text-hm-danger">{error}</span> : null}
    </label>
  )
}

export function LoginPage() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to track orders and saved addresses."
      footer={
        <>
          New here? <Link to="/signup" className="text-hm-accent">Create account</Link>
          <br />
          <Link to="/forgot-password" className="text-hm-accent">Forgot password?</Link>
        </>
      }
    >
      <form
        className="space-y-4"
        onSubmit={handleSubmit(() => navigate('/account'))}
      >
        <Text label="Email" type="email" register={register('email', { required: 'Email required' })} error={errors.email?.message} />
        <Text label="Password" type="password" register={register('password', { required: 'Password required' })} error={errors.password?.message} />
        <Button type="submit" variant="primary" className="w-full">Sign in</Button>
      </form>
    </AuthShell>
  )
}

export function SignupPage() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()

  return (
    <AuthShell
      title="Create account"
      subtitle="Save addresses, track orders, and checkout faster."
      footer={
        <>Already have an account? <Link to="/login" className="text-hm-accent">Sign in</Link></>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit(() => navigate('/account'))}>
        <Text label="Full name" register={register('name', { required: 'Name required' })} error={errors.name?.message} />
        <Text label="Email" type="email" register={register('email', { required: 'Email required' })} error={errors.email?.message} />
        <Text label="Password" type="password" register={register('password', { required: 'Password required', minLength: { value: 6, message: 'Min 6 characters' } })} error={errors.password?.message} />
        <Button type="submit" variant="primary" className="w-full">Create account</Button>
      </form>
    </AuthShell>
  )
}

export function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  return (
    <AuthShell
      title="Reset password"
      subtitle="We’ll email you a reset link."
      footer={<Link to="/login" className="text-hm-accent">Back to sign in</Link>}
    >
      <form className="space-y-4" onSubmit={handleSubmit(() => alert('Reset link sent (demo)'))}>
        <Text label="Email" type="email" register={register('email', { required: 'Email required' })} error={errors.email?.message} />
        <Button type="submit" variant="primary" className="w-full">Send reset link</Button>
      </form>
    </AuthShell>
  )
}

export function WishlistPage() {
  return (
    <div>
      <PageHero eyebrow="Saved" title="Wishlist" description="Gifts you’re considering — move them to bag when ready." />
      <div className="mx-auto max-w-3xl px-5 py-12 text-center sm:px-8">
        <p className="text-sm text-hm-text-muted">Your wishlist is empty for now.</p>
        <Link to="/products" className="mt-6 inline-block">
          <Button variant="primary">Browse gifts</Button>
        </Link>
      </div>
    </div>
  )
}

export function CheckoutPage() {
  const navigate = useNavigate()
  return (
    <div>
      <PageHero eyebrow="Checkout" title="Secure checkout" description="Enter shipping details to place your order." />
      <div className="mx-auto grid max-w-5xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
        <form
          className="space-y-4 rounded-2xl border border-hm-border bg-hm-elevated p-6"
          onSubmit={(e) => {
            e.preventDefault()
            navigate('/order-success')
          }}
        >
          <h2 className="text-sm font-semibold text-hm-text">Shipping</h2>
          <input required placeholder="Full name" className="h-11 w-full rounded-xl border border-hm-border bg-hm-bg px-3 text-sm outline-none focus:border-hm-accent" />
          <input required placeholder="Phone" className="h-11 w-full rounded-xl border border-hm-border bg-hm-bg px-3 text-sm outline-none focus:border-hm-accent" />
          <input required placeholder="Address line" className="h-11 w-full rounded-xl border border-hm-border bg-hm-bg px-3 text-sm outline-none focus:border-hm-accent" />
          <div className="grid gap-3 sm:grid-cols-2">
            <input required placeholder="City" className="h-11 w-full rounded-xl border border-hm-border bg-hm-bg px-3 text-sm outline-none focus:border-hm-accent" />
            <input required placeholder="Pincode" className="h-11 w-full rounded-xl border border-hm-border bg-hm-bg px-3 text-sm outline-none focus:border-hm-accent" />
          </div>
          <h2 className="pt-2 text-sm font-semibold text-hm-text">Payment</h2>
          <select className="h-11 w-full rounded-xl border border-hm-border bg-hm-bg px-3 text-sm">
            <option>UPI</option>
            <option>Card</option>
            <option>Cash on delivery</option>
          </select>
          <Button type="submit" variant="primary" className="w-full" size="lg">
            Place order
          </Button>
        </form>
        <div className="rounded-2xl border border-hm-border bg-hm-elevated p-6 text-sm text-hm-text-muted">
          <p className="font-semibold text-hm-text">Order summary</p>
          <p className="mt-3">Review items in your <Link to="/cart" className="text-hm-accent">bag</Link> before placing the order.</p>
          <p className="mt-4">Gift wrap and notes can be added on product pages.</p>
        </div>
      </div>
    </div>
  )
}

export function OrderSuccessPage() {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-lg flex-col items-center justify-center px-5 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-hm-accent">Thank you</p>
      <h1 className="mt-3 font-display text-4xl text-hm-text sm:text-5xl">Order placed</h1>
      <p className="mt-3 text-sm text-hm-text-muted">
        We’ve received your order. A confirmation email is on its way.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/account/orders"><Button variant="primary">View orders</Button></Link>
        <Link to="/products"><Button variant="outline">Continue shopping</Button></Link>
      </div>
    </div>
  )
}
