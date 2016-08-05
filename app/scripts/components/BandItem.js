import $ from 'jquery'
import React from 'react'

import VoteButton from './VoteButton'
import store from '../store'

//e

const BandItem = React.createClass({
  getInitialState: function() {
    return {band: this.props.band}
  },
  componentDidMount: function() {

    if (this.state.band.id) {
      store.voteBands.data.on('update', this.updateVotes)
    }

    if (this.state.band.bandId) {
      let band = store.voteBands.data.get(this.props.band._id)
      band.on('change', this.updateVotes)
    }

    store.session.on('change', this.updateVotes)
  },
  updateVotes: function() {
    console.log('updating vote');
    if (store.voteBands.data.getRealID(this.props.band.id)) {
      let realId = store.voteBands.data.getRealID(this.props.band.id)
      this.setState({band: store.voteBands.data.get(realId).toJSON()})
    }
    if (this.props.band.bandId) {
      this.setState({band: store.voteBands.data.get(this.state.band._id).toJSON()})
    }
  },
  voteForBand: function() {
    store.voteBands.data.fetch({
      success: (response) => {
        if(!store.voteBands.data.bandExists(this.state.band.name)) {
          store.voteBands.data.createBand(this.state.band, store.session)
        } else {
          let band = store.voteBands.data.get(this.state.band._id)
          band.voteForBand()
        }
      },
      error: function(response) {
        console.error('Fetching voteBands: ', response);
      }
    }, {wait: true})
  },
  removeVoteFromBand: function() {
    let band = store.voteBands.data.get(this.state.band._id)
    band.removeVote()
  },
  render: function() {
    if (!this.state.band) {
      return null
    }
    let urlStyle = {
      'backgroundImage': `url("${this.state.band.imgURL}")`
    }

    let itemClasses;
    let clickHandler;
    if (store.session.get('votedFor').indexOf(this.state.band._id) === -1) {
      itemClasses = "band-item"
      clickHandler = this.voteForBand
    } else {
      itemClasses = "voted-for band-item"
      clickHandler = this.removeVoteFromBand
    }

    return (
      <li className={itemClasses}>
        <div onClick={clickHandler} className="cover" style={urlStyle}></div>
        <div className="bottom-section">
          <h3 className="band-name">{this.state.band.name}</h3>
          <h3 className="votes">{this.state.band.votes} <i className="fa fa-thumbs-up" aria-hidden="true"></i></h3>
        </div>
      </li>
    )
  },
  componentWillUnmount: function() {
    if (store.voteBands.data.get(this.props.band._id)) {
      let band = store.voteBands.data.get(this.props.band._id)
      band.off('change', this.updateVotes)
    }
    store.voteBands.data.off('update', this.updateVotes)
    store.session.off('update', this.updateVotes)
  }
})

export default BandItem
