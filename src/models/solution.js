import _ from 'lodash'
import { Rule } from './rule'

export class Solution {

  constructor(items) {

    // generate a random solution
    this.solution = Object.keys(items).reduce((prev, itemName) => {
      prev[itemName] = _.sample(items[itemName])
      return prev
    }, {})

    // create the rules using copy of the items
    this.items = {... items }
    this.rules = []
    this.unsolvedItems = Object.keys(items)
    this.isSolved = false
    this.createRules()

    // once we have the rules, let's reinit the items and the solution status
    this.items = {... items }
    this.unsolvedItems = Object.keys(items)
    this.isSolved = false
  }

  itemsNames () {
    return Object.keys(this.items)
  }

  _checkItemSolved(item) {
    if (this.items[item].length === 1) {
      _.pull(this.unsolvedItems, item)
    }
    this.isSolved = this.unsolvedItems.length === 0
  }

  _createRule() {
    let rule = null
    // get any unsolved item from the solution
    const A = _.sample(this.unsolvedItems)
    // get any other item
    const B = _.sample(_.pull(this.itemsNames(), A))

    // create the rule
    rule = new Rule({name: A, room: this.solution[A]}, {name: B, room: this.solution[B]})
    // if the rule makes any changes, we are ok, if not, recursively create the rule again
    return this.applyRule(rule, true) ? rule : this._createRule()
  }
  createRule() {
    if (this.isSolved)  return false
    this.rules.push(this._createRule())
  }
  createRules() {
    let i = 0
    do {
      i++
      this.createRule()
      this.applyRules()
    } while (!this.isSolved && (i < 1000))
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

  applyRule(rule) {
    let items = {... this.items}
    items = this._applyRule(items, rule)
    const changed = (this.items[rule.A].length !== items[rule.A].length) || (this.items[rule.B].length !== items[rule.B].length)
    this._checkItemSolved(rule.A)
    this._checkItemSolved(rule.B)

    this.items = items
    return changed
  }

  applyRules() {
    let i = 0
    let changed = false
    do {
      i++
      changed = false
      this.rules.forEach(rule => {
        changed = changed || this.applyRule(rule)
      })
    } while (changed && (i < 1000))
  }

  hint() {
    let i = 0
    let changed = false
    const rules = _.shuffle(this.rules)
    do {
      const rule = rules[i]
      changed = this.applyRule(rule)
      i++
    } while (!changed && (i < rules.length))

  }
  itemHasRoom(itemName, coords) {
    return _.some(this.items[itemName], coords)
  }
}