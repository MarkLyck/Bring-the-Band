import {expect} from 'chai'
import $ from 'jquery'

import Band from '../../../app/scripts/models/Band'

describe('band model', function() {
  let band = new Band({
    id:"1YEGETLT2p8k97LIo3deHL",
    imgURL:"https://i.scdn.co/image/9ab67f7ff5ef747a1a49856b2aa2a28f8e780ab5",
    name:"Crash Test Dummies",
    votes:0
  })

  it('should exist', () => {
    expect(band).to.exist
  })

  it('should have a voteForBand() function', () => {
    expect(band).to.have.property('voteForBand')
  })

  it('voteForBand() to make a POST request to /votes', (done) => {
    $(document).ajaxSend(function(e, xhrAjax, jqueryAjax) {
      if (jqueryAjax.url.indexOf('https://baas.kinvey.com/appdata/kid_HyAproyt/votes') !== -1 && jqueryAjax.type === 'POST') {
        done()
      }
    })
    band.voteForBand()
  })

  it('should have a removeVote() function', () => {
    expect(band).to.have.property('removeVote')
  })

  it('removeVote() to make a GET request to /votes', (done) => {
    $(document).ajaxSend(function(e, xhrAjax, jqueryAjax) {
      if (jqueryAjax.url.indexOf('https://baas.kinvey.com/appdata/kid_HyAproyt/votes?query={"bandId":') !== -1 && jqueryAjax.type === 'GET') {
        done()
      }
    })
    band.removeVote()
  })

  it('should have a getVotes() function', () => {
    expect(band).to.have.property('getVotes')
  })

  // This will fail, because it makes the same get request as removeVote() and done() is called multiple times.

  // it('getVotes() to make a GET request to /votes', (done) => {
  //   $(document).ajaxSend(function(e, xhrAjax, jqueryAjax) {
  //     console.log(jqueryAjax.url);
  //     if (jqueryAjax.url.indexOf('https://baas.kinvey.com/appdata/kid_HyAproyt/votes?query={"bandId":') !== -1 && jqueryAjax.type === 'GET') {
  //       done()
  //     }
  //   })
  //   band.getVotes()
  // })
})
