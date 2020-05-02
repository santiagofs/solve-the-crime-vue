import { Item, Collection } from '../../models/'

const items = [
  new Item('M1'),
  new Item('M2'),
  new Item('M3'),
  new Item('M4'),
  new Item('M5'),
  new Item('M6')
]
export default new Collection('motives', items)
