import { listCategories } from '@/admin/features/categories/categoryStore'
import { listProducts } from '@/admin/features/products/productStore'
import { catalogProducts as seedCatalog } from '@/storefront/data/catalog'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80'

/**
 * Map an admin product record into the storefront product shape.
 */
export function mapAdminProduct(p) {
  const image = p.imageUrl || FALLBACK_IMAGE
  return {
    id: p.id,
    slug: p.slug || p.id,
    name: p.name,
    tag: p.featured ? 'Featured' : p.trending ? 'Trending' : '',
    category: p.category || 'Uncategorized',
    subcategory: p.subcategory || '',
    brand: p.brand || 'HandMade',
    occasion: [],
    price: Number(p.price) || 0,
    compareAt: p.compareAtPrice ? Number(p.compareAtPrice) : undefined,
    rating: 4.8,
    reviewCount: 0,
    stock: Number(p.stock) || 0,
    shortDescription: p.description?.slice(0, 120) || '',
    description: p.description || '',
    features: [],
    images: [image],
    image,
    variants: {},
    personalization: { customText: false, uploadImage: false, uploadLogo: false, maxChars: 24 },
    bulkPricing: [{ minQty: 1, price: Number(p.price) || 0 }],
    shippingNote: 'Dispatches in 1–2 days',
    featured: Boolean(p.featured),
    trending: Boolean(p.trending),
    status: p.status,
    updatedAt: p.updatedAt,
    createdAt: p.createdAt,
  }
}

function readAdminProducts() {
  try {
    return listProducts().filter((p) => p.status === 'active')
  } catch {
    return []
  }
}

function readAdminCategories() {
  try {
    return listCategories()
      .filter((c) => c.status === 'active')
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
  } catch {
    return []
  }
}

/**
 * Active admin products for the storefront.
 * Falls back to static catalog seed if admin store is empty.
 */
export function getStorefrontProducts() {
  const admin = readAdminProducts().map(mapAdminProduct)
  if (admin.length > 0) return admin
  return seedCatalog.map((p) => ({
    ...p,
    image: p.image || p.images?.[0],
  }))
}

export function getStorefrontProduct(idOrSlug) {
  return (
    getStorefrontProducts().find((p) => p.id === idOrSlug || p.slug === idOrSlug) ?? null
  )
}

export function getStorefrontRelated(product, limit = 4) {
  if (!product) return []
  return getStorefrontProducts()
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit)
}

/**
 * Active admin categories for /categories.
 * Includes live product counts from admin products.
 */
export function getStorefrontCategories() {
  const products = getStorefrontProducts()
  const cats = readAdminCategories()

  if (cats.length === 0) {
    const names = [...new Set(products.map((p) => p.category).filter(Boolean))]
    return names.map((name) => ({
      id: name,
      name,
      title: name,
      subtitle: '',
      description: '',
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      path: `/categories?category=${encodeURIComponent(name)}`,
      image: products.find((p) => p.category === name)?.image || FALLBACK_IMAGE,
      productCount: products.filter((p) => p.category === name).length,
    }))
  }

  return cats.map((c) => {
    const count = products.filter((p) => p.category === c.name).length
    return {
      id: c.id,
      name: c.name,
      title: c.name,
      subtitle: c.description || '',
      description: c.description || '',
      slug: c.slug,
      path: `/categories?category=${encodeURIComponent(c.name)}`,
      image: c.imageUrl || products.find((p) => p.category === c.name)?.image || FALLBACK_IMAGE,
      productCount: count,
      sortOrder: c.sortOrder,
    }
  })
}

export function getStorefrontCategoryNames() {
  const cats = getStorefrontCategories().map((c) => c.name)
  return ['All', ...cats]
}

export function filterStorefrontCatalog({
  search = '',
  category = 'All',
  occasion = 'All',
  sort = 'featured',
  minPrice = 0,
  maxPrice = Infinity,
  onlyInStock = false,
} = {}) {
  let list = [...getStorefrontProducts()]

  if (category && category !== 'All') {
    list = list.filter((p) => p.category === category)
  }
  if (occasion && occasion !== 'All') {
    list = list.filter((p) => (p.occasion || []).includes(occasion))
  }
  if (search.trim()) {
    const q = search.trim().toLowerCase()
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q) ||
        (p.tag || '').toLowerCase().includes(q) ||
        (p.shortDescription || '').toLowerCase().includes(q),
    )
  }
  list = list.filter((p) => p.price >= minPrice && p.price <= maxPrice)
  if (onlyInStock) list = list.filter((p) => p.stock > 0)

  switch (sort) {
    case 'price-asc':
      list.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      list.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      break
    case 'newest':
      list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      break
    default:
      list.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || (b.rating || 0) - (a.rating || 0),
      )
  }

  return list
}
