import { Produtos } from '../../../collections/Produtos'
import { Users } from '../../../collections/Users'
import { Media } from '../../../collections/Media'

export default {
  imports: {
    Products: () => import('payload').then(m => m.Products),
  },
}
