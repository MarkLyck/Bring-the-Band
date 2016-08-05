import $ from 'jquery'
import React from 'react'
import store from '../store'
import Modal from './Modal'

const BandItem = React.createClass({
  getInitialState: function() {
    return {band: this.props.band, votes: 0, showBand: false, albumURI: ''}
  },
  componentDidMount: function() {
    if (this.state.band.id) {
      store.voteBands.data.on('update', this.updateVotes)
    } else {
      let band = store.voteBands.data.get(this.props.band._id)
      band.on('change', this.updateVotes)
    }
    store.session.on('change', this.updateVotes)
  },
  updateVotes: function() {
    console.log('updating vote');
    if (store.voteBands.data.getRealID(this.props.band.id)) {
      let realId = store.voteBands.data.getRealID(this.props.band.id)
      this.setState({
        band: store.voteBands.data.get(realId).toJSON(),
        votes: store.voteBands.data.get(realId).toJSON().votes
      })
    } else if (this.props.band.bandId) {
      this.setState({
        band: store.voteBands.data.get(this.state.band._id).toJSON(),
        votes: store.voteBands.data.get(this.state.band._id).toJSON().votes
      })
    }
  },
  voteForBand: function() {
    if (store.session.get('username') === 'anom') {
      return null
    }

    this.setState({votes: (this.state.votes + 1)})

    if(!store.voteBands.data.bandExists(this.state.band.name)) {
      store.voteBands.data.createBand(this.state.band, store.session)
    } else {
      let band = store.voteBands.data.get(this.state.band._id)
      band.voteForBand()
    }
  },
  removeVoteFromBand: function() {
    this.setState({votes: (this.state.votes - 1)})
    let band = store.voteBands.data.get(this.state.band._id)
    band.removeVote()
  },
  showBand: function() {
    // let band = store.voteBands.data.get(this.state.band._id)
    console.log(this.state.band);
    if (this.state.band.bandId) {
      store.albums.getAlbumsFor(this.state.band.bandId)
    } else {
      store.albums.getAlbumsFor(this.state.band.id).then((albumURI) => {
        console.log('PROMISE WORKED');
        this.setState({showBand: true, albumURI: albumURI})
      })
      .fail(() => {
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
          <div className="left">
            <div className="detail-cover" style={urlStyle}></div>
            <div className="wrapper">
              <h3 className="band-name">{this.state.band.name}</h3>
              <h3 className="votes">{this.state.votes} <i className="fa fa-thumbs-up" aria-hidden="true"></i></h3>
            </div>
            <iframe src={`https://embed.spotify.com/follow/1/?uri=${this.state.band.uri}&size=basic&theme=light`} width="200" height="25" scrolling="no" frameBorder="0" style={{border:'none', overflow:'hidden'}} allowTransparency="true"></iframe>
          </div>
          <div className="right">
            <iframe src={`https://embed.spotify.com/?uri=${this.state.albumURI}`} width="100%" height="380" frameBorder="0" allowTransparency="true"></iframe>
          </div>
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
    if (store.voteBands.data.get(this.props.band._id)) {
      let band = store.voteBands.data.get(this.props.band._id)
      band.off('change', this.updateVotes)
    }
    store.voteBands.data.off('update', this.updateVotes)
    store.session.off('update', this.updateVotes)
  }
})

export default BandItem
