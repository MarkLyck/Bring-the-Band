import React from 'react'

const BandItem = React.createClass({
  render: function() {
    if (!this.props.band) {
      return null
    }
    let urlStyle = {
      'backgroundImage': `url("${this.props.band.imgURL}")`
    }
    return (
      <li className="band-item">
        <div className="cover" style={urlStyle}></div>
        <div className="bottom-section">
          <h3 className="band-name">{this.props.band.name}</h3>
          <button className="vote-btn">{this.props.band.votes} Vote</button>
        </div>
      </li>
    )
  }
})

export default BandItem
