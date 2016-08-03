import Backbone from 'backbone'
import store from '../store'

const Band = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/appdata/kid_HyAproyt/bands`,
  idAttribute: '_id',
  defaults: {
    name: '',
    imgURL: '',
    votes: 0
  }
})

export default Band
