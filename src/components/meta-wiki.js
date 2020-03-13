import React from "react"
import WikiPagesList from "./wiki-pages-list"
import { usePageData } from "../hooks/use-page-data"

const MetaWiki = ({ pageContext = {}, metadata = {} }) => {
  const { allPages } = usePageData()

  const pages = allPages.filter(page => {
    const categoryMatch =
      pageContext.selectedCategory === null ||
      page.category === pageContext.selectedCategory
    const tagMatch =
      pageContext.selectedTag === null ||
      page.tags.includes(pageContext.selectedTag)
    return categoryMatch && tagMatch
  })

  return (
    <aside className="main-meta">
      <h2>Wiki pages:</h2>
      <WikiPagesList pageContext={pageContext} allPages={pages}></WikiPagesList>
    </aside>
  )
}

export default MetaWiki
