import React from 'react'

import store from '../store'

const AlbumModal = React.createClass({
  getInitialState: function() {
    return {fetching: true}
  },
  componentDidMount: function() {
    this.refs.albumIframe.onload = () => {
      store.albums.fetching = false
      this.setState({fetching: store.albums.fetching})
    };
  },
  render: function() {
    let iFrame = <iframe id="album-iframe" ref="albumIframe" src={`https://embed.spotify.com/?uri=${this.props.albumURI}`} width="100%" height="400" frameBorder="0" allowTransparency="true"></iframe>
    let followWidget = <iframe src={`https://embed.spotify.com/follow/1/?uri=${this.props.band.uri}&size=basic&theme=light`} width="200" height="25" scrolling="no" frameBorder="0" style={{border:'none', overflow:'hidden'}} allowTransparency="true"></iframe>

    let fetching;
    if (this.state.fetching) {
      const loadingStyles = {
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }
      fetching = <div className="loading" style={loadingStyles}></div>
    }

    return (
      <div className="album-modal">
        <div className="left">
          <div className="detail-cover" style={this.props.urlStyle}></div>
          <div className="wrapper">
            <h3 className="band-name">{this.props.band.name}</h3>
            <h3 className="votes">{this.props.votes} <i className="fa fa-thumbs-up" aria-hidden="true"></i></h3>
          </div>
          {followWidget}
        </div>
        <div className="right">
          {fetching}
          {iFrame}
        </div>
      </div>
    )
  }
})

export default AlbumModal
