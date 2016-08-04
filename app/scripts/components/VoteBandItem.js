import $ from 'jquery'
import React from 'react'

import VoteButton from './VoteButton'
import store from '../store'

const BandItem = React.createClass({
  getInitialState: function() {
    return {band: this.props.band}
  },
  componentDidMount: function() {
    let band = store.voteBands.data.get(this.props.band._id)
    band.on('change', this.updateVotes)
    store.session.on('change', this.updateVotes)
  },
  updateVotes: function() {
    this.setState({band: store.voteBands.data.get(this.state.band._id).toJSON()})
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

    if (store.session.get('votedFor').indexOf(this.state.band._id) === -1) {
      return (
        <li className="band-item" onClick={this.voteForBand}>
          <i className="up-vote fa fa-thumbs-up" aria-hidden="true"></i>
          <div className="cover" style={urlStyle}>
          </div>
          <div className="bottom-section">
            <h3 className="band-name">{this.state.band.name}</h3>
            <h3 className="votes">{this.state.band.votes} <i className="fa fa-thumbs-up" aria-hidden="true"></i></h3>
          </div>
        </li>
      )
    } else {
      return (
        <li className="voted-for band-item">
          <i className="up-vote fa fa-thumbs-up" aria-hidden="true"></i>
          <div className="cover" style={urlStyle}>
          </div>
          <div className="bottom-section">
            <h3 className="band-name">{this.state.band.name}</h3>
            <h3 className="votes">{this.state.band.votes} <i className="fa fa-thumbs-up" aria-hidden="true"></i></h3>
          </div>
        </li>
      )
    }
  },
  componentWillUnmount: function() {
    let band = store.voteBands.data.get(this.props.band._id)
    band.on('change', this.updateVotes)
    store.session.off('change', this.updateVotes)
  }
})

export default BandItem
