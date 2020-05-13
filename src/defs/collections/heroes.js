import { Item, Collection } from '../../models'
const items = [
  new Item('batman', 'heroes/batman.svg'),
  new Item('birdman', 'heroes/birdman.svg'),
  new Item('flash', 'heroes/flash.svg'),
  new Item('hulk', 'heroes/hulk.svg'),
  new Item('leono', 'heroes/leono.svg'),
  new Item('robocop', 'heroes/robocop.svg'),
  new Item('superman', 'heroes/superman.svg'),
  new Item('thor', 'heroes/thor.svg')
]
export default new Collection('heroes', items)
