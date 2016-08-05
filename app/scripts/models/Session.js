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
    votedFor: []
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
  clearVotes: function() {
    this.get('votedFor').forEach(vote => {
      this.removeVoteFor(vote)
    })
  },
  addVoteFor: function(id) {
    console.log('ADDING VOTE for: ', id);

    let votedFor = this.get('votedFor')
    votedFor.push(id)
    this.set('votedFor', votedFor)

    console.log('Updated votedFor: ', this.get('votedFor'));

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
      votedFor: []
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
      success: () => {
        console.log(this.get('votedFor'));
        // this.clearVotes()
      },
      error: function(response) {
        throw new Error('FETCHING USER FAILED!')
      }
    })
  },
  updateUser: function() {
    console.log('updating user');
    console.log('this in update: ', this.get('votedFor').length);
    $.ajax({
      type: 'PUT',
      url: `https://baas.kinvey.com/user/${store.settings.appKey}/${this.get('userId')}`,
      contentType: 'application/json',
      data: JSON.stringify({votedFor: this.get('votedFor')}),
      success: (r) => {
        console.log('response: ', r);
        console.log('success: ', this);
      },
      error: (e) => {
        console.error('Putting user: ', e)
      }
    })
  }
})

export default Session
