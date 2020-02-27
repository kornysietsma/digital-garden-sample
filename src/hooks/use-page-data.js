import { useStaticQuery, graphql } from "gatsby"
import moment from "moment"

export const normalizeMarkdown = (node) => {
  return {
    id: node.id,
    kind: "markdown",
    slug: node.fields.slug,
    tags: node.frontmatter.tags,
    category: node.frontmatter.category,
    title: node.frontmatter.title,
    tableOfContents: node.tableOfContents,
    date: node.frontmatter.date ? moment(node.frontmatter.date) : moment(node.parent.birthTime),
  }
}

export const normalizeAsciidoc = (node) => {
  return {
    id: node.id,
    kind: "asciiDoc",
    slug: node.fields.slug,
    tags: node.pageAttributes.tags.split(/,\s*/),
    category: node.pageAttributes.category,
    title: node.document.title,
    date: node.pageAttributes.date ? moment(node.pageAttributes.date) : moment(node.parent.birthTime),
  }
}

export const usePageData = () => {
  const { allAsciidoc, allMarkdownRemark } = useStaticQuery(
    graphql`
query allPages {
  allAsciidoc {
    edges {
      node {
        fields {
          slug
        }
        pageAttributes {
          tags
          category
          date
        }
        document {
          title
        }
        parent {
          ... on File {
            id
            birthTime
            modifiedTime
          }
        }
      }
    }
  }
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
    const markdownPages = allMarkdownRemark.edges.map(({ node }) => {
      return normalizeMarkdown(node)
    })
    const asciidocPages = allAsciidoc.edges.map(({ node }) => {
      return normalizeAsciidoc(node)
    })

    const allPages = [...markdownPages, ...asciidocPages].sort((page1, page2) => (page2.date - page1.date));
    // TODO: sort the pages!

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