import { Link } from "gatsby"
import React from "react"

import { useFirehoseData } from "../hooks/use-firehose-data"

function pathFor(category, tag) {
  return `/firehose/${category || "-"}/${tag || "-"}`
}

const FirehoseNav = ({ pageContext }) => {
  const {
    categoryCounts,
    categoryTagCounts,
    tagCounts,
  } = useFirehoseData()

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
        <h4>Firehose: &nbsp;
        <Link to='/'>(switch to Pages)</Link></h4>
      </div>
      <div>
        <span className="button-group-name">Categories</span>
        <Link
          key="-"
          className={
            "button small" + (pageContext.selectedCategory ? "" : " primary")
          }
          to={pathFor(null, null)}
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
            to={pathFor(category, null)}
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
            pathFor(pageContext.selectedCategory, null)
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
              pathFor(pageContext.selectedCategory, tag)
            }
          >
            {tag}
          </Link>
        ))}
      </div>
    </aside>
  )
}

export default FirehoseNav
