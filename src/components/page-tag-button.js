import { Link } from "gatsby"
import React from "react"

const PageTagButton = ({ tag, count, selectedCategory, selectedTag }) => {
  const key = tag || "-"
  const target = selectedCategory === null ? (
     tag === undefined ? "/" : `/tag/${tag}`
  ) : (tag === undefined ? `/category/${selectedCategory}` : `/category/${selectedCategory}/tag/${tag}`)

  const text = tag || "all"
  const title = count === undefined ? "all pages" : `${count} pages`
  const isSelected =
    tag === undefined
      ? selectedTag === null
      : selectedTag === tag
  const className = `button small${isSelected ? " primary" : ""}`

  return (
    <Link key={key} title={title} className={className} to={target}>
      {text}
    </Link>
  )
}

export default PageTagButton
