import { victims, weapons } from '../collections'
import { Level } from '../../models'


const level =  new Level({
  collections: [victims, weapons]
})

export default level