import Session from './models/Session'
import SearchBands from './collections/SearchBands'
import VoteBands from './collections/VoteBands'
import Albums from './collections/Albums'

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
    data: new VoteBands(),
    foundVotes: 0
  },
  albums: new Albums(),
  anom: {
    username: 'anom',
    authtoken: '4842425e-82fe-462f-bbab-a10f6ab71b48.98//DN44NfQ3amPLirtMvDlD4jEXuM8FWA86HWdgOJg='
  },
  settings: {
    appKey: 'kid_HyAproyt',
    appSecret: '0d04b0e281504ed7a6c4d4b1d99783b5',
    basicAuth: btoa('kid_HyAproyt:0d04b0e281504ed7a6c4d4b1d99783b5')
  }
}

export default store
