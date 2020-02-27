import { Link } from "gatsby"
import React from "react"

import { usePageData } from "../hooks/use-page-data"

function pathFor(category, tag, slug) {
  return `/${category || "-"}/${tag || "-"}${slug}`
}

const Nav = ({ pageContext }) => {
  const {
    allCategories,
    allTags,
    allPages,
    categoryCounts,
    categoryTagCounts,
    tagCounts,
  } = usePageData()

  // TODO: show selected tag/category somehow

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
        <span className="button-group-name">Categories</span>
        <Link
          key="-"
          className={
            "button small" + (pageContext.selectedCategory ? "" : " primary")
          }
          to={`/`}
        >
          all
        </Link>
        {categoriesSorted.map(([category, count]) => (
          <Link
            key={category}
            title={`${count} pages`}
            className={
              "button small" +
              (pageContext.selectedCategory === category ? " primary" : "")
            }
            to={`/category/${category}`}
          >
            {category}
          </Link>
        ))}
      </div>
      <div>
        <span className="button-group-name">Tags</span>
        <Link
          key="-"
          className={
            "button small" + (pageContext.selectedTag ? "" : " primary")
          }
          to={
            pageContext.selectedCategory
              ? `/category/${pageContext.selectedCategory}`
              : `/`
          }
        >
          all
        </Link>
        {currentTagsSorted.map(([tag, count]) => (
          <Link
            key={tag}
            title={`${count} pages`}
            className={
              "button small" +
              (pageContext.selectedTag === tag ? " primary" : "")
            }
            to={
              pageContext.selectedCategory
                ? `/category/${pageContext.selectedCategory}/tag/${tag}`
                : `/tag/${tag}`
            }
          >
            {tag}
          </Link>
        ))}
      </div>
      <div>
        <hr />
        {pages.map(page => (
          <div key={page.id}>
            <Link
              to={pathFor(
                pageContext.selectedCategory,
                pageContext.selectedTag,
                page.slug
              )}
            >
              <h3>
                {page.title} <span>— {page.date.format('YYYY-MM-DD')}</span>
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default Nav
