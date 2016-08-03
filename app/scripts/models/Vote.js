import Backbone from 'backbone'

const Vote = Backbone.Model.extend({
  url: `https://baas.kinvey.com/appdata/kid_HyAproyt/votes`,
  idAttribute: '_id',
  defaults: {
    bandId: '',
    userName: ''
  }
})

export default Vote
