import $ from 'jquery'
import React from 'react'

import VoteButton from './VoteButton'
import store from '../store'

const BandItem = React.createClass({
  getInitialState: function() {
    return {band: this.props.band, votes: 0}
  },
  componentDidMount: function() {
    if (store.voteBands.data.getRealID(this.props.band.id)) {
      let realId = store.voteBands.data.getRealID(this.props.band.id)
      this.updateVotes()
    }
    store.voteBands.data.on('update', this.updateVotes)
  },
  updateVotes: function() {
    if (store.voteBands.data.getRealID(this.props.band.id)) {
      let realId = store.voteBands.data.getRealID(this.props.band.id)
      this.setState({band: store.voteBands.data.get(realId).toJSON()})
      $.ajax(`https://baas.kinvey.com/appdata/${store.settings.appKey}/votes?query={"bandId":"${this.state.band._id}"}`)
        .then((response) => {
          this.setState({votes: response.length})
        })
    }
  },
  voteForBand: function() {
    console.log('vote for band button');
    store.voteBands.data.fetch({
      success: (response) => {
        if(!store.voteBands.data.bandExists(this.state.band.name)) {
          store.voteBands.data.createBand(this.state.band)
        } else {
          let bandToVoteFor = store.voteBands.data.get(this.state.band._id)
          bandToVoteFor.voteForBand(this.state.band)
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
          <VoteButton votes={this.state.votes} voteForBand={this.voteForBand} id={this.state.band._id}/>
        </div>
      </li>
    )
  },
  componentWillUnmount: function() {
    store.voteBands.data.off('update', this.updateVotes)
  }
})

export default BandItem
