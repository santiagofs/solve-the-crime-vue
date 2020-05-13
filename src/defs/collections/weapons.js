import { Item, Collection } from '../../models/'

const items = [
  new Item('axe', 'weapons/axe.svg'),
  new Item('bomb', 'weapons/bomb.svg'),
  new Item('dynamite', 'weapons/dynamite.svg'),
  new Item('granade', 'weapons/granade.svg'),
  new Item('poison', 'weapons/poison.svg'),
  new Item('trap', 'weapons/trap.svg')
]
export default new Collection('weapons', items)
