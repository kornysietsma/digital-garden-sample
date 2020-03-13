import React from "react"
const urlRegex = require("url-regex")

const FirehoseEntry = ({ node }) => {
  /*  * title can be text, a URL, or a URL + text
   * if URL turn into link - maybe shrink text to smaller? "link to foo.com"?
   * if URL + text turn into link with text
   * if just text, leave alone
   * lines might be blank or have URLs
   * trim blanks
   * if all that is left is a single URL, maybe turn the title into a link???
   */
  const title = node.title.trim()
  const titleIsUrl = urlRegex({ exact: true }).test(title)
  const titleUrlMatches = title.match(urlRegex())
  const titleUrlCount = titleUrlMatches ? titleUrlMatches.length : 0
  console.log("title", title, titleIsUrl, titleUrlCount)

  let cleanLines = node.lines.map(l => l.trim()).filter(l => l.length > 0)

  const singleLine = cleanLines.length === 1
  const lineIsUrl = singleLine
    ? urlRegex({ exact: true }).test(cleanLines[0])
    : false

  let titleHtml = title
  if (titleIsUrl) {
    titleHtml = (
      <a href={title} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    )
  } else if (titleUrlCount === 1) {
    const url = titleUrlMatches[0]
    const titleRemains = title.replace(urlRegex(), "").trim()
    titleHtml = (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {titleRemains}
      </a>
    )
  } else if (titleUrlCount > 1) {
    titleHtml = title.replace(
      urlRegex(),
      url => `<a href=${url} target="_blank" rel="noopener noreferrer">${url}</a>`
    )
    titleHtml = <span dangerouslySetInnerHTML={{ __html: titleHtml }} />
    //   console.log(linkifyUrls(title, { type: "string", attributes: { target: "_blank" }}));
  } else if (lineIsUrl) {
    titleHtml = (
      <a href={cleanLines[0]} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    )
    cleanLines = []
  }

  // todo - linkify lines, add tags
  const linesHtml = (
    <ul>
      {cleanLines.map(l => {
        const html = l.replace(
          urlRegex(),
          url => `<a href=${url} target="_blank">${url}</a>`
        )
        return <li dangerouslySetInnerHTML={{ __html: html }} />
      })}
    </ul>
  )

  console.log("lines", cleanLines, lineIsUrl)

  return (
    <li key={node.id}>
      {titleHtml} ({node.date}) {node.category}:{node.tags.join(",")}
      {linesHtml}
    </li>
  )
}

export default FirehoseEntry
