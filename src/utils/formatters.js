export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

export const generatePlaceholder = (val) => {
  return {
    _id: `${val._id}-placeholder`,
    boardId: val.boardId,
    columnId: val._id,
    FE_placeholder: true
  }
}