import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  PRODUCT_STATUSES,
  productDefaults,
  productSchema,
  slugify,
} from '@/admin/features/products/productSchema'
import { listCategories } from '@/admin/features/categories/categoryStore'
import { Input, Textarea, Select, Checkbox } from '@/shared/components/forms/Field'
import { Button } from '@/shared/components/ui/Button'

/**
 * @param {{
 *   initialValues?: object
 *   onSubmit: (values: object) => Promise<void> | void
 *   submitLabel?: string
 *   isSubmitting?: boolean
 * }} props
 */
export function ProductForm({
  initialValues,
  onSubmit,
  submitLabel = 'Save product',
  isSubmitting = false,
}) {
  const categories = listCategories()
    .filter((c) => c.status === 'active')
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: { ...productDefaults, ...initialValues },
  })

  const name = watch('name')
  const imageUrl = watch('imageUrl')

  useEffect(() => {
    if (!initialValues?.slug && name) {
      setValue('slug', slugify(name), { shouldValidate: false })
    }
  }, [name, initialValues?.slug, setValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <section className="rounded-2xl border border-admin-border bg-admin-elevated p-5 shadow-admin sm:p-6">
        <h3 className="text-sm font-semibold text-admin-text">Basic details</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input label="Product name" error={errors.name?.message} {...register('name')} />
          </div>
          <Input label="Slug" error={errors.slug?.message} {...register('slug')} />
          <Input label="SKU" error={errors.sku?.message} {...register('sku')} />
          <Select label="Category" error={errors.category?.message} {...register('category')}>
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </Select>
          <Input label="Subcategory" error={errors.subcategory?.message} {...register('subcategory')} />
          <Input label="Brand" error={errors.brand?.message} {...register('brand')} />
          <Select label="Status" error={errors.status?.message} {...register('status')}>
            {PRODUCT_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </Select>
          <div className="sm:col-span-2">
            <Textarea
              label="Description"
              error={errors.description?.message}
              rows={4}
              {...register('description')}
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-admin-border bg-admin-elevated p-5 shadow-admin sm:p-6">
        <h3 className="text-sm font-semibold text-admin-text">Pricing & inventory</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Input label="Price (₹)" type="number" step="0.01" error={errors.price?.message} {...register('price')} />
          <Input
            label="Compare at price"
            type="number"
            step="0.01"
            error={errors.compareAtPrice?.message}
            {...register('compareAtPrice')}
          />
          <Input label="Cost" type="number" step="0.01" error={errors.cost?.message} {...register('cost')} />
          <Input label="GST %" type="number" error={errors.gstPercent?.message} {...register('gstPercent')} />
          <Input label="Stock" type="number" error={errors.stock?.message} {...register('stock')} />
          <Input label="Low stock at" type="number" error={errors.lowStockAt?.message} {...register('lowStockAt')} />
          <Input
            label="Weight (grams)"
            type="number"
            error={errors.weightGrams?.message}
            {...register('weightGrams')}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-6">
          <Checkbox label="Featured" {...register('featured')} />
          <Checkbox label="Trending" {...register('trending')} />
        </div>
      </section>

      <section className="rounded-2xl border border-admin-border bg-admin-elevated p-5 shadow-admin sm:p-6">
        <h3 className="text-sm font-semibold text-admin-text">Media & SEO</h3>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_200px]">
          <div className="space-y-4">
            <Input
              label="Image URL"
              placeholder="https://…"
              error={errors.imageUrl?.message}
              {...register('imageUrl')}
            />
            <Input label="SEO title" error={errors.seoTitle?.message} {...register('seoTitle')} />
            <Textarea
              label="SEO description"
              error={errors.seoDescription?.message}
              rows={3}
              {...register('seoDescription')}
            />
          </div>
          <div className="overflow-hidden rounded-xl border border-admin-border bg-admin-muted">
            {imageUrl ? (
              <img src={imageUrl} alt="Preview" className="h-48 w-full object-cover lg:h-full" />
            ) : (
              <div className="flex h-48 items-center justify-center text-xs text-admin-text-muted lg:h-full">
                Image preview
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="flex flex-wrap justify-end gap-3">
        <Button type="submit" variant="accent" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : submitLabel}
        </Button>
      </div>
    </form>
  )
}
