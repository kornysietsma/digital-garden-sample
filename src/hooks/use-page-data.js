import { useStaticQuery, graphql } from "gatsby"
import moment from "moment"

export const normalizeMarkdown = (node) => {
  return {
    id: node.id,
    kind: node.frontmatter.date ? "diary" : "wiki",
    slug: node.fields.slug,
    tags: node.frontmatter.tags,
    category: node.frontmatter.category,
    title: node.frontmatter.title,
    tableOfContents: node.tableOfContents,
    date: node.frontmatter.date ? moment(node.frontmatter.date) : moment(node.parent.birthTime),
  }
}


export const usePageData = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
query allPages {
  allMarkdownRemark {
    edges {
      node {
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
      }
    }
  }
}    
`
  );

    // need to normalize the pages
    const allPages = allMarkdownRemark.edges.map(({ node }) => {
      return normalizeMarkdown(node)
    }).sort((page1, page2) => (page2.date - page1.date))

    const allTags = [...new Set(allPages.flatMap(p => p.tags))].sort();

    const allCategories = [...new Set(allPages.flatMap(p => p.category))].sort();  

    // I love reduce, but sadly this is much more efficient
    const categoryCounts = new Map();
    const categoryTagCounts = new Map();
    const tagCounts = new Map();
    allPages.forEach((page) => {
      if (!categoryCounts.has(page.category)) {
        categoryCounts.set(page.category, 1);
      } else {
        categoryCounts.set(page.category, categoryCounts.get(page.category) + 1);
      }

      if (!categoryTagCounts.has(page.category)) {
        categoryTagCounts.set(page.category, new Map());
      }
      const thisCategoryTagCounts = categoryTagCounts.get(page.category);
      page.tags.forEach((tag) => {
        if (!thisCategoryTagCounts.has(tag)) {
          thisCategoryTagCounts.set(tag, 1);
        } else {
          thisCategoryTagCounts.set(tag, thisCategoryTagCounts.get(tag) + 1);
        }

        if (!tagCounts.has(tag)) {
          tagCounts.set(tag, 1);
        } else {
          tagCounts.set(tag, tagCounts.get(tag) + 1);
        }
      })
    })

  return {allCategories, allTags, allPages, categoryCounts, categoryTagCounts, tagCounts}
}