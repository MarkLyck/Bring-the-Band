import $ from 'jquery'
import _ from 'underscore'

let cc = {
  ccFormat: function(input) {
    let v = input.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    let matches = v.match(/\d{4,16}/g);
    let match = matches && matches[0] || ''
    let parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  },
  dateFormat: function(e, input) {
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
      if (v.length === 4) {
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
    return v
  },
  cvcFormat: function(input) {
    let v = input.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length > 3) {
      let parts = v.split('')
      parts.splice(2, 1)
      v = parts.join('')
    }
    return v
  },
  makePayment: function(card, quantity) {
    let ccNum = card.number
    let ccMonth = card.month
    let ccYear = card.year
    let ccCVC = card.cvc

    console.log(ccNum);
    console.log(ccMonth);
    console.log(ccYear);
    console.log(ccCVC);

    Stripe.setPublishableKey('pk_test_c3GciGfzJPBBTd8238EwfTta');
    Stripe.card.createToken({
      number: ccNum,
      cvc: ccCVC,
      exp_month: ccMonth,
      exp_year: ccYear
    }, (status, response) => {
      console.log('card status: ', status);
      console.log('token: ', response.id);

      $.ajax({
        type: 'POST',
        url: 'https://api.stripe.com/v1/charges',
        headers: {
          Authorization: 'Bearer sk_test_9JK5hwYFl8C0xMDpueYHNGzy'
        },
        data: {
          amount: (quantity * 30 * 100),
          currency: 'usd',
          source: response.id,
          description: "Charge for madison.garcia@example.com"
        },
        success: (response) => {
          console.log('successful payment: ', response);
        },
        error: (response) => {
          console.log('error payment: ', response);
        }
      })
    });
  }
}

export default cc
