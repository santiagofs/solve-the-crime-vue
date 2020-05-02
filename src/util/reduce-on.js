export default (array, property, transform = e => e) => {
  return array.reduce((prev, item) => {
    prev[item[property]] = transform(item)
    return prev
  }, {})
}
