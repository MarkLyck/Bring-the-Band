import React from 'react'
import _ from 'underscore'
import store from '../store'
import BandItem from './BandItem'

const VotePage = React.createClass({
  getInitialState: function() {
    return {bands: store.voteBands.data.toJSON()}
  },
  componentDidMount: function() {
    store.voteBands.data.on('update', this.updateList)
    store.voteBands.data.fetch({success: store.voteBands.data.getModelVotes.bind(store.voteBands.data)})
  },
  updateList: function() {
    this.setState({bands: store.voteBands.data.toJSON()})
  },
  componentWillUnmount: function() {
    store.voteBands.data.off('update', this.updateList)
  },
  render: function() {
    if (!this.state.bands[0]) {
      return null
    }

    let sortedBands = _.sortBy(this.state.bands, band => band.votes)
    if (sortedBands[0].votes === 0) {
      sortedBands = sortedBands.reverse()
    }

    let topBands = sortedBands.map((band, i) => {
      return <BandItem band={band} key={band._id} />
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
