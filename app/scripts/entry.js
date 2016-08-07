import $ from 'jquery'
import ReactDOM from 'react-dom'
import router from './router'
import store from './store'

$(document).ajaxSend(function(e, xhrAjax, jqueryAjax) {
  if (jqueryAjax.url.indexOf('kinvey') !== -1) {
    if (store.session.get('authtoken')) {
      xhrAjax.setRequestHeader('Authorization', `Kinvey ${store.session.get('authtoken')}`)
    } else {
      xhrAjax.setRequestHeader('Authorization', `Basic ${store.settings.basicAuth}`)
    }
  }
})

if (localStorage.authtoken) {
  store.session.set('authtoken', localStorage.authtoken)
  store.session.retrieve()
} else {
  store.session.set('authtoken', store.anom.authtoken)
  store.session.set('username', store.anom.username)
}

Stripe.setPublishableKey('pk_test_c3GciGfzJPBBTd8238EwfTta');

ReactDOM.render(router, document.getElementById('container'))
