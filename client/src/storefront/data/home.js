export const storefrontNav = [
  { label: 'Shop', path: '/products' },
  { label: 'Categories', path: '/categories' },
  { label: 'Personalized', path: '/personalized-gifts' },
  { label: 'Corporate', path: '/corporate-gifts' },
  { label: 'About', path: '/about' },
  { label: 'Blog', path: '/blog' },
]

export const shopPaths = [
  {
    id: 'personal',
    title: 'For someone special',
    hint: 'Birthdays, anniversaries, thank-you',
    cta: 'Shop personal gifts',
    path: '/personalized-gifts',
    image:
      'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'office',
    title: 'For your team / clients',
    hint: 'Welcome kits, festivals, bulk orders',
    cta: 'Shop corporate',
    path: '/corporate-gifts',
    image:
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'home',
    title: 'For the home',
    hint: 'Trays, candles, everyday luxury',
    cta: 'Shop home décor',
    path: '/categories',
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
  },
]

export const occasions = [
  { id: 'birthday', label: 'Birthday', path: '/products?occasion=birthday' },
  { id: 'wedding', label: 'Wedding', path: '/products?occasion=wedding' },
  { id: 'festival', label: 'Festival', path: '/products?occasion=festival' },
  { id: 'welcome', label: 'Welcome', path: '/products?occasion=welcome' },
  { id: 'thankyou', label: 'Thank you', path: '/products?occasion=thankyou' },
  { id: 'corporate', label: 'Corporate', path: '/corporate-gifts' },
]

export const howSteps = [
  {
    step: '01',
    title: 'Pick a gift',
    text: 'Browse bestsellers or filter by occasion in seconds.',
  },
  {
    step: '02',
    title: 'Personalize',
    text: 'Add name, note, or logo — optional, always easy.',
  },
  {
    step: '03',
    title: 'Checkout & relax',
    text: 'Pay securely. We pack, gift-wrap, and deliver.',
  },
]

export const featuredCategories = [
  {
    id: 'personalized',
    title: 'Personalized',
    subtitle: 'Monograms & keepsakes',
    path: '/personalized-gifts',
    image:
      'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'corporate',
    title: 'Corporate',
    subtitle: 'Curated for teams',
    path: '/corporate-gifts',
    image:
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'home',
    title: 'Home Rituals',
    subtitle: 'Objects with soul',
    path: '/categories',
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'hampers',
    title: 'Hampers',
    subtitle: 'Seasonal collections',
    path: '/products',
    image:
      'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=80',
  },
]

export const bestSellers = [
  {
    id: '1',
    name: 'Walnut Serving Tray',
    price: 2890,
    compareAt: 3290,
    tag: 'Bestseller',
    occasion: 'Housewarming favourite',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '2',
    name: 'Brass Candle Set',
    price: 1650,
    compareAt: 1890,
    tag: 'Trending',
    occasion: 'Evening rituals',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1602874801006-e0c3f490f3c7?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '3',
    name: 'Linen Gift Wrap Kit',
    price: 890,
    compareAt: null,
    tag: 'New',
    occasion: 'Ready to personalize',
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '4',
    name: 'Corporate Welcome Hamper',
    price: 4590,
    compareAt: 5200,
    tag: 'Corporate',
    occasion: 'Client & team gifts',
    rating: 5.0,
    image:
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80',
  },
]

export const reviews = [
  {
    id: 'r1',
    quote: 'Every piece felt intentional — packaging, note, and the gift itself.',
    name: 'Ananya R.',
    place: 'Bengaluru',
  },
  {
    id: 'r2',
    quote: 'Our client hampers arrived flawlessly. Quiet luxury done right.',
    name: 'Vikram S.',
    place: 'Mumbai',
  },
  {
    id: 'r3',
    quote: 'The personalized tray became our wedding favour highlight.',
    name: 'Meera & Arjun',
    place: 'Chennai',
  },
]

export const heroProducts = [
  bestSellers[0],
  bestSellers[1],
  bestSellers[3],
]
