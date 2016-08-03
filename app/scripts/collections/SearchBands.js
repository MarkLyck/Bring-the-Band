import $ from 'jquery'
import Backbone from 'backbone'

import Band from '../models/Band'

const SearchBands = Backbone.Collection.extend({
  model: Band,
  searchFor: function(term) {
    $.ajax({
      url: `https://api.spotify.com/v1/search`,
      data: {
        q: term,
        type: 'album'
      },
      success: function(response) {
        console.log(response);
      },
      error: function(response) {
        console.log('ERROR: ', response);
      }
    })
  }
})

export default SearchBands
