import React from "react"
import "mini.css/dist/mini-nord.min.css"
import { usePageData } from "../hooks/use-page-data"

import Layout from "../components/layout"
import SEO from "../components/seo"
import DiaryPagesList from "../components/diary-pages-list"

const IndexPage = () => {
  const { allPages, allCategories, allTags } = usePageData()
  const pageContext = {
    selectedCategory: null,
    selectedTag: null,
    allCategories,
    allTags,
  }

  const pages = allPages.filter(page => {
    const categoryMatch =
      pageContext.selectedCategory === null ||
      page.category === pageContext.selectedCategory
    const tagMatch =
      pageContext.selectedTag === null ||
      page.tags.includes(pageContext.selectedTag)
    return categoryMatch && tagMatch
  })

  // TODO: show most recent pages
  return (
    <Layout pageContext={pageContext} navMode="pages" metaMode="wiki">
      <SEO title="Home" />
      <h1>Welcome to Korny's sample digital garden</h1>
      <div>
      <p><strong>NOTE: this won't look good on mobile yet, sorry!!!</strong></p>
      </div>
      <div>
      <p>See the source for this site at <a href="https://github.com/kornysietsma/digital-garden-sample">https://github.com/kornysietsma/digital-garden-sample</a></p>
      <p>
        See the <a href="-/-/wiki/about/">About</a> page for more about how this works, and links to other pages.
      </p>
      <p>Note the <a href="firehose/-/-">firehose</a> section has a few random recent bookmarks rather than crafted content</p>
      </div>
      <hr />
      <h2>Diary:</h2>
      <DiaryPagesList
        pageContext={pageContext}
        allPages={pages}
      ></DiaryPagesList>
    </Layout>
  )
}
export default IndexPage
