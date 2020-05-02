import { reduceOn } from '../util'

export class Level {
  constructor(config) {
    const itemsPerCollection = config.collections.itemsPerCollection || 4
    this.collections = reduceOn(config.collections, 'name', col => {
      col.truncate(itemsPerCollection)
      return col
    })

    this.floors = config.floors || 2
    this.roomsPerFloor = config.roomsPerFloor || 3
  }

  getCollections() {
    return {...this.collections }
  }
}
