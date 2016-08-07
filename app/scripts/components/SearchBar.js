import React from 'react'
import {hashHistory} from 'react-router'

import store from '../store'

const SearchBar = React.createClass({
  getInitialState: function() {
    return {searchClass: 'search-form'}
  },
  searchFor: function(e) {
    e.preventDefault()
    let searchTerm = this.refs.searchBar.value
    if (searchTerm.trim() !== '') {
      hashHistory.push('/search/' + searchTerm);
      store.searchBands.data.reset()
      store.searchBands.data.searchFor(searchTerm, store)
    } else {
      console.log('SHAKE');
      this.setState({searchClass: 'search-form shake'})
      window.setTimeout(() => {
        this.setState({searchClass: 'search-form'})
      }, 300)
    }
  },
  render: function() {
    return (
      <form className={this.state.searchClass} onSubmit={this.searchFor}>
        <input id="search-bar" type="text" placeholder="Search for bands..." ref="searchBar"/>
        <input id="search-btn" type="submit" value="&#xf002;"/>
      </form>
    )
  }
})

export default SearchBar
