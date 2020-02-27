import React from "react"
import "mini.css/dist/mini-nord.min.css"
import { usePageData } from "../hooks/use-page-data"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const { allCategories, allTags } = usePageData()
  const pageContext = {
    selectedCategory: null,
    selectedTag: null,
    allCategories,
    allTags,
  }

  // TODO: show most recent pages
  return (
    <Layout pageContext={pageContext}>
      <SEO title="Home" />
      <h1>Welcome to Korny's sample digital garden</h1>
      <p>See the source for this site at <a href="https://github.com/kornysietsma/digital-garden-sample">https://github.com/kornysietsma/digital-garden-sample</a></p>
      <p>
        <strong>What is a digital garden</strong>, you ask?
      </p>
      <p>
        It's a mix of loosely structured information, similar to a wiki, and
        date-ordered posts, similar to a blog.
      </p>
      <p>
        <strong>Tell me more?</strong>
      </p>
      <p>
        I'm going to add info here - but for now, you'll have to explore
        yourself.
      </p>
    </Layout>
  )
}
export default IndexPage
