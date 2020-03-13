import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import FirehoseEntry from "../components/firehose-entry"

export default ({ data, pageContext }) => {
  const edges = data.allFirehose.edges.sort((a, b) => {
    if (a.node.date === null || b.node.date === null || a.node.date === b.node.date) {
      return a.node.title > b.node.title;
    }
    return a.node.date < b.node.date;
  });

  return (
    <Layout pageContext={pageContext} navMode='firehose' metaMode='firehose'>
      <div>
      <h2>Firehose: all / {pageContext.selectedTag}</h2>
      <ul>
          {edges.map(({ node }) => (
          <FirehoseEntry node={node}/>
          ))}
        </ul>
      </div>
    </Layout>
  )
}
export const query = graphql`
  query($selectedTag: String!) {
    allFirehose(
      filter: {
        tags: { in: [$selectedTag] }
      }
    ) {
      edges {
        node {
          title
          category
          tags
          lines
          date
        }
      }
    }
  }
`
