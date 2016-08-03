import React from 'react'

import store from '../store'

const VoteButton = React.createClass({
  render: function() {
    let vote = 'vote'
    if (this.props.votes !== 1) {vote += 's'}
    // 
    // console.log(store.session.get('votedFor'));
    if (store.session.get('votedFor').indexOf(this.props.id) === -1) {
      return (<button onClick={this.props.voteForBand} className="vote-button">{this.props.votes} {vote}</button>)
    } else {
      return (<button className="remove vote-button">VOTED</button>)
    }
  }
})

export default VoteButton
