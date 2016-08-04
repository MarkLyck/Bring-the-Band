import React from 'react'

import store from '../store'
import VoteBandItem from './VoteBandItem'

const VotePage = React.createClass({
  getInitialState: function() {
    return {bands: store.voteBands.data.toJSON()}
  },
  componentDidMount: function() {
    store.voteBands.data.on('update', this.updateList)
    store.voteBands.data.fetch()
  },
  updateList: function() {
    this.setState({bands: store.voteBands.data.toJSON()})
  },
  componentWillUnmount: function() {
    store.voteBands.data.off('update', this.updateList)
  },
  render: function() {
    // console.log(this.state.bands);
    if (!this.state.bands[0]) {
      return null
    }

    let topBands = this.state.bands.map((band, i) => {
      return <VoteBandItem band={band} key={i} />
    })

    return (
      <div>
        <ul className="band-list">
          {topBands}
        </ul>
      </div>
    )
  }
})

export default VotePage
