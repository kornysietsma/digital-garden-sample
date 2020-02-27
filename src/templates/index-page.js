import React from "react"
import Layout from "../components/layout"
export default ({ pageContext }) => {
    // TODO: show most recent pages

  return (
    <Layout pageContext={pageContext}>
      <div>
        <h2>{pageContext.selectedCategory ? `Category: ${pageContext.selectedCategory}` : `All categories`}</h2>
        <h2>{pageContext.selectedTag ? `Tag: ${pageContext.selectedTag}` : `All tags`}</h2>
        <div><p>Please select a page</p></div>
      </div>
    </Layout>
  )
}
