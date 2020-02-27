module.exports = {
  siteMetadata: {
    title: `Korny's Digital Garden sample`,
    description: `This is a sample site only`,
    author: `@kornys`,
  },
  pathPrefix: "/digital-garden-sample",
  plugins: [
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,

        // Plugins configs
        plugins: [
          'gatsby-remark-graphviz',
          'gatsby-remark-graph',
          'gatsby-remark-autolink-headers',
        {
          resolve: `gatsby-remark-embed-snippet`,
          options: {},
        },
        {
          resolve: `gatsby-remark-prismjs`,
          options: {
            aliases: {rs: "rust"},
          }
        },
        // {
        //   resolve: `gatsby-remark-relative-images`,
        // },
        {
          resolve: `gatsby-remark-images`,
          options: {
            // It's important to specify the maxWidth (in pixels) of
            // the content container as this plugin uses this as the
            // base for generating different widths of each image.
            maxWidth: 960,
          },
        },
      ],
      },
    },
    {
      resolve: `gatsby-transformer-asciidoc`,
      options: {
        attributes: {
          showtitle: false,
          doctype: 'book',
        },
      },
    },
  ],
}
