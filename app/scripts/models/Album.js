import Backbone from 'backbone'

const Album = Backbone.Model.extend({
  defaults: {
    uri: ''
  }
})

export default Album
