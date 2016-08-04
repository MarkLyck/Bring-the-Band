import $ from 'jquery'
import Backbone from 'backbone'

import SearchBand from '../models/SearchBand'
import store from '../store/'

const SearchBands = Backbone.Collection.extend({
  model: SearchBand,
  searchFor: function(term) {
    $.ajax({
      url: `https://api.spotify.com/v1/search`,
      data: {
        q: term,
        type: 'artist'
      },
      success: (response) => {
        response.artists.items.forEach(artist => {
          if (artist.images[0]) {
            this.add({
              name: artist.name,
              id: artist.id,
              imgURL: artist.images[0].url
            })
          }
        })

        store.searchBands.next = response.artists.next
        store.searchBands.offset = 20
        store.searchBands.total = response.artists.total
        this.trigger('update')
      },
      error: function(response) {
        console.log('ERROR FETCHING FROM SERVER: ', response);
      }
    })
  },
  loadMore: function(term) {
    console.log('loadMore on coll');
    console.log(store.searchBands.total);
    console.log(this.models.length);
    if (store.searchBands.total > this.models.length) {
      $.ajax({
        url: `https://api.spotify.com/v1/search`,
        data: {
          q: term,
          type: 'artist',
          offset: store.searchBands.offset,
          limit: 20
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
          store.searchBands.next = response.artists.next
          store.searchBands.offset += 20
        },
        error: function(response) {
          console.log('ERROR FETCHING FROM SERVER: ', response);
        }
      })
    }
  }
})

export default SearchBands
