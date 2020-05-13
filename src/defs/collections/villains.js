import { Item, Collection } from '../../models'

const items = [
  new Item('psycho', 'villains/psycho-2.svg'),
  new Item('alien', 'villains/alien-1.svg'),
  new Item('supervillain', 'villains/supervillain.svg'),
  new Item('prisioner', 'villains/prisioner.svg'),
  new Item('jason', 'villains/psycho-1.svg'),
  new Item('walter', 'villains/chemist.svg'),
  new Item('hannibal', 'villains/psycho.svg'),
  new Item('guason', 'villains/villian.svg')
]
export default new Collection('villains', items)
