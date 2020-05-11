export class Level {
  constructor(config) {
    // reduce the collections items to match the level configuration
    const itemsPerCollection = config.itemsPerCollection || 6
    this.collections = config.collections.map(col => col.truncate(itemsPerCollection))
    this.floors = config.floors || 2
    this.roomsPerFloor = config.roomsPerFloor || 3
  }

  getCollections() {
    return [...this.collections ]
  }

  getItemsNames() {
    return this.collections.reduce((names, collection) => {
      return [...names, ...collection.getItemsNames()]
    }, [])
  }
}
