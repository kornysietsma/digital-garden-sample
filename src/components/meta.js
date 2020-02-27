import React from "react"

const Meta = ({ pageContext = {}, metadata = {} }) => {
  console.log(pageContext)

  console.log(metadata)

  return (
    <aside className="main-meta">
      {metadata.toc === null  ? <p>Please select a page to see metadata</p>
      : (metadata.toc === "" ? <p>(no contents in page)</p>
      : <div>
          <h2>Page contents:</h2>
          <div dangerouslySetInnerHTML={{ __html: metadata.toc }} /></div>)}
      
    </aside>
  )
}

export default Meta
