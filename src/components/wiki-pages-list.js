import React from "react"
import WikiPageLink from "./wiki-page-link"

const WikiPagesList = ({ pageContext, allPages }) => {
  const wikiPages = allPages
    .filter(page => page.kind === "wiki")
    .sort((p1, p2) => p1.title > p2.title)
  return (
    <div className="wikiPageList">
      {wikiPages.map(page => (
        <WikiPageLink pageContext={pageContext} page={page}></WikiPageLink>
      ))}
    </div>
  )
}

export default WikiPagesList
