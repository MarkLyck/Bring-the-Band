import Session from './models/Session'

let store = {
  session: new Session(),
  settings: {
    appKey: 'kid_HyAproyt',
    appSecret: '0d04b0e281504ed7a6c4d4b1d99783b5',
    basicAuth: btoa('kid_HyAproyt:0d04b0e281504ed7a6c4d4b1d99783b5')
  }
}

export default store
