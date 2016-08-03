import $ from 'jquery'
import React from 'react'

import VoteButton from './VoteButton'
import store from '../store'

const BandItem = React.createClass({
  getInitialState: function() {
    if (store.voteBands.data.getRealID(this.props.band.id)) {
      let realId = store.voteBands.data.getRealID(this.props.band.id)
      return {band: store.voteBands.data.get(realId).toJSON(), votes: 0}
    } else {
      return {band: this.props.band, votes: 0}
    }
  },
  componentDidMount: function() {
      store.voteBands.data.on('updateBand', this.updateVotes)
      $.ajax(`https://baas.kinvey.com/appdata/kid_HyAproyt/votes?query={"bandId":"${this.state.band._id}"}`)
        .then((response) => {
          console.log('votes query response:', response);
          this.setState({votes: response.length})
        })
  },
  updateVotes: function() {
    if (store.voteBands.data.getRealID(this.props.band.id)) {
      let realId = store.voteBands.data.getRealID(this.props.band.id)
      this.setState({band: store.voteBands.data.get(realId).toJSON()})
    }

  },
  voteForAlbum: function() {
    store.voteBands.data.fetch({
      success: (response) => {
        if(!store.voteBands.data.bandExists(this.state.band.name)) {
          store.voteBands.data.createBand(this.state.band)
        } else {
          store.session.addVoteFor(this.props.band.id)
        }
      },
      error: function(response) {
        console.log('ERROR FETCHING voteBands: ', response);
      }
    }, {wait: true})
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
          <VoteButton votes={this.state.votes} voteForAlbum={this.voteForAlbum} removeVoteFromAlbum={this.removeVoteFromAlbum} id={this.state.band.id}/>
        </div>
      </li>
    )
  }
})

export default BandItem
