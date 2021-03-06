import React from 'react'
import store from '../store'
import BandItem from './BandItem'

const SearchPage = React.createClass({
  getInitialState: function() {
    return {bands: store.searchBands.data.toJSON(), loadingMore: store.searchBands.loadingMore}
  },
  componentWillMount: function() {
    store.searchBands.fetching = true
  },
  componentDidMount: function() {
    store.searchBands.data.on('update', this.updateList)

    let searchTerm = this.props.params.searchTerm
    store.searchBands.data.searchFor(searchTerm, store)

    store.voteBands.foundVotes = 0
    store.voteBands.data.fetch({success: store.voteBands.data.getModelVotes.bind(store.voteBands.data, store)})
  },
  updateList: function() {
    this.setState({bands: store.searchBands.data.toJSON(), loadingMore: store.searchBands.loadingMore})
  },
  loadMore: function() {
    console.log('loadMore func');
    store.searchBands.loadingMore = true
    this.setState({loadingMore: store.searchBands.loadingMore})
    let searchTerm = this.props.params.searchTerm
    store.searchBands.data.loadMore(searchTerm, store)
  },
  render: function() {
    let bandList;
    if (this.state.bands[0]) {
      bandList = this.state.bands.map((band, i) => {
        return <BandItem band={band} key={band.id}/>
      })
    }

    let loadMoreBtn;

    if (store.searchBands.total > (store.searchBands.offset + 20)) {
      if (this.state.loadingMore) {
        loadMoreBtn = (<button id="lore-more-btn" onClick={this.loadMore}><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i></button>)
      } else {
        loadMoreBtn = (<button id="lore-more-btn" onClick={this.loadMore}>Load more bands</button>)
      }


    }

    let fetching;
    if (store.searchBands.fetching) {
      fetching = <div className="loading"></div>
    }

    return (
      <div className="bands-page-container">
        {fetching}
        <ul className="band-list">
          {bandList}
        </ul>
        {loadMoreBtn}
      </div>
    )
  },
  componentWillUnmount: function() {
    store.searchBands.data.off('update', this.updateList)
  }
})

export default SearchPage
