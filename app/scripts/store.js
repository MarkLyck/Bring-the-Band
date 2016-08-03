import Session from './models/Session'

import SearchBands from './collections/SearchBands'
import VoteBands from './collections/VoteBands'

let store = {
  session: new Session(),
  searchBands: {
    data: new SearchBands(),
    next: '',
    prev: '',
    offset: 0,
    total: 0
  },
  voteBands: {
    data: new VoteBands()
  },
  settings: {
    appKey: 'kid_HyAproyt',
    appSecret: '0d04b0e281504ed7a6c4d4b1d99783b5',
    basicAuth: btoa('kid_HyAproyt:0d04b0e281504ed7a6c4d4b1d99783b5')
  }
}

export default store
