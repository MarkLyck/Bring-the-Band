import $ from 'jquery'
import Backbone from 'backbone'
import {hashHistory} from 'react-router'

import store from '../store'

const Session = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/user/kid_HyAproyt/login`,
  idAttribute: '_id',
  defaults: {
    username: '',
    votedFor: []
  },
  parse: function(response) {
    if (response) {
      return {
        authtoken: response._kmd.authtoken,
        username: response.username,
        userId: response._id
      }
    }
  },
  addVoteFor: function(id) {
    console.log('ADDING VOTE');

    let votedFor = this.get('votedFor')
    votedFor.push(id)
    this.set('votedFor', votedFor)

    // let realId = store.voteBands.data.getRealID(id)
    // let bandToVoteFor = store.voteBands.data.get(realId)
    // let votes = bandToVoteFor.get('votes')
    // votes++
    // bandToVoteFor.set('votes', votes)
    // bandToVoteFor.save()
    // this.updateUser()
    // console.log('VOTED FOR: ', bandToVoteFor);
  },
  removeVoteFrom: function(id) {
    let votedFor = this.get('votedFor')
    voteIndex = votedFor.indexOf(id)
    votedFor.splice(voteIndex, 1)
    this.set('votedFor', votedFor)
  },
  login: function(username, password) {
    this.save({username: username, password: password},
    {
      success: (model, response) => {
        localStorage.authtoken = response._kmd.authtoken
        this.unset('password')
        hashHistory.push('/')
      },
      error: function(model, response) {
        console.log('ERROR: Login failed');
      }
    })
  },
  signup: function(username, password) {
    store.session.save({
      username: username,
      password: password,
      highscore: this.get('highScore')
    },
    {
      url: `https://baas.kinvey.com/user/${store.settings.appKey}/`,
      success: function(model, response) {
        model.unset('password')
        localStorage.authtoken = response._kmd.authtoken
        hashHistory.push('/')
      },
      error: function(model, response) {
        console.log('ERROR: ', arguments);
      }
    })
  },
  logout: function() {
    $.ajax({
      type: 'POST',
      url: `https://baas.kinvey.com/user/${store.settings.appKey}/_logout`,
    })
    localStorage.removeItem('authtoken')
    this.clear()
  },
  retrieve: function() {
    this.fetch({
      url: `https://baas.kinvey.com/user/${store.settings.appKey}/_me`,
      success: function() {

      },
      error: function(response) {
        throw new Error('FETCHING USER FAILED!')
      }
    })
  },
  updateUser: function() {
    this.save(null, {
      type: 'PUT',
      url: `https://baas.kinvey.com/user/${store.settings.appKey}/${this.get('userId')}`,
    }, {silent: true})
  }
})

export default Session
