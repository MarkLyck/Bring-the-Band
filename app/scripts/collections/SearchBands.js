import $ from 'jquery'
import Backbone from 'backbone'

import SearchBand from '../models/SearchBand'

const SearchBands = Backbone.Collection.extend({
  model: SearchBand,
  searchFor: function(term, store) {
    this.reset()
    $.ajax({
      url: `https://api.spotify.com/v1/search`,
      data: {
        q: term,
        type: 'artist'
      },
      success: (response) => {
        response.artists.items.forEach(artist => {
          let imgURL = 'assets/images/album-cover.jpg'
          if (artist.images[0]) {
            imgURL = artist.images[0].url
          }
          this.add({
            name: artist.name,
            id: artist.id,
            imgURL: imgURL,
            spotifyURL: artist.external_urls.spotify,
            uri: artist.uri
          })
        })

        store.searchBands.next = response.artists.next
        store.searchBands.offset = 20
        store.searchBands.total = response.artists.total
        store.searchBands.fetching = false
        this.trigger('update')
      },
      error: function(response) {
        console.log('ERROR FETCHING FROM SERVER: ', response);
      }
    })
  },
  loadMore: function(term, store) {
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
          store.searchBands.loadingMore = false
          response.artists.items.forEach(artist => {
            let imgURL = 'assets/images/album-cover.jpg'
            if (artist.images[0]) {
              imgURL = artist.images[0].url
            }
            this.add({
              name: artist.name,
              id: artist.id,
              imgURL: imgURL,
              spotifyURL: artist.external_urls.spotify,
              uri: artist.uri
            })
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
