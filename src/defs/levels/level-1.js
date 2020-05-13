import { villains, weapons } from '../collections'
import { Level } from '../../models'


const level =  new Level({
  collections: [villains, weapons],
  itemsPerCollection: 4,
})

export default level