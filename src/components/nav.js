import { Link } from "gatsby"
import React from "react"

import { usePageData } from "../hooks/use-page-data"
import PageCategoryButton from "./page-category-button"
import PageTagButton from "./page-tag-button"
import WikiPagesList from "./wiki-pages-list"
import DiaryPagesList from "./diary-pages-list"

const Nav = ({ pageContext }) => {
  const {
    allPages,
    categoryCounts,
    categoryTagCounts,
    tagCounts,
  } = usePageData()

  const pages = allPages.filter(page => {
    const categoryMatch =
      pageContext.selectedCategory === null ||
      page.category === pageContext.selectedCategory
    const tagMatch =
      pageContext.selectedTag === null ||
      page.tags.includes(pageContext.selectedTag)
    return categoryMatch && tagMatch
  })


  const currentTags = pageContext.selectedCategory
    ? categoryTagCounts.get(pageContext.selectedCategory)
    : tagCounts

  const categoriesSorted = Array.from(categoryCounts).sort(
    ([k1, v1], [k2, v2]) => v2 - v1
  )

  const currentTagsSorted = Array.from(currentTags).sort(
    ([k1, v1], [k2, v2]) => v2 - v1
  )

  return (
    <aside className="main-nav">
      <div>
        <h4>
          Pages: &nbsp;
          <Link to="/firehose/-/-">(switch to Firehose)</Link>
        </h4>
      </div>
      <div>
        <span className="button-group-name">Categories</span>
        <PageCategoryButton
          selectedCategory={pageContext.selectedCategory}
        ></PageCategoryButton>
        {categoriesSorted.map(([category, count]) => (
          <PageCategoryButton
            category={category}
            count={count}
            selectedCategory={pageContext.selectedCategory}
          ></PageCategoryButton>
        ))}
      </div>
      <div>
        <span className="button-group-name">Tags</span>
        <PageTagButton
          selectedCategory={pageContext.selectedCategory}
          selectedTag={pageContext.selectedTag}
        ></PageTagButton>
        {currentTagsSorted.map(([tag, count]) => (
          <PageTagButton
            tag={tag}
            selectedCategory={pageContext.selectedCategory}
            selectedTag={pageContext.selectedTag}
          ></PageTagButton>
        ))}
      </div>
      <div>
        <hr />
        <WikiPagesList pageContext={pageContext} allPages={pages} ></WikiPagesList>
        <hr />
        <DiaryPagesList pageContext={pageContext} allPages={pages}></DiaryPagesList>
      </div>
    </aside>
  )
}

export default Nav
