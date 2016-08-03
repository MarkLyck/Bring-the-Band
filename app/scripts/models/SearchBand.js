import Backbone from 'backbone'
import store from '../store'

const Band = Backbone.Model.extend({
  defaults: {
    name: '',
    imgURL: '',
    votes: 0
  }
})

export default Band
