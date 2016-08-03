import React from 'react'

import store from '../store'

const SearchPage = React.createClass({
  getInitialState: function() {
    return {bands: store.bands.toJSON()}
  },
  componentDidMount: function() {
    // store.bands.on('update', this.updateList)
    // store.bands.fetch()
  },
  updateList: function() {
    this.setState({bands: store.bands.toJSON()})
  },
  render: function() {
    if (this.props.params.searchTerm) {
      let searchTerm = this.props.params.searchTerm
      store.searchBands.searchFor(searchTerm)
    }
    return (
      <div>
        <ul id="band-list">

        </ul>
      </div>
    )
  },
  componentWillUnmount: function() {
    store.bands.off('update', this.updateList)
  }
})

export default SearchPage
