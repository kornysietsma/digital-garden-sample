export const pagePath = (category, tag, slug) => {
  return `/${category || "-"}/${tag || "-"}${slug}`
}

