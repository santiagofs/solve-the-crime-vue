export class Item {
  constructor(name, icon) {
    this.name = name
    this.icon = icon ? require('@/assets/icons/' + icon) : ''
    this.parent = null
  }
}
