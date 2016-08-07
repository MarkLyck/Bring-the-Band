import React from 'react'
import _ from 'underscore'



const TicketModal = React.createClass({
  getInitialState: function() {
    return {quantity: 1}
  },
  componentDidMount: function() {
    this.refs.quantity.value = 1
  },
  setQuantity: function() {
    if (!isNaN(this.refs.quantity.value)) {
      this.setState({quantity: this.refs.quantity.value})
    } else {
      console.log('NAN');
    }
  },
  ccFormat: function() {
    let input = this.refs.cardNumber.value
    let v = input.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    let matches = v.match(/\d{4,16}/g);
    let match = matches && matches[0] || ''
    let parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      this.refs.cardNumber.value = parts.join(' ')
    } else {
      this.refs.cardNumber.value = value
    }
  },
  dateFormat: function(e) {
    let input = this.refs.cardExpiry.value
    let v = input
    if (e.which !== 8) {
      v = input.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
      if (v.length === 1 && v > 1) {
        v = '0' + v
      }
      if (v.length === 2) {
        if (v > 12) {
          let parts = v.split('')
          parts.splice(1, 1)
          v = parts.join('')
        } else {
          v = v + ' / '
        }
      } else if (v.length > 2) {
        let parts = v.split('')
        parts.splice(2, 0, ' / ')
        v = parts.join('')
      }
      if (v.length > 7) {
        let parts = v.split('')
        parts.splice(6, 1)
        v = parts.join('')
      }
    } else {
      v = input
      console.log(v);
      console.log(v.length);
      if (v.length === 4) {
        console.log('DELETE EXTRA');
        let parts = v.split('')
        parts = _.without(parts, '/')
        parts = _.without(parts, ' ')
        parts.splice(1, 1)
        v = parts.join('')
      }

      if (v.length > 2) {
        let parts = v.split('')
        parts = _.without(parts, '/')
        parts = _.without(parts, ' ')
        parts.splice(2, 0, ' / ')
        v = parts.join('')
      }
    }
    this.refs.cardExpiry.value = v
  },
  cvcFormat: function() {
    let input = this.refs.cardCvc.value
    let v = input.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    console.log(v);
    if (v.length > 3) {
      let parts = v.split('')
      parts.splice(2, 1)
      v = parts.join('')
    }
    this.refs.cardCvc.value = v
  },
  render: function() {
    console.log(this);

    return (
      <div className="get-tickets-container">
        <div className="left">
          <div className="tickets-icon"></div>
          <h3 className="buy-tickets">Tickets - $30.00</h3>
          <div className="wrapper">
            <h4>Quantity</h4>
            <input onKeyUp={this.setQuantity} type="text" ref="quantity"/>
          </div>
        </div>

        <div className="right">

          <form>
            <div className="email input-container">
              <i className="fa fa-envelope-o" aria-hidden="true"></i>
              <input type="email" placeholder="Email" ref="email"/>
            </div>

            <div className="card-number input-container">
              <i className="fa fa-credit-card" aria-hidden="true"></i>
              <input onKeyUp={this.ccFormat} type="text" placeholder="Card number" ref="cardNumber"/>
            </div>
            <div className="wrapper">
              <div className="card-expiry-month input-container">
                <i className="fa fa-calendar-times-o" aria-hidden="true"></i>
                <input onKeyUp={this.dateFormat} type="text" placeholder="MM / YY" ref="cardExpiry"/>
              </div>
              <div className="card-cvc input-container">
                <i className="fa fa-lock" aria-hidden="true"></i>
                <input onKeyUp={this.cvcFormat} type="text" placeholder="CVC" ref="cardCvc"/>
              </div>
            </div>

            <input className="pay-button" type="submit" value={`Pay $${(this.state.quantity * 30).toFixed(2)}`}/>
          </form>



        </div>
      </div>
    )
  }
})

export default TicketModal

// number: $('.card-number').val(),
// cvc: $('.card-cvc').val(),
// exp_month: $('.card-expiry-month').val(),
// exp_year: $('.card-expiry-year').val()
