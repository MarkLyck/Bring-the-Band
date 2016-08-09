import $ from 'jquery'
import Backbone from 'backbone'
import Album from '../models/Album'


const Albums = Backbone.Collection.extend({
  model: Album,
  getAlbumsFor: function(id) {
    return new Promise((resolve, reject) => {
      $.ajax(`https://api.spotify.com/v1/artists/${id}/albums?country=US`)
      .then((albums) => {
        this.add({
          uri: albums.items[0].uri
        })
        resolve(albums.items[0].uri)
      })
      .fail(reject)
    })
  }
})

export default Albums
