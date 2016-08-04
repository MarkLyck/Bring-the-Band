import $ from 'jquery'
import React from 'react'

import VoteButton from './VoteButton'
import store from '../store'

const BandItem = React.createClass({
  getInitialState: function() {
    let band = store.voteBands.data.get(this.props.band._id).toJSON()
    return {band: band}
  },
  componentDidMount: function() {
    // this.updateVotes()
    let band = store.voteBands.data.get(this.props.band._id)
    band.on('change', this.updateVotes)
  },
  updateVotes: function() {
    this.setState({band: store.voteBands.data.get(this.state.band._id).toJSON()})
    // store.voteBands.data.get(this.state.band._id).getVotes()
  },
  voteForBand: function() {
    console.log('vote for band button');
    let bandToVoteFor = store.voteBands.data.get(this.state.band._id)
    bandToVoteFor.voteForBand(this.state.band)
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
          <VoteButton votes={this.state.band.votes} voteForBand={this.voteForBand} id={this.state.band._id}/>
        </div>
      </li>
    )
  },
  componentWillUnmount: function() {
    // store.voteBands.data.off('update', this.updateVotes)
    let band = store.voteBands.data.get(this.props.band._id)
    band.on('change', this.updateVotes)
  }
})

export default BandItem
