import {
  generateSku,
  normalizeCategories,
  productDefaults,
  slugify,
} from '@/admin/features/products/productSchema'
import {
  averageRating,
  createStaticReviewsForProduct,
} from '@/admin/features/reviews/reviewStore'

const STORAGE_KEY = 'hm_admin_products_v1'

const seedProducts = [
  {
    id: 'prd_1001',
    name: 'Walnut Serving Tray',
    slug: 'walnut-serving-tray',
    sku: 'WD-204',
    category: 'Home Décor',
    subcategory: 'Serveware',
    brand: 'HandMade Atelier',
    description: 'Hand-finished walnut tray with brass handles — ideal for hosting and corporate gifting.',
    price: 2890,
    compareAtPrice: 3290,
    cost: 1450,
    gstPercent: 18,
    stock: 42,
    lowStockAt: 10,
    weightGrams: 850,
    status: 'published',
    featured: true,
    trending: true,
    seoTitle: 'Walnut Serving Tray | HandMade',
    seoDescription: 'Premium handcrafted walnut serving tray with brass accents.',
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
    createdAt: '2026-03-12T10:00:00.000Z',
    updatedAt: '2026-07-01T10:00:00.000Z',
  },
  {
    id: 'prd_1002',
    name: 'Brass Candle Set',
    slug: 'brass-candle-set',
    sku: 'BC-091',
    category: 'Home Décor',
    subcategory: 'Lighting',
    brand: 'HandMade Atelier',
    description: 'Set of three brushed brass candle holders with soy wax votives.',
    price: 1650,
    compareAtPrice: 1890,
    cost: 720,
    gstPercent: 18,
    stock: 3,
    lowStockAt: 8,
    weightGrams: 620,
    status: 'published',
    featured: false,
    trending: true,
    seoTitle: 'Brass Candle Set | HandMade',
    seoDescription: 'Warm brass candle set for intimate gifting moments.',
    imageUrl: 'https://images.unsplash.com/photo-1602874801006-e0c3f490f3c7?w=800&q=80',
    createdAt: '2026-02-20T10:00:00.000Z',
    updatedAt: '2026-06-18T10:00:00.000Z',
  },
  {
    id: 'prd_1003',
    name: 'Linen Gift Wrap Kit',
    slug: 'linen-gift-wrap-kit',
    sku: 'LW-118',
    category: 'Personalized Gifts',
    subcategory: 'Wrapping',
    brand: 'HandMade',
    description: 'Reusable linen wrap with dried botanical seal and custom monogram card.',
    price: 890,
    compareAtPrice: undefined,
    cost: 310,
    gstPercent: 12,
    stock: 120,
    lowStockAt: 20,
    weightGrams: 180,
    status: 'published',
    featured: true,
    trending: false,
    seoTitle: 'Linen Gift Wrap Kit',
    seoDescription: 'Sustainable linen wrapping kit with personalization.',
    imageUrl: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=800&q=80',
    createdAt: '2026-01-08T10:00:00.000Z',
    updatedAt: '2026-05-22T10:00:00.000Z',
  },
  {
    id: 'prd_1004',
    name: 'Corporate Welcome Hamper',
    slug: 'corporate-welcome-hamper',
    sku: 'CH-501',
    category: 'Corporate Gifts',
    subcategory: 'Hampers',
    brand: 'HandMade Corp',
    description: 'Curated welcome hamper with notebook, ceramic mug, and artisanal treats.',
    price: 4590,
    compareAtPrice: 5200,
    cost: 2400,
    gstPercent: 18,
    stock: 28,
    lowStockAt: 12,
    weightGrams: 2100,
    status: 'published',
    featured: true,
    trending: true,
    seoTitle: 'Corporate Welcome Hamper | HandMade',
    seoDescription: 'Premium onboarding hamper for corporate gifting.',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80',
    createdAt: '2026-04-02T10:00:00.000Z',
    updatedAt: '2026-07-10T10:00:00.000Z',
  },
  {
    id: 'prd_1005',
    name: 'Handwoven Ceramic Mug',
    slug: 'handwoven-ceramic-mug',
    sku: 'CM-077',
    category: 'Home Décor',
    subcategory: 'Tableware',
    brand: 'Studio Clay',
    description: 'Speckled stoneware mug with soft glaze — dishwasher safe.',
    price: 780,
    compareAtPrice: 950,
    cost: 280,
    gstPercent: 12,
    stock: 0,
    lowStockAt: 15,
    weightGrams: 340,
    status: 'draft',
    featured: false,
    trending: false,
    seoTitle: 'Handwoven Ceramic Mug',
    seoDescription: 'Artisan ceramic mug for everyday rituals.',
    imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80',
    createdAt: '2026-05-14T10:00:00.000Z',
    updatedAt: '2026-07-15T10:00:00.000Z',
  },
  {
    id: 'prd_1006',
    name: 'Gold-Tone Keepsake Box',
    slug: 'gold-tone-keepsake-box',
    sku: 'KB-332',
    category: 'Jewellery',
    subcategory: 'Accessories',
    brand: 'HandMade Atelier',
    description: 'Velvet-lined keepsake box with brushed gold finish and engraved lid option.',
    price: 2190,
    compareAtPrice: 2490,
    cost: 980,
    gstPercent: 18,
    stock: 16,
    lowStockAt: 6,
    weightGrams: 410,
    status: 'archived',
    featured: false,
    trending: false,
    seoTitle: 'Gold-Tone Keepsake Box',
    seoDescription: 'Elegant keepsake box for jewellery and letters.',
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
    createdAt: '2025-11-30T10:00:00.000Z',
    updatedAt: '2026-06-01T10:00:00.000Z',
  },
]

function readStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProducts))
      return [...seedProducts]
    }
    return JSON.parse(raw)
  } catch {
    return [...seedProducts]
  }
}

function writeStore(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('hm-catalog-changed'))
  }
  return products
}

export function listProducts() {
  return readStore().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
}

export function getProductById(id) {
  return readStore().find((p) => p.id === id) ?? null
}

export function createProduct(payload) {
  const products = readStore()
  const now = new Date().toISOString()
  const product = {
    ...payload,
    id: `prd_${Date.now()}`,
    createdAt: now,
    updatedAt: now,
  }
  writeStore([product, ...products])

  const seededReviews = createStaticReviewsForProduct(product)
  if (seededReviews.length > 0) {
    const autoRating = averageRating(seededReviews)
    const needsRating = product.rating === '' || product.rating == null
    const needsCount = !product.reviewCount
    if (needsRating || needsCount) {
      const patched = {
        ...product,
        rating: needsRating ? autoRating : product.rating,
        reviewCount: needsCount ? seededReviews.length : product.reviewCount,
        updatedAt: new Date().toISOString(),
      }
      const next = readStore()
      const idx = next.findIndex((p) => p.id === product.id)
      if (idx !== -1) {
        next[idx] = patched
        writeStore(next)
        return patched
      }
    }
  }

  return product
}

export function updateProduct(id, payload) {
  const products = readStore()
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) throw new Error('Product not found')
  const updated = {
    ...products[index],
    ...payload,
    id,
    updatedAt: new Date().toISOString(),
  }
  products[index] = updated
  writeStore(products)
  return updated
}

export function deleteProduct(id) {
  const products = readStore().filter((p) => p.id !== id)
  writeStore(products)
  return true
}

export function resetProducts() {
  writeStore(seedProducts)
  return [...seedProducts]
}

export const productImportHeaders = [
  { key: 'name', label: 'name' },
  { key: 'slug', label: 'slug' },
  { key: 'sku', label: 'sku' },
  { key: 'categories', label: 'categories' },
  { key: 'brand', label: 'brand' },
  { key: 'description', label: 'description' },
  { key: 'instruction', label: 'instruction' },
  { key: 'rating', label: 'rating' },
  { key: 'reviewCount', label: 'reviewCount' },
  { key: 'deliveryDaysProduct', label: 'deliveryDaysProduct' },
  { key: 'deliveryDaysCustomized', label: 'deliveryDaysCustomized' },
  { key: 'price', label: 'price' },
  { key: 'compareAtPrice', label: 'compareAtPrice' },
  { key: 'customizationEnabled', label: 'customizationEnabled' },
  { key: 'customizedPrice', label: 'customizedPrice' },
  { key: 'customizedMarketAtPrice', label: 'customizedMarketAtPrice' },
  { key: 'minOrderQty', label: 'minOrderQty' },
  { key: 'stock', label: 'stock' },
  { key: 'weightGrams', label: 'weightGrams' },
  { key: 'productCost', label: 'productCost' },
  { key: 'serviceCost', label: 'serviceCost' },
  { key: 'status', label: 'status' },
  { key: 'featured', label: 'featured' },
  { key: 'trending', label: 'trending' },
  { key: 'seoTitle', label: 'seoTitle' },
  { key: 'seoDescription', label: 'seoDescription' },
  { key: 'imageUrl', label: 'imageUrl' },
  { key: 'galleryImages', label: 'galleryImages' },
]

export const productImportSampleRows = [
  {
    name: 'Engraved Keepsake Frame',
    slug: 'engraved-keepsake-frame',
    sku: 'EK-101',
    categories: 'Personalized Gifts|Home Décor',
    brand: 'HandMade Atelier',
    description: 'Wooden keepsake frame with custom engraving for gifting.',
    instruction: 'Share engraving text after placing the order.',
    rating: 4.8,
    reviewCount: 12,
    deliveryDaysProduct: 3,
    deliveryDaysCustomized: 7,
    price: 1490,
    compareAtPrice: 1790,
    customizationEnabled: 'true',
    customizedPrice: 1690,
    customizedMarketAtPrice: 1990,
    minOrderQty: 1,
    stock: 25,
    weightGrams: 520,
    productCost: 650,
    serviceCost: 140,
    status: 'published',
    featured: 'true',
    trending: 'false',
    seoTitle: 'Engraved Keepsake Frame | HandMade',
    seoDescription: 'Personalized engraved gift frame for memorable gifting.',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80',
  },
]

function parseNumber(value, fallback = '') {
  if (value === '' || value == null) return fallback
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

function parseBool(value, fallback = false) {
  if (typeof value === 'boolean') return value
  const normalized = String(value || '')
    .trim()
    .toLowerCase()
  if (normalized === 'true' || normalized === 'yes' || normalized === '1') return true
  if (normalized === 'false' || normalized === 'no' || normalized === '0') return false
  return fallback
}

export function bulkImportProducts(rows) {
  return rows.map((row) => {
    const categories = String(row.categories || '')
      .split('|')
      .map((value) => value.trim())
      .filter(Boolean)
    const normalizedCategories = normalizeCategories({
      categories,
      category: row.category,
    })
    return createProduct({
      ...productDefaults,
      name: row.name,
      slug: row.slug || slugify(row.name),
      sku: row.sku || generateSku(row.name),
      categories: normalizedCategories,
      category: normalizedCategories[0] || '',
      brand: row.brand || '',
      description: row.description || '',
      instruction: row.instruction || '',
      rating: parseNumber(row.rating),
      reviewCount: parseNumber(row.reviewCount, 0),
      deliveryDaysProduct: parseNumber(row.deliveryDaysProduct, productDefaults.deliveryDaysProduct),
      deliveryDaysCustomized: parseNumber(
        row.deliveryDaysCustomized,
        productDefaults.deliveryDaysCustomized,
      ),
      price: parseNumber(row.price, 0),
      compareAtPrice: parseNumber(row.compareAtPrice),
      customizationEnabled: parseBool(
        row.customizationEnabled,
        Boolean(parseNumber(row.customizedPrice)),
      ),
      customizedPrice: parseNumber(row.customizedPrice),
      customizedMarketAtPrice: parseNumber(row.customizedMarketAtPrice),
      minOrderQty: parseNumber(row.minOrderQty, productDefaults.minOrderQty),
      stock: parseNumber(row.stock, productDefaults.stock),
      weightGrams: parseNumber(row.weightGrams),
      productCost: parseNumber(row.productCost),
      serviceCost: parseNumber(row.serviceCost),
      cost: parseNumber(row.productCost),
      status: row.status || productDefaults.status,
      featured: parseBool(row.featured),
      trending: parseBool(row.trending),
      seoTitle: row.seoTitle || '',
      seoDescription: row.seoDescription || '',
      imageUrl: row.imageUrl || '',
      galleryImages: String(row.galleryImages || '')
        .split('|')
        .map((value) => value.trim())
        .filter(Boolean)
        .slice(0, 3),
    })
  })
}
