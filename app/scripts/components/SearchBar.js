import React from 'react'
import {hashHistory} from 'react-router'

const SearchBar = React.createClass({
  searchFor: function(e) {
    e.preventDefault()
    console.log('search for: ', this.refs.searchBar.value);
    hashHistory.push('/search/' + this.refs.searchBar.value);
  },
  render: function() {
    return (
      <form onSubmit={this.searchFor}>
        <input type="text" ref="searchBar"/>
        <input type="submit"/>
      </form>
    )
  }
})

export default SearchBar
