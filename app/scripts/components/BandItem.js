import $ from 'jquery'
import React from 'react'
import store from '../store'
import Modal from './Modal'
import AlbumModal from './AlbumModal'

const BandItem = React.createClass({
  getInitialState: function() {
    return {band: this.props.band, votes: this.props.band.votes, showBand: false, albumURI: ''}
  },
  componentDidMount: function() {
    store.voteBands.data.on('update', this.updateVotes)
    if (this.state.band.id) {

    } else if (store.voteBands.data.get(this.state.band._id)) {
      console.log('listening for band');
      let band = store.voteBands.data.get(this.state.band._id)
      band.on('change', this.updateVotes)
    }
    store.session.on('change', this.updateVotes)
  },
  updateVotes: function() {
    console.log('updating vote');

    if (store.voteBands.data.getRealID(this.state.band.id)) {
      let realId = store.voteBands.data.getRealID(this.state.band.id)
      this.setState({
        band: store.voteBands.data.get(realId).toJSON(),
        votes: store.voteBands.data.get(realId).toJSON().votes
      })
    } else if (this.state.band.bandId) {
      this.setState({
        band: store.voteBands.data.get(this.state.band._id).toJSON(),
        votes: store.voteBands.data.get(this.state.band._id).toJSON().votes
      })
    }
  },
  voteForBand: function() {
    console.log(store.session.get('username'));
    console.log(store.session.get('showModal'));
    if (store.session.get('username') === 'anom') {
      store.session.set('showModal', 'signup')
      return null
    }

    this.setState({votes: (this.state.votes + 1)})

    if (this.state.band._id) {
      if(store.voteBands.data.get(this.state.band._id)) {
        let band = store.voteBands.data.get(this.state.band._id)
        band.voteForBand()
      } else {
        store.voteBands.data.createBand(this.state.band, store.session)
      }
    } else {
      if (store.voteBands.data.getRealID(this.props.band.id)) {
        let realId = store.voteBands.data.getRealID(this.props.band.id)
        let band = store.voteBands.data.get(realId)
        band.voteForBand()
      } else {
        store.voteBands.data.createBand(this.state.band, store.session)
      }
    }

  },
  removeVoteFromBand: function() {
    this.setState({votes: (this.state.votes - 1)})
    let band = store.voteBands.data.get(this.state.band._id)
    band.removeVote()
  },
  showBand: function() {
    if (this.state.band.bandId) {
      store.albums.data.getAlbumsFor(this.state.band.bandId)
      .then((albumURI) => {
        this.setState({showBand: true, albumURI: albumURI})
      })
      .catch(() => {
        console.log('FAILED TO GET ALBUM');
      })
    } else {
      store.albums.data.getAlbumsFor(this.state.band.id).then((albumURI) => {
        this.setState({showBand: true, albumURI: albumURI})
      })
      .catch(() => {
        console.log('FAILED TO GET ALBUM');
      })
    }
    this.setState({showBand: true})
  },
  closeModal: function(e) {
    console.log('close modal');
    this.setState({showBand: false})
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
    } else if (this.state.voted || store.session.get('votedFor').indexOf(this.state.band._id) !== -1) {
      itemClasses = "voted-for band-item"
      clickHandler = this.removeVoteFromBand
    }

    let modal;
    if (this.state.showBand) {
      modal = (
        <Modal closeModal={this.closeModal}>
          <AlbumModal band={this.state.band} votes={this.state.votes} albumURI={this.state.albumURI} urlStyle={urlStyle}/>
        </Modal>
      )
    }

    return (
      <li className={itemClasses}>
        <div onClick={clickHandler} className="cover" style={urlStyle}></div>
        <div onClick={this.showBand} className="bottom-section">
          <h3 className="band-name">{this.state.band.name}</h3>
          <h3 className="votes">{this.state.votes} <i className="fa fa-thumbs-up" aria-hidden="true"></i></h3>
        </div>
        {modal}
      </li>
    )
  },
  componentWillUnmount: function() {
    let band = store.voteBands.data.get(this.props.band._id)
    if (band) {
      band.off('change', this.updateVotes)
    }
    store.voteBands.data.off('update', this.updateVotes)
    store.session.off('update', this.updateVotes)
  }
})

export default BandItem
