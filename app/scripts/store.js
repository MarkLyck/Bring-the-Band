import Session from './models/Session'
import Bands from './collections/Bands'

import SearchBands from './collections/SearchBands'

let store = {
  session: new Session(),
  bands: new Bands(),
  searchBands: new SearchBands(),
  settings: {
    appKey: 'kid_HyAproyt',
    appSecret: '0d04b0e281504ed7a6c4d4b1d99783b5',
    basicAuth: btoa('kid_HyAproyt:0d04b0e281504ed7a6c4d4b1d99783b5')
  }
}

export default store
