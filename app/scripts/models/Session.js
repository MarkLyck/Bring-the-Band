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
    return new Promise((resolve, reject) => {
      this.save({username: username, password: password},
      {
        success: (model, response) => {
          localStorage.authtoken = response._kmd.authtoken
          this.unset('password')
          this.set('showModal', false)
          resolve()
        },
        error: function(model, response) {
          console.log('ERROR: Login failed: ', response.responseText);
          if (response.responseText.indexOf('IncompleteRequestBody') !== -1) {
            if (username === '') {
              reject('Username missing')
            } else {
              reject('Password missing')
            }
          } else if (response.responseText.indexOf('InvalidCredentials') !== -1) {
            reject('Wrong username or password')
          }
        }
      })
    })
  },
  signup: function(username, password, verifyPass) {
    return new Promise((resolve, reject) => {
      if (this.verifyPassword(password, verifyPass) && username.length > 3 && password.length > 3) {
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
            resolve()
          },
          error: (model, response) => {
            reject('Username taken')
          }
        })
      } else if (!this.verifyPassword(password, verifyPass)){
        reject('Password doesn\'t match')
      } else if (username.length < 4) {
        reject('Username must be 4 characters')
      } else if (password.length < 4) {
        reject('Password must be 4 characters')
      } else {
        reject('Signup failed')
      }
    })
  },
  verifyPassword: function(pass, verifyPass) {
    if (pass === verifyPass) {
      return true
    } else {
      return false
    }
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
