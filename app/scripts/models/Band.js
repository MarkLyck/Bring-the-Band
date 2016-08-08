import $ from 'jquery'
import Backbone from 'backbone'
import store from '../store'
import Vote from './Vote'

const Band = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/appdata/kid_HyAproyt/bands`,
  idAttribute: '_id',
  defaults: {
    name: '',
    imgURL: '',
    votes: 0,
    spotifyURL: '',
    uri: ''
  },
  voteForBand: function() {
    return new Promise((resolve, reject) => {
      store.session.addVoteFor(this.get('_id'))

      let votes = this.get('votes')
      votes++
      this.set('votes', votes)

      let vote = new Vote()

      vote.save({
        bandId: this.get('_id'),
        userName: store.session.get('username')
      }, {
        success: (voteResponse) => {
          resolve(this.get('votes'))
          this.trigger('update')
        },
        error: function() {
          reject()
          throw new Error('CREATING VOTE FAILED')
        }
      })
    })

  },
  removeVote: function() {
    $.ajax(`https://baas.kinvey.com/appdata/${store.settings.appKey}/votes?query={"bandId":"${this.get('_id')}"}`)
    .then((response) => {
      response.filter(vote => {
        if (vote.userName === store.session.get('username')) {
          return vote
        }
      }).forEach(vote => {
        $.ajax({
          type: 'DELETE',
          url: `https://baas.kinvey.com/appdata/${store.settings.appKey}/votes/${vote._id}`,
          success: (r) => {
            this.set('votes', (this.get('votes') -1))
            store.session.removeVoteFor(vote.bandId)
          },
          error: (e) => {
            console.error('ERROR: ', e);
          }
        })
      })
    })
  },
  getVotes: function() {
    $.ajax(`https://baas.kinvey.com/appdata/${store.settings.appKey}/votes?query={"bandId":"${this.get('_id')}"}`)
    .then((response) => {
      this.set('votes', response.length)
      store.voteBands.foundVotes++
      if (store.voteBands.foundVotes === store.voteBands.data.models.length) {
        store.voteBands.fetching = false
        store.voteBands.data.trigger('update')
      }
    })
    .fail(() => {
      store.voteBands.foundVotes++
    })
  }
})

export default Band
