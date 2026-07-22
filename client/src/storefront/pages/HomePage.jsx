import { HeroBanner } from '@/storefront/components/home/HeroBanner'
import {
  BestSellers,
  CorporateBand,
  FeaturedCategories,
  HowItWorks,
  NewsletterBand,
  OccasionStrip,
  ReviewsSection,
  ShopPaths,
} from '@/storefront/components/home/HomeSections'

export function HomePage() {
  return (
    <>
      <HeroBanner />
      <ShopPaths />
      <OccasionStrip />
      <HowItWorks />
      <BestSellers />
      <FeaturedCategories />
      <CorporateBand />
      <ReviewsSection />
      <NewsletterBand />
    </>
  )
}
