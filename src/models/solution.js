import _ from 'lodash'
import { Rule } from './rule'

export class Solution {

  constructor(items, boardSize) {
    this.items = items
    this.solution = Object.keys(items).reduce((prev, itemName) => {
      prev[itemName] = _.sample(items[itemName])
      return prev
    }, {})
    console.log('solution', this.solution)

    this.rules = []
    this.isSolved = false
    this.boardSize = boardSize
  }

  itemsNames () {
    return Object.keys(this.items)
  }

  _createRule() {
    let rule = null
    // get an item that does not have a unique position in the grid

    const A = _.sample(this.itemsNames())
    const B = _.sample(_.pull(this.itemsNames(),A))

    rule = new Rule({name: A, room: this.solution[A]}, {name: B, room: this.solution[B]})
    return this.applyRule(rule, true) ? rule : this._createRule()
  }
  createRule() {
    if (this.isSolved) {
      return false
    }
    this.rules.push(this._createRule())
  }

  _reltiveCondition(posA, posB, distance, axis) {
    if (distance === '?') return posB[axis] > posA[axis]
    return posB[axis] - distance === posA[axis]
  }

  _applyRule(items, rule) {
    const distance = rule.distance
    const axis = rule.axis

    let retA = items[rule.A]
    let retB = items[rule.B]
    let ret = {...items}
    if (distance === 0) {
      ret[rule.A] = retA.filter(roomA => retB.filter(roomB => _.isEqual(roomA, roomB)).length),
      ret[rule.B] = retB.filter(roomA => retA.filter(roomB => _.isEqual(roomA, roomB)).length)
    } else {
      ret[rule.A] = retA.filter(roomA => retB.filter(roomB => this._reltiveCondition(roomA, roomB, distance, axis)).length),
      ret[rule.B] = retB.filter(roomB => retA.filter(roomA => this._reltiveCondition(roomA, roomB, distance, axis)).length)
    }
    return ret
  }

  applyRule(rule, test = false) {
    let items = {... this.items}

    items = this._applyRule(items, rule)
    const changed = (this.items[rule.A].length !== items[rule.A].length) || (this.items[rule.B].length !== items[rule.B].length)
    if (!test) this.items = items
    return changed
  }

  applyRules(test = false) {

    let i = 0
    let changed = false
    do {
      i++
      changed = false
      this.rules.forEach(rule => {
        changed = changed || this.applyRule(rule, test)
      })
      console.log(changed, i)
    } while(changed && i < 10)
  }

  itemHasRoom(itemName, coords) {
    return _.some(this.items[itemName], coords)
  }
}