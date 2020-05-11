import { Item, Collection } from '../../models/'

const items = [
  new Item('K1'),
  new Item('K2'),
  new Item('K3'),
  new Item('K4'),
  new Item('K5'),
  new Item('K6')
]
export default new Collection('killers', items)
