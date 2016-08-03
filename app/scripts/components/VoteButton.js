import React from 'react'

import store from '../store'

const VoteButton = React.createClass({
  render: function() {
    let vote = 'vote'
    if (this.props.votes !== 1) {vote += 's'}

    if (store.session.get('votedFor').indexOf(this.props.id) === -1) {
      return (<button onClick={this.props.voteForAlbum} className="vote-button">{this.props.votes} {vote}</button>)
    } else {
      return (<button onClick={this.props.removeVoteFromAlbum} className="remove vote-button">{this.props.votes} {vote}</button>)
    }
  }
})

export default VoteButton
