import React from "react"
import DiaryPageLink from "./diary-page-link"

const DiaryPagesList = ({ pageContext, allPages }) => {
  const diaryPages = allPages
  .filter(page => page.kind === "diary")
  .sort((p1, p2) => p1.date < p2.date)

  return (
    <div className="wikiPageList">
      {diaryPages.map(page => (
        <DiaryPageLink pageContext={pageContext} page={page}></DiaryPageLink>
      ))}
    </div>
  )
}

export default DiaryPagesList
