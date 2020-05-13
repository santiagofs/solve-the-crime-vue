import _ from 'lodash'

export class Level {
  constructor(config) {
    // reduce the collections items to match the level configuration
    const itemsPerCollection = config.itemsPerCollection || 6
    console.log(itemsPerCollection)
    this.collections = config.collections.map(col => col.shuffle().truncate(itemsPerCollection))
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

  getItem(name) {
    let item = null
    this.collections.forEach(col => {
      col.items.forEach(i => {
        if (i.name === name) {
          item = i
          return
        }
      })
      if (item) return
    })

    return item
  }
}
