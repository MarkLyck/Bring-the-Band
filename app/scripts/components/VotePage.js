import React from 'react'
import _ from 'underscore'
import store from '../store'
import BandItem from './BandItem'

const VotePage = React.createClass({
  getInitialState: function() {
    return {bands: store.voteBands.data.toJSON(), fetching: store.voteBands.fetching}
  },
  componentDidMount: function() {
    store.voteBands.foundVotes = 0
    store.voteBands.data.on('update', this.updateList)
    if (store.voteBands.data.models.length === 0) {
      store.voteBands.fetching = true
      this.setState({fetching: store.voteBands.fetching})
      store.voteBands.data.fetch({
        success: () => {
          store.voteBands.data.getModelVotes()
        }
      })
    } else {
      store.voteBands.fetching = false
    }
  },
  updateList: function() {
    this.setState({bands: store.voteBands.data.toJSON(), fetching: store.voteBands.fetching})
  },
  componentWillUnmount: function() {
    store.voteBands.data.off('update', this.updateList)
  },
  render: function() {
    let topBands;

    let fetching;
    if (store.voteBands.fetching) {
      fetching = <div className="loading"></div>
    }

    if (this.state.bands[0]) {
      if (store.voteBands.foundVotes !== store.voteBands.data.models.length) {
        console.log(this.state);
        return (
          <div className="bands-page-container">
            {fetching}
          </div>
        )
      }

      let sortedBands = _.sortBy(this.state.bands, band => band.votes)
      if (sortedBands[0].votes === 0) {
        sortedBands = sortedBands.reverse()
      }

      topBands = sortedBands.map((band, i) => {
        return <BandItem band={band} key={band._id} />
      })
    }
    return (
      <div className="bands-page-container">
        {fetching}
        <ul className="band-list">
          {topBands}
        </ul>
      </div>
    )
  }
})

export default VotePage
