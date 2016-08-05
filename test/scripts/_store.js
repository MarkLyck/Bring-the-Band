import {expect} from 'chai'

import store from '../../app/scripts/store'

let testBand = {
  id:"1YEGETLT2p8k97LIo3deHL",
  imgURL:"https://i.scdn.co/image/9ab67f7ff5ef747a1a49856b2aa2a28f8e780ab5",
  name:"Crash Test Dummies",
  votes:0
}

describe('store', function() {
  it('should exist', () => {
    expect(store).to.exist
  })
  it('should have a session', () => {
    expect(store).to.have.property('session')
  })
  it('should have searchBands', () => {
    expect(store).to.have.property('searchBands')
    expect(store.searchBands).to.have.property('data')
    expect(store.searchBands).to.have.property('next')
    expect(store.searchBands).to.have.property('prev')
    expect(store.searchBands).to.have.property('offset')
    expect(store.searchBands).to.have.property('total')
  })
  it('should have a voteBands', () => {
    expect(store).to.have.property('voteBands')
    expect(store.voteBands).to.have.property('data')
  })
  it('should have a settings', () => {
    expect(store).to.have.property('settings')
    expect(store.settings).to.have.property('appKey')
    expect(store.settings).to.have.property('appSecret')
    expect(store.settings).to.have.property('basicAuth')
  })
})

describe('store.session', function() {
  it('should have a login() method', () => {
    expect(store.session).to.have.property('login')
    expect(store.session.login).to.be.a('function');
  })
  it('should have a signup() method', () => {
    expect(store.session).to.have.property('signup')
    expect(store.session.signup).to.be.a('function');
  })
  it('should have a logout() method', () => {
    expect(store.session).to.have.property('logout')
    expect(store.session.logout).to.be.a('function');
  })
  it('should have a retrieve() method', () => {
    expect(store.session).to.have.property('retrieve')
    expect(store.session.retrieve).to.be.a('function');
  })
  it('should have a updateUser() method', () => {
    expect(store.session).to.have.property('updateUser')
    expect(store.session.updateUser).to.be.a('function');
  })


  it('should have a addVoteFor() method', () => {
    expect(store.session).to.have.property('addVoteFor')
    expect(store.session.addVoteFor).to.be.a('function');
  })
  it('addVoteFor() should add a vote to session.votedFor[]', () => {
    expect(store.session).to.have.property('addVoteFor')
    expect(store.session.addVoteFor).to.be.a('function');
  })

  it('should have a removeVoteFor() method', () => {
    expect(store.session).to.have.property('removeVoteFor')
    expect(store.session.removeVoteFor).to.be.a('function');
  })


})

describe('store.searchBands', function() {

})

describe('store.voteBands', function() {
  it('should have data', () => {
    expect(store.voteBands).to.have.property('data')
  })
  it('should have a createBand() method', () => {
    expect(store.voteBands.data).to.have.property('createBand')
  })

  it('running createBand() should create a band with a vote', () => {
    expect(store.voteBands.data.models).to.have.length(0)
    store.voteBands.data.createBand(testBand, store.session)
    expect(store.voteBands.data.models).to.have.length(1)
    expect(store.voteBands.data.models[0].get('votes')).to.equal(1)
  })

  // it('running createBand() should also update session.votedFor', () => {
  //   expect(store.session.get('votedFor')).to.have.length(1)
  // })

  it('should have a getModelVotes() method', () => {
    expect(store.voteBands.data).to.have.property('getModelVotes')
  })
})
