import React from 'react'
import {hashHistory} from 'react-router'

import store from '../store'

const SearchBar = React.createClass({
  searchFor: function(e) {
    e.preventDefault()
    let searchTerm = this.refs.searchBar.value
    console.log('search for: ', searchTerm);
    hashHistory.push('/search/' + searchTerm);
    store.searchBands.data.reset()
    store.searchBands.data.searchFor(searchTerm)
  },
  render: function() {
    return (
      <form onSubmit={this.searchFor}>
        <input type="text" ref="searchBar"/>
        <input type="submit" value="Search"/>
      </form>
    )
  }
})

export default SearchBar
