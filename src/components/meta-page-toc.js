import React from "react"

const MetaPageToc = ({ pageContext = {}, metadata = {} }) => {
  return (
    <aside className="main-meta">
      {metadata.toc ? (
        <div>
          <h2>Contents:</h2>
          <div dangerouslySetInnerHTML={{ __html: metadata.toc }} />
        </div>
      ) : (
        <p>(no contents in page)</p>
      )}
    </aside>
  )
}

export default MetaPageToc
