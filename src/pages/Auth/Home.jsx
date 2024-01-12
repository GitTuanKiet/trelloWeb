import * as React from 'react'
import ProductCategories from '~/modules/views/products/ProductCategories'
import ProductCTA from '~/modules/views/products/ProductCTA'
import ProductHero from '~/modules/views/products/ProductHero'
import ProductHowItWorks from '~/modules/views/products/ProductHowItWorks'
import ProductSmokingHero from '~/modules/views/products/ProductSmokingHero'
import ProductValues from '~/modules/views/products/ProductValues'
import AppAppBar from '~/modules/views/layouts/AuthenticatedAppBar'
import AppFooter from '~/modules/views/layouts/AppFooter'
import withRoot from '~/modules/withRoot'

function Index() {
  return (
    <React.Fragment>
      <AppAppBar />
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
      <ProductCTA />
      <ProductSmokingHero />
      <AppFooter />
    </React.Fragment>
  )
}

const Home = withRoot(Index)

export default Home
