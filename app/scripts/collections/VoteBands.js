import Backbone from 'backbone'

import Band from '../models/Band'
import Vote from '../models/Vote'

import store from '../store'

const VoteBands = Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/kid_HyAproyt/bands`,
  model: Band,
  bandExists: function(bandName) {
    let foundBand = false
    this.models.forEach(band => {
      if (band.get('name') === bandName) {
        foundBand = true
      }
    })
    return foundBand
  },
  getRealID: function(bandId) {
    let realId = ''
    this.models.forEach(band => {
      if (band.get('bandId') === bandId) {
        realId = band.get('_id')
      }
    })
    return realId
  },
  createBand: function(band) {
    console.log('creating new Album');
    this.create({
      name: band.name,
      imgURL: band.imgURL,
      bandId: band.id
    }, {
      success: (bandResponse) => {
        let vote = new Vote()

        vote.save({
          bandId: bandResponse.get('_id'),
          userName: store.session.get('username')
        }, {
          success: (voteResponse) => {
            this.trigger('update')
            store.session.addVoteFor(this.get('_id'))
          },
          error: function() {
            throw new Error('CREATING VOTE FAILED')
          }
        })
      },
      error: function() {
        throw new Error('CREATING BAND FAILED')
      }
    }, {wait: true})
  },
})

export default VoteBands
