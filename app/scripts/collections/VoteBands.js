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
        store.session.addVoteFor(bandResponse.get('_id'))
        let vote = new Vote()

        vote.save({
          bandId: bandResponse.get('_id'),
          userName: store.session.get('username')
        }, {
          success: (voteResponse) => {
            this.trigger('update')
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
  getModelVotes: function() {
    console.log('Getting model votes');
    console.log('this: ', this);
    console.log('store: ', store.voteBands.data);
    this.forEach((band) => {
      band.getVotes()
    })
  }
})

export default VoteBands