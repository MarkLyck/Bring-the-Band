import $ from 'jquery'
import React from 'react'

import VoteButton from './VoteButton'
import store from '../store'

const BandItem = React.createClass({
  getInitialState: function() {
    return {band: this.props.band}
  },
  componentDidMount: function() {
    if (store.voteBands.data.getRealID(this.props.band.id)) {
      let realId = store.voteBands.data.getRealID(this.props.band.id)
      this.updateVotes()
    }
    store.voteBands.data.on('update', this.updateVotes)
    store.session.on('change', this.updateVotes)
  },
  updateVotes: function() {
    if (store.voteBands.data.getRealID(this.props.band.id)) {
      let realId = store.voteBands.data.getRealID(this.props.band.id)
      this.setState({band: store.voteBands.data.get(realId).toJSON()})
    }
  },
  voteForBand: function() {
    store.voteBands.data.fetch({
      success: (response) => {
        console.log('VOTING FOR NEW BAND');
        if(!store.voteBands.data.bandExists(this.state.band.name)) {
          store.voteBands.data.createBand(this.state.band, store.session)
        } else {
          console.log('VOTING FOR EXISTING BAND');
          let bandToVoteFor = store.voteBands.data.get(this.state.band._id)
          bandToVoteFor.voteForBand(this.state.band)
        }
      },
      error: function(response) {
        console.error('Fetching voteBands: ', response);
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

    let content = (
      <div>
        <i className="up-vote fa fa-thumbs-up" aria-hidden="true"></i>
        <div className="cover" style={urlStyle}>
        </div>
        <div className="bottom-section">
          <h3 className="band-name">{this.state.band.name}</h3>
          <h3 className="votes">{this.state.band.votes} <i className="fa fa-thumbs-up" aria-hidden="true"></i></h3>
        </div>
      </div>
    )

    if (store.session.get('votedFor').indexOf(this.state.band._id) === -1) {
      return (
        <li className="band-item" onClick={this.voteForBand}>
          {content}
        </li>
      )
    } else {
      return (
        <li className="voted-for band-item">
          {content}
        </li>
      )
    }
  },
  componentWillUnmount: function() {
    store.voteBands.data.off('update', this.updateVotes)
    store.session.off('update', this.updateVotes)
  }
})

export default BandItem
