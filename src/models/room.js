export class Room {
  constructor(floorNumber, roomNumber, collections) {
    this.floorNumber = floorNumber
    this.roomNumber = roomNumber
    this.collections = collections

    this.solved = false
  }

  removeItem(collectionName, itemName) {
    this.collections[collectionName].removeItem(itemName)
  }
}
