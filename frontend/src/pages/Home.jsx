import React, { lazy } from 'react'
import Hero from '../components/Hero'
import Feature from '../components/Feature'
import Banner from '../components/Banner'
import SmallBanner from '../components/SmallBanner'
import SmallBanner2 from '../components/SmallBanner2'
import NewsLetter from '../components/NewsLetter'
import ProductCollection from '../components/ProductCollection'
import { Suspense } from 'react'
const MediaOne = lazy(() => import("../components/MediaOne"));

function Home() {

  const Skeleton = ({ h }) => (
    <div className={`bg-gray-200 animate-pulse ${h}`} />
  );

  return (
    <div>
      <Hero />
      <Feature />
      <Suspense fallback={<Skeleton h="h-screen"/>}>
        <MediaOne />
      </Suspense>
      <ProductCollection title="Featured Products" tag="Top Brand" limit={8} />
      <Banner />
      <ProductCollection title="Trending Collections" tag="Interested In" limit={8} />
      <SmallBanner />
      <SmallBanner2 />
      <NewsLetter />
    </div>
  )
}

export default Home