import ComponentLoader from '@/components/componentloader/ComponentLoader'
import PageLoader from '@/components/pageloader/PageLoader'
import React from 'react'

const PageLoaderContainer = () => {
  return (
    <PageLoader isBorderRadius={ false } widthOfSlice={60} slices={10} img='/p1.jpeg' />
    // <ComponentLoader  />
  )
}

export default PageLoaderContainer
