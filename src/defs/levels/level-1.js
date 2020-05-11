import { victims, weapons } from '../collections'
import { Level } from '../../models'


const level =  new Level({
  collections: [victims, weapons],
  itemsPerCollection: 4,
})

export default level