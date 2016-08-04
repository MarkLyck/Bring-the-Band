import React from 'react'

import store from '../store'
import BandItem from './BandItem'

const SearchPage = React.createClass({
  getInitialState: function() {
    return {bands: store.searchBands.data.toJSON()}
  },
  componentDidMount: function() {
    store.searchBands.data.on('update', this.updateList)

    let searchTerm = this.props.params.searchTerm
    store.searchBands.data.searchFor(searchTerm)

    store.voteBands.data.fetch({success: store.voteBands.data.getModelVotes.bind(store.voteBands.data)})
  },
  updateList: function() {
    this.setState({bands: store.searchBands.data.toJSON()})
  },
  loadMore: function() {
    console.log('loadMore func');
    let searchTerm = this.props.params.searchTerm
    store.searchBands.data.loadMore(searchTerm)
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
      loadMoreBtn = (<button id="lore-more-btn" onClick={this.loadMore}>Load more bands</button>)
    }
    return (
      <div>
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
