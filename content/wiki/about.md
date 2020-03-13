---
title: About
category: docs
tags: [website,wiki,meta]
---

This is a sample site showing how you could build a [Digital Garden](../garden/) using [GatsbyJs](../gatsby/) - see those pages for more info on what these things are.

## Why?

This started because I've been using a private [Jekyll](https://jekyllrb.com/) site for tracking my personal notes - diary, thoughts, work notes and the rest - for about 18 months, and found it very useful - but it was getting a bit of a mess.

I wanted to be able to search and browse by tags and categories; and I wanted to be able to store more random things.  Old history notes, tech snippets, whatever.

Then I was reading up on Gatsby, and I came across [this sample digital garden](https://github.com/johno/digital-garden) and associated links, and I thought "I could move my diary to gatsby" - so here we are.   (See the [Digital Garden](../garden/) page for more on gardens.)

## Approaches used and limitations so far

### Diary pages, Wiki pages and Firehose links
Conceptually, diary pages are for continual note taking - the sort of thing I dump as I'm working, usually in notebooks.  I'm not really structuring this, beyond every page having a date stamp, a title, a category, and a number of tags.

Wiki pages are for stuff that is longer lived - not time based.  Things like project overviews, guides to topics, and the rest.  To be honest at the moment 95% of my stuff is dated, but that may change over time.

Firehose is for capturing the mad stream of stuff I _might_ look at, or might not.  
TODO up to here.

Technically There is a vague separation between blog/diary entries, and wiki pages, but at the moment the only difference is timestamps - if a markdown page in the `/content/` directory has a date in the frontmatter, it's shown as a diary entry and displayed in reverse date order; if not it is shown as a wiki page.  By convention wiki pages are in `/content/wiki` but that's just convention.

### Firehose pages

### URL routes

The nature of gatsby is that everything is really a static html page at it's base.  So to build some browsing state like the "current category" and "current tag" settings, what I actually do is generate a bunch of pages (at build time) that correspond to different states.

Every page has a URL like `/category/tag/pagelocation/` - for this page it's `/-/-/wiki/about/` if you come from the main page.  Those `-` elements mean "you haven't selected a category or tag".

But this page has a category `docs` and a set of tags `website`, `wiki` and `meta`.  If you are browsing just the `docs` category, the URL becomes `/docs/-/wiki/about` [click here to see what that looks like](/docs/-/wiki/about/) - yup, it's exactly the same page, but now the `docs` category is highlighted on the left!

This magic means the current category and tag stay highlighted as you wander around the site, even though it's a static site.  (Yes, you could do this with browser local storage or something, but this way is more normal and doesn't need browser tricks)

How is this done?  The [gatsby-node.js](https://github.com/kornysietsma/digital-garden-sample/blob/master/gatsby-node.js) file is executed _at build time_ and it generates pages for each combination of tag and category needed.  That's a fair bit of duplication - but it's just in the generated html, so it's not all that many bytes.  And nothing has to happen at run-time, so it's real fast!

#### the catch

The one real problem with this - relative links don't always work.  If you are browsing this page at `/docs/website/wiki/about/` then a relative link to `../asciidoc/` won't work, because that page doesn't exist because the asciidoc page isn't tagged with `wiki`.  I need to think about how to fix this - it might need a special link handler :(

### Styling limitations

I've set things up for responsive styling - but I haven't actually implemented anything but a wide-screen style which works on my machine!

I plan to fix this - all it needs is some tweaks to [layout.css](https://github.com/kornysietsma/digital-garden-sample/blob/master/src/components/layout.css) to handle more page sizes.  But it's not done yet.

## Things that work

* Markdown
* [Asciidoc](/-/-/wiki/asciidoc/)
* [Embedded images](/-/-/blog/2020-01-02-images/)
* [Embedded diagrams](/-/-/blog/2020-01-03-diagrams/)
* Category and Tag indexes
* Table of contents for Markdown - see the right panel!

## Things that are planned or don't work

* Moar documentation needed!
* Css for other screen sizes - see above
* Most things don't work for asciidoc
* probably going to kill asciidoc - if you have no asciidoc pages, gatsby throws an error!
* Wiki linking and page linking more cleanly?
* Distinguish wiki pages from blog pages, both in frontmatter and in the UI (probably show wiki pages matching a q)

