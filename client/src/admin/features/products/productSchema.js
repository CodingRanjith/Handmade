import { z } from 'zod'

export const PRODUCT_STATUSES = ['draft', 'active', 'archived']
export const PRODUCT_CATEGORIES = [
  'Personalized Gifts',
  'Corporate Gifts',
  'Home Décor',
  'Hampers',
  'Jewellery',
  'Stationery',
]

const optionalNumber = z.preprocess((val) => {
  if (val === '' || val === null || val === undefined) return undefined
  const n = Number(val)
  return Number.isFinite(n) ? n : undefined
}, z.number().nonnegative().optional())

export const productSchema = z.object({
  name: z.string().min(2, 'Name is required').max(120),
  slug: z
    .string()
    .min(2, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, and hyphens'),
  sku: z.string().min(2, 'SKU is required').max(40),
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().optional().default(''),
  brand: z.string().optional().default(''),
  description: z.string().min(10, 'Add at least 10 characters').max(2000),
  price: z.coerce.number().positive('Price must be greater than 0'),
  compareAtPrice: optionalNumber,
  cost: optionalNumber,
  gstPercent: z.coerce.number().min(0).max(28).default(18),
  stock: z.coerce.number().int().min(0, 'Stock cannot be negative'),
  lowStockAt: z.coerce.number().int().min(0).default(10),
  weightGrams: optionalNumber,
  status: z.enum(PRODUCT_STATUSES),
  featured: z.boolean().default(false),
  trending: z.boolean().default(false),
  seoTitle: z.string().max(70).optional().default(''),
  seoDescription: z.string().max(160).optional().default(''),
  imageUrl: z
    .string()
    .optional()
    .default('')
    .refine((v) => !v || /^https?:\/\//.test(v), 'Enter a valid image URL'),
})

export function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export const productDefaults = {
  name: '',
  slug: '',
  sku: '',
  category: '',
  subcategory: '',
  brand: '',
  description: '',
  price: '',
  compareAtPrice: '',
  cost: '',
  gstPercent: 18,
  stock: 0,
  lowStockAt: 10,
  weightGrams: '',
  status: 'draft',
  featured: false,
  trending: false,
  seoTitle: '',
  seoDescription: '',
  imageUrl: '',
}
