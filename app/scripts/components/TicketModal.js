import React from 'react'



const TicketModal = React.createClass({
  componentDidMount: function() {
    this.refs.quantity.value = 1
  },
  render: function() {
    return (
      <div>
        <h3>Buy tickets</h3>
        <div className="wrapper">
          <h3>Quantity</h3>
          <input type="text" ref="quantity"/>
        </div>
      </div>
    )
  }
})

export default TicketModal
