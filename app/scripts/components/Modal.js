import React from 'react'
import $ from 'jquery'
import _ from 'underscore'

const Modal = React.createClass({
  closeModal: function(e) {
    if (_.toArray(e.target.classList).indexOf('modal-container') !== -1) {
      this.props.closeModal(e)
    }
  },
  render: function() {
    let modalClasses = 'modal'
    if (this.props.modalClasses) {
      modalClasses = this.props.modalClasses
    }
    return (
      <div onClick={this.closeModal} className="modal-container" style={this.props.containerStyles}>
        <div onScroll={this.scroll} className={modalClasses} style={this.props.modalStyles} ref="modal">
          {this.props.children}
        </div>
      </div>
    )
  }
})

export default Modal
