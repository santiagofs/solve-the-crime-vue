import { villains, weapons, heroes } from '../collections'
import { Level } from '../../models'


const level =  new Level({
  collections: [villains, weapons, heroes],
  itemsPerCollection: 6,
})

export default level