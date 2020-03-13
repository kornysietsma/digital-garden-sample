import { Link } from "gatsby"
import React from "react"

const PageCategoryButton = ({ category, count, selectedCategory }) => {
  const key = category || "-"
  const target = category === undefined ? "/" : `/category/${category}`
  const text = category || "all"
  const title = count === undefined ? "all pages" : `${count} pages`
  const isSelected =
    category === undefined
      ? selectedCategory === null
      : selectedCategory === category
  const className = `button small${isSelected ? " primary" : ""}`

  return (
    <Link key={key} title={title} className={className} to={target}>
      {text}
    </Link>
  )
}

export default PageCategoryButton
