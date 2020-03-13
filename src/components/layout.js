/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import "./layout.css"

import Header from "./header"
import Nav from "./nav"
import FirehoseNav from "./firehose-nav"
import MetaPageToc from "./meta-page-toc"
import MetaWiki from "./meta-wiki"
import MetaFirehose from "./meta-firehose"

const Layout = ({ children, pageContext, metadata, navMode, metaMode }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const modeBasedNav = navMode => {
    switch (navMode) {
      case "pages": {
        return <Nav pageContext={pageContext} />
      }
      case "firehose": {
        return <FirehoseNav pageContext={pageContext} />
      }
      default:
        return (
          <aside className="main-nav">
            <p>Bad mode: {navMode}</p>
          </aside>
        )
    }
  }

  const modeBasedMeta = metaMode => {
    switch (metaMode) {
      case "firehose": {
        return <MetaFirehose pageContext={pageContext} ></MetaFirehose>
      }
      case "pageToc": {
        return <MetaPageToc pageContext={pageContext} metadata={metadata} ></MetaPageToc>
      }
      case "wiki": {
        return <MetaWiki pageContext={pageContext} ></MetaWiki>
      }
      default:
        return (
          <aside className="main-nav">
            <p>Bad mode: {navMode}</p>
          </aside>
        )
          }
  }

  return (
    <div className="main-grid">
      <Header siteTitle={data.site.siteMetadata.title} />
      {modeBasedNav(navMode)}
      <main className="main-content">{children}</main>
      {modeBasedMeta(metaMode)}
      <footer className="main-footer">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
