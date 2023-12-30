export const sortArray = (Array, orderBy, key) => {
  if (!Array || !orderBy || !key) return []
  return Array.sort((a, b) => (orderBy.indexOf(a[key]) - orderBy.indexOf(b[key])))
}
