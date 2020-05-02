import { Room } from './room'
// import { collections } from '../crime-scene.helpers'

export class Scenario {
  constructor(level) {
    this.level = level
    this.rooms = []
    for (let f = 0; f < level.floors; f++) {
      this.rooms[f] = []
      for (let r = 0; r < level.roomsPerFloor; r++) {
        const room = new Room(f, r, level.getCollections())
        this.rooms[f][r] = room
      }
    }
  }
}
