import Backbone from 'backbone'

import Band from '../models/Band'
import Vote from '../models/Vote'

const VoteBands = Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/kid_HyAproyt/bands`,
  model: Band,
  getRealID: function(bandId) {
    let realId = ''
    this.models.forEach(band => {
      if (band.get('bandId') === bandId) {
        realId = band.get('_id')
      }
    })
    return realId
  },
  createBand: function(band, session) {
    // return new Promise((resolve, reject) => {
      this.create({
        name: band.name,
        imgURL: band.imgURL,
        bandId: band.id,
        spotifyURL: band.spotifyURL,
        uri: band.uri
      }, {
        success: (bandResponse) => {
          let band = this.get(bandResponse.get('_id'))
          band.set('votes', 1)
          session.addVoteFor(bandResponse.get('_id'))
          let vote = new Vote()

          vote.save({
            bandId: bandResponse.get('_id'),
            userName: session.get('username')
          }, {
            success: (voteResponse) => {
              // resolve()
              this.trigger('update')
            },
            error: function() {
              console.error('Creating vote failed')
              // reject()
            }
          })
        },
        error: function(e) {
          console.error('Creating band failed')
          // reject()
        }
      }, {wait: true})
    // })

  },
  getModelVotes: function(store) {
    store.voteBands.foundVotes = 0
    this.forEach((band) => {
      band.getVotes()
    })
  }
})

export default VoteBands
