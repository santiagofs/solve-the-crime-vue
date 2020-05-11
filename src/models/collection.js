import _ from 'lodash'

export class Collection {
  constructor(name, items = []) {
    this.name = name
    this.items = items.map(item => {
        item.parent = this.name // use a key instead of binding the collection objecto to avoid circular references in render
        return item
      })
    this.solution = _.shuffle(this.items)[0] // this is only for the second part, once we know what element is in which room
  }
  truncate(max) {
    this.items =  this.items.slice(0, max) // reduceOn(this.items_.slice(0, max), 'name')
    return this
  }

  getItemsNames() {
    return this.items.map(e => e.name)
  }

  removeItem(itemName) {
    const ndx = this.items.findIndex(e => e.name === itemName)
    if (ndx === -1)
      throw `item '${itemName}' not found int collection '${this.name}'`
    this.items.splice(ndx, 1)

    //this.solved = this.items.length <= 1
  }
}
