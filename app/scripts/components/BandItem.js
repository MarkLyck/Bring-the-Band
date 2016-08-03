import React from 'react'

import VoteButton from './VoteButton'
import store from '../store'

const BandItem = React.createClass({
  getInitialState: function() {
    if (store.voteBands.data.bandExists(this.props.band.name)) {
      let realId = store.voteBands.data.getRealID(this.props.band.id)
      return {band: store.voteBands.data.get(realId).toJSON()}
    } else {
      return {band: this.props.band}
    }
  },
  componentDidMount: function() {
    if (store.voteBands.data.bandExists(this.props.band.name)) {
      console.log('componentDidMount found band');
      let realId = store.voteBands.data.getRealID(this.props.band.id)
      let band = store.voteBands.data.get(realId)
      band.on('change', this.updateVotes)
    } else {
      store.voteBands.data.on('update', this.updateVotes)
    }
  },
  updateVotes: function() {
    console.log('updateVotes');
    if (store.voteBands.data.bandExists(this.props.band.name)) {
      let realId = store.voteBands.data.getRealID(this.props.band.id)
      this.setState({band: store.voteBands.data.get(realId).toJSON()})
    }
  },
  voteForAlbum: function() {
    console.log('VOTING');
    store.voteBands.data.fetch({
      success: (response) => {
        if(!store.voteBands.data.bandExists(this.state.band.name)) {
          let newBand = this.state.band
          newBand.votes = 1
          store.voteBands.data.create(newBand, {
            success: function(response) {
              console.log('ADDED ALBUM: ', response);
            }
          })
        } else {
          store.session.addVoteFor(this.props.band.id)
        }
      },
      error: function(response) {
        console.log('ERROR FETCHING voteBands: ', response);
      }
    }, {wait: true})
  },
  removeVoteFromAlbum: function() {
    console.log('REMOVE VOTE');
  },
  render: function() {
    if (!this.state.band) {
      return null
    }

    let urlStyle = {
      'backgroundImage': `url("${this.state.band.imgURL}")`
    }
    return (
      <li className="band-item">
        <div className="cover" style={urlStyle}></div>
        <div className="bottom-section">
          <h3 className="band-name">{this.state.band.name}</h3>
          <VoteButton votes={this.state.band.votes} voteForAlbum={this.voteForAlbum} removeVoteFromAlbum={this.removeVoteFromAlbum} id={this.state.band.id}/>
        </div>
      </li>
    )
  }
})

export default BandItem
