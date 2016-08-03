import React from 'react'

import store from '../store'
import BandItem from './BandItem'

const SearchPage = React.createClass({
  getInitialState: function() {
    return {bands: store.bands.toJSON()}
  },
  componentDidMount: function() {
    store.searchBands.on('update', this.updateList)
    if (this.props.params.searchTerm) {
      let searchTerm = this.props.params.searchTerm
      store.searchBands.searchFor(searchTerm)
    }
  },
  updateList: function() {
    this.setState({bands: store.searchBands.toJSON()})
  },
  render: function() {
    console.log(this.state.bands);
    let bandList;
    if (this.state.bands[0]) {
      bandList = this.state.bands.map((band, i) => {
        return <BandItem band={band} key={i}/>
      })
    }
    return (
      <div>
        <ul id="band-list">
          {bandList}
        </ul>
      </div>
    )
  },
  componentWillUnmount: function() {
    store.bands.off('update', this.updateList)
  }
})

export default SearchPage
