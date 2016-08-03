import Backbone from 'backbone'

import Band from '../models/Band'

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
      if (band.get('id') === bandId) {
        realId = band.get('_id')
      }
    })
    return realId
  }
})

export default VoteBands
