import Backbone from 'backbone'

import Band from '../models/Band'
import Vote from '../models/Vote'

const VoteBands = Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/kid_HyAproyt/bands`,
  model: Band,
  // bandExists: function(bandName) {
  //   let foundBand = false
  //   this.models.forEach(band => {
  //     if (band.get('name') === bandName) {
  //       foundBand = true
  //     }
  //   })
  //   return foundBand
  // },
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
    console.log('creating new Album');
    this.create({
      name: band.name,
      imgURL: band.imgURL,
      bandId: band.id,
      spotifyURL: band.spotifyURL
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
            this.trigger('update')
          },
          error: function() {
            console.error('Creating vote failed')
          }
        })
      },
      error: function() {
        console.error('Creating band failed')
      }
    }, {wait: true})
  },
  getModelVotes: function() {
    console.log('Getting model votes');
    this.forEach((band) => {
      band.getVotes()
    })
  }
})

export default VoteBands
