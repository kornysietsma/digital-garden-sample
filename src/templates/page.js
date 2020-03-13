import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import { normalizeMarkdown } from "../hooks/use-page-data"
export default ({ data, pageContext }) => {
  const post = data.markdownRemark
  const postData = normalizeMarkdown(data.markdownRemark)
  return (
    <Layout pageContext={pageContext} metadata={{toc: post.tableOfContents}} navMode='pages' metaMode='pageToc'>
      <div>
        <h1>{postData.title}</h1>
        <h2>{postData.date.format('YYYY-MM-DD')}</h2>
        <div><span className="button-group-name">Category</span>
        <Link
            key={postData.category}
            className="button small"
            to={`/category/${postData.category}`}
          >
            {postData.category}
          </Link>
        </div>
        <div><span className="button-group-name">Tags</span>
        {postData.tags.map((tag) => (
          <Link
          key={tag}
          className="button small"
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
        <hr/>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      frontmatter {
        category
        tags
        title
        date
      }
      parent {
        ... on File {
          modifiedTime
          birthTime
        }
      }
      html
      tableOfContents(absolute:false)
    }
  }
`