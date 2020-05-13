import { Solution } from './'

export class Scenario {
  constructor(level) {
    this.level = level

    // const itemNames = level.getItemsNames()
    // const solution = itemNames.reduce((sol, name) => {
    //   sol[name] = []
    //   return sol
    // }, {})

    // this.rooms = []
    // for (let f = 0; f < level.floors; f++) {
    //   this.rooms[f] = []
    //   for (let r = 0; r < level.roomsPerFloor; r++) {
    //     const room = new Room(f, r, level.getCollections())
    //     this.rooms[f][r] = room
    //     itemNames.forEach(name => {
    //       solution[name].push({floor: f, room: r})
    //     })
    //   }
    // }

    this.solution = new Solution(level)
  }
}
