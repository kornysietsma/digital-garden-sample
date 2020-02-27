---
title: About
category: docs
date: 2020-01-01
tags: [website,wiki,meta]
---

This is all a bit of a work in progress.

## Blog posts vs Wiki pages

At the moment there isn't really a difference - any markdown or asciidoc files
under the `/content/` directory are slurped in and categorised by their "category" and "tags" frontmatter, then ordered by their "date" value.

There are `/content/blog` and `/content/wiki` folders, but at the moment it's just convention, they aren't treated differently

Page URLs are based on the file path, not the title or anything else.  So you can link between pages using relative links - but I'm looking to improve that later.

I tend to put datestamps in blog post titles, purely so I can see them sorted in a text editor and easily find the newest/oldest ones!

## Big limitations at the moment

I've set things up for responsive styling - but I haven't actually implemented anything but a wide-screen style which works on my machine!

Also this is a work in progress, more for getting ideas than actual production use.  I'm mostly using it for my private laptop-only diary and info dump, so it doesn't matter to me if it isn't perfect - but it definitely isn't perfect!

## Things that work

* Markdown
* Asciidoc
* Embedded images
* Embedded diagrams
* Category and Tag indexes
* Table of contents for Markdown

## Things that are planned or don't work

* Moar documentation needed!
* Css for other screen sizes - see above
* Most things don't work for asciidoc
* probably going to kill asciidoc - if you have no asciidoc pages, gatsby throws an error!
* Wiki linking and page linking more cleanly
* Distinguish wiki pages from blog pages, both in frontmatter and in the UI (probably show wiki pages matching a q)

