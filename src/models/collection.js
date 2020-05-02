import _ from 'lodash'
import { reduceOn } from '../util'


export class Collection {
  constructor(name, items = []) {
    this.name = name
    this.items_ = _.shuffle(items).map(item => {
        item.parent = this
        return item
      })
    this.items = {}
    this.truncate(this.items_.length)
  }
  truncate(max) {
    this.items = reduceOn(this.items_.slice(0, max), 'name')
    return this.items
  }
  removeItem(itemName) {
    const ndx = this.items.findIndex(e => e.name === itemName)
    if (ndx === -1)
      throw `item '${itemName}' not found int collection '${this.name}'`
    this.items.splice(ndx, 1)

    //this.solved = this.items.length <= 1
  }
}
