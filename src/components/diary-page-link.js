import { Link } from "gatsby"
import React from "react"
import { pagePath } from "../routes"

const DiaryPageLink = ({ pageContext, page }) => (
  <div className="diaryPageLink" key={page.id}>
    <Link
      to={pagePath(
        pageContext.selectedCategory,
        pageContext.selectedTag,
        page.slug
      )}
    >
      <h3>{page.title}<span>— {page.date.format("YYYY-MM-DD")}</span></h3>
    </Link>
  </div>
)

export default DiaryPageLink
