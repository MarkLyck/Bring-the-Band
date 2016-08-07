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
    store.searchBands.data.searchFor(searchTerm, store)
  },
  render: function() {
    return (
      <form id="search-form" onSubmit={this.searchFor}>
        <input id="search-bar" type="text" placeholder="Search for bands..." ref="searchBar"/>
        <input id="search-btn" type="submit" value="&#xf002;"/>
      </form>
    )
  }
})

export default SearchBar
