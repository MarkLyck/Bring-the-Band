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
        type: 'artist'
      },
      success: (response) => {
        console.log(response);
        response.artists.items.forEach(artist => {
          if (artist.images[0]) {
            this.add({
              name: artist.name,
              id: artist.id,
              imgURL: artist.images[0].url
            })
          }
        })
      },
      error: function(response) {
        console.log('ERROR: ', response);
      }
    })
  }
})

export default SearchBands
