import _ from 'lodash'

export class Rule {
  constructor(a, b) {
    console.log(a)
    const posA = a.room
    const posB = b.room
    this.axis = posA.floor === posB.floor ? 'room' : (posA.room === posB.room ? 'floor' :_.sample(['room', 'floor']))
    const distance = posB[this.axis] - posA[this.axis]
    this.A = (distance >= 0 ? a : b).name
    this.itemA = a.item
    this.B = (distance >= 0 ? b : a).name
    this.itemB = b.item
    this.distance = _.sample([Math.abs(distance)]) // , '?'
    this.usefull = true // if the rule will make any change on the scenario
  }
}
