import { Item, Collection } from '../../models/'

const items = [
  new Item('V1'),
  new Item('V2'),
  new Item('V3'),
  new Item('V4'),
  new Item('V5'),
  new Item('V6')
]
export default new Collection('victims', items)
