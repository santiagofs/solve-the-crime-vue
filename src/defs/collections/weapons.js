import { Item, Collection } from '../../models/'

const items = [
  new Item('W1'),
  new Item('W2'),
  new Item('W3'),
  new Item('W4'),
  new Item('W5'),
  new Item('W6')
]
export default new Collection('weapons', items)
