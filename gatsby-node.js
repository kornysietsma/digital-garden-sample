/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const { createFilePath } = require(`gatsby-source-filesystem`)
const moment = require("moment")
const path = require(`path`)

/* 
Scan all markdown files and build pages for them + metadata

Note that best practices appear to be to do minimal queries here - just get the IDs,
then let the individual pages query for the rest.

As such this still needs to generate every possible route combo, alas, so we still need some magic.
But we can't reuse graphql here (as it's like a different world to the pages) so we can't avoid duplication

supported page routes
  /tags/ - show all tags, same as index for now
  /tags/x - show all pages for a tag
  /tags/x/slug - show single page for a tag
  /tags/-/slug - show single page when no tag was selected (especially for pages with no tags!)

So for each page we generate a page for every tag!
If no tags, we might want /tags/_/slug 

  in future add 
  /categories and so on - also means we can show/hide the categories tab
  /dates/yyyy/
  /dates/yyyy/mm

  /categories/x/tags/y ???

*/

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

function pathFor(category, tag, slug) {
  return `/${category || "-"}/${tag || "-"}${slug}`
}

function firehosePathFor(category, tag) {
  return `/firehose/${category || "-"}/${tag || "-"}`
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const allData = await graphql(`
    query DataQuery {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              category
              tags
              date
              title
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
  `)

  const allFirehose = await graphql(`
    query FirehoseQuery {
      allFirehose {
        edges {
          node {
            category
            tags
          }
        }
      }
    }
  `)

  // need to normalize the pages
  const allPages = allData.data.allMarkdownRemark.edges.map(({ node }) => {
    return {
      kind: "markdown",
      slug: node.fields.slug,
      title: node.frontmatter.title,
      tags: node.frontmatter.tags,
      category: node.frontmatter.category,
      date: node.frontmatter.date
        ? moment(node.frontmatter.date)
        : moment(node.parent.birthTime),
    }
  })

  const allFirehoseEntries = allFirehose.data.allFirehose.edges.map(
    ({ node }) => {
      return {
        tags: node.tags,
        category: node.category,
      }
    }
  )

  const allTagsEverywhere = [...allPages.flatMap(p => p.tags)]

  const allTags = [...new Set(allTagsEverywhere)].sort()

  const allCategoriesEverywhere = [...allPages.flatMap(p => p.category)]

  const allCategories = [...new Set(allCategoriesEverywhere)].sort()

  // tag indexes
  allTags.forEach(tag => {
    createPage({
      path: `/tag/${tag}`,
      component: path.resolve(`./src/templates/index-page.js`),
      context: {
        selectedTag: tag,
        selectedCategory: null,
      },
    })
  })
  allCategories.forEach(category => {
    createPage({
      path: `/category/${category}`,
      component: path.resolve(`./src/templates/index-page.js`),
      context: {
        selectedTag: null,
        selectedCategory: category,
      },
    })
    allTags.forEach(tag => {
      createPage({
        path: `/category/${category}/tag/${tag}`,
        component: path.resolve(`./src/templates/index-page.js`),
        context: {
          selectedTag: tag,
          selectedCategory: category,
        },
      })
    })
  })

  // page selection
  allPages.forEach(page => {
    // page with no selection
    createPage({
      path: pathFor(null, null, page.slug),
      component: path.resolve(`./src/templates/page.js`),
      context: {
        ...page,
        selectedTag: null,
        selectedCategory: null,
      },
    })
    // page with tag selected
    page.tags.forEach(tag => {
      createPage({
        path: pathFor(null, tag, page.slug),
        component: path.resolve(`./src/templates/page.js`),
        context: {
          ...page,
          selectedTag: tag,
          selectedCategory: null,
        },
      })
    })
    // page with category selected
    createPage({
      path: pathFor(page.category, null, page.slug),
      component: path.resolve(`./src/templates/page.js`),
      context: {
        ...page,
        selectedTag: null,
        selectedCategory: page.category,
      },
    })

    // page with category and tag
    page.tags.forEach(tag => {
      createPage({
        path: pathFor(page.category, tag, page.slug),
        component: path.resolve(`./src/templates/page.js`),
        context: {
          ...page,
          selectedTag: tag,
          selectedCategory: page.category,
        },
      })
    })
  })

  // for the firehose indexes want 4 kinds of page:
  // /firehose/-/- for all
  // /firehose/cat/- for category
  // /firehose/-/tag for tag
  // /firehose/cat/tag for both

  // the all case is easy
  createPage({
    path: firehosePathFor(null, null),
    component: path.resolve(`./src/templates/firehose-all.js`),
    context: {
      selectedTag: null,
      selectedCategory: null,
    },
  })

  const allFirehoseTags = [...allFirehoseEntries.flatMap(p => p.tags)]
  const uniqueFirehoseTags = [...new Set(allFirehoseTags)].sort()
  uniqueFirehoseTags.forEach(tag => {
    createPage({
      path: firehosePathFor(null, tag),
      component: path.resolve(`./src/templates/firehose-tag.js`),
      context: {
        selectedTag: tag,
        selectedCategory: null,
      },
    })
  })
  const allFirehoseCategories = [...allFirehoseEntries.flatMap(p => p.category)]
  const uniqueFirehoseCategories = [...new Set(allFirehoseCategories)].sort()
  uniqueFirehoseCategories.forEach(category => {
    createPage({
      path: firehosePathFor(category, null),
      component: path.resolve(`./src/templates/firehose-category.js`),
      context: {
        selectedTag: null,
        selectedCategory: category,
      },
    })
    const subTags = [
      ...allFirehoseEntries
        .filter(p => p.category === category)
        .flatMap(p => p.tags),
    ]
    const uniqueTags = [...new Set(subTags)].sort()
    uniqueTags.forEach(tag => {
      createPage({
        path: firehosePathFor(category, tag),
        component: path.resolve(`./src/templates/firehose-category-tag.js`),
        context: {
          selectedTag: tag,
          selectedCategory: category,
        },
      })
    })
  })
}
