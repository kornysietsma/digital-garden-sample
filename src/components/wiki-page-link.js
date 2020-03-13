import { Link } from "gatsby"
import React from "react"
import { pagePath } from "../routes"

const WikiPageLink = ({ pageContext, page }) => (
  <div className="wikiPageLink" key={page.id}>
    <Link
      to={pagePath(
        pageContext.selectedCategory,
        pageContext.selectedTag,
        page.slug
      )}
    >
      <h3>{page.title}</h3>
    </Link>
  </div>
)

export default WikiPageLink
