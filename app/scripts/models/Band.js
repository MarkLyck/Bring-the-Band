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
    votes: 0
  },
  voteForBand: function() {
    console.log('VOTE FOR BAND MODEL');

    let votes = this.get('votes')
    votes++
    this.set('votes', votes)

    let vote = new Vote()

    vote.save({
      bandId: this.get('_id'),
      userName: store.session.get('username')
    }, {
      success: (voteResponse) => {
        this.trigger('update')
        store.session.addVoteFor(this.get('_id'))
      },
      error: function() {
        throw new Error('CREATING VOTE FAILED')
      }
    })

  },
  removeVote: function() {
    $.ajax(`https://baas.kinvey.com/appdata/${store.settings.appKey}/votes?query={"bandId":"${this.get('_id')}"}`)
    .then((response) => {
      let myVotes = response.filter((vote) => {
        if (vote.userName === store.session.get('username')) {
          return vote
        }
      })
    })
  },
  getVotes: function() {
    $.ajax(`https://baas.kinvey.com/appdata/${store.settings.appKey}/votes?query={"bandId":"${this.get('_id')}"}`)
    .then((response) => {
      this.set('votes', response.length)
      store.voteBands.data.trigger('update')
    })
  }
})

export default Band
