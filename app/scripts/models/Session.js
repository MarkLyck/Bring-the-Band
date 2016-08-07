import $ from 'jquery'
import _ from 'underscore'
import Backbone from 'backbone'
import {hashHistory} from 'react-router'
import store from '../store'

const Session = Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/user/kid_HyAproyt/login`,
  idAttribute: '_id',
  defaults: {
    username: '',
    votedFor: [],
    showModal: false
  },
  parse: function(response) {
    if (response) {
      return {
        authtoken: response._kmd.authtoken,
        username: response.username,
        userId: response._id,
        votedFor: response.votedFor
      }
    }
  },
  addVoteFor: function(id) {
    let votedFor = this.get('votedFor')
    votedFor.push(id)
    this.set('votedFor', votedFor)

    this.updateUser()
  },
  removeVoteFor: function(id) {
    console.log('REMOVING VOTE from: ', id);

    let updatedVotedFor = this.get('votedFor')
    updatedVotedFor.push(id)
    updatedVotedFor = _.without(updatedVotedFor, id);

    console.log('this before remove: ', this.get('votedFor').length);
    this.set('votedFor', updatedVotedFor)

    console.log('this after remove: ', this.get('votedFor').length);

    this.updateUser()
  },
  login: function(username, password) {
    this.save({username: username, password: password},
    {
      success: (model, response) => {
        localStorage.authtoken = response._kmd.authtoken
        this.unset('password')
        this.set('showModal', false)
      },
      error: function(model, response) {
        console.log('ERROR: Login failed');
      }
    })
  },
  signup: function(username, password) {
    this.clear()
    store.session.save({
      username: username,
      password: password,
      votedFor: []
    },
    {
      url: `https://baas.kinvey.com/user/${store.settings.appKey}/`,
      success: (model, response) => {
        model.unset('password')
        localStorage.authtoken = response._kmd.authtoken
        this.set('showModal', false)
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
    this.set({
      username: 'anom',
      authtoken: store.anom.authtoken,
      votedFor: []
    })
  },
  retrieve: function() {
    this.fetch({
      url: `https://baas.kinvey.com/user/${store.settings.appKey}/_me`,
      success: () => {
      },
      error: function(response) {
        throw new Error('FETCHING USER FAILED!')
      }
    })
  },
  updateUser: function() {
    $.ajax({
      type: 'PUT',
      url: `https://baas.kinvey.com/user/${store.settings.appKey}/${this.get('userId')}`,
      contentType: 'application/json',
      data: JSON.stringify({votedFor: this.get('votedFor')}),
      success: (r) => {
      },
      error: (e) => {
        console.error('Putting user: ', e)
      }
    })
  }
})

export default Session
