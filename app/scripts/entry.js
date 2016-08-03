import $ from 'jquery'
import ReactDOM from 'react-dom'

import router from './router'
import store from './store'

$(document).ajaxSend(function(e, xhrAjax, jqueryAjax) {
  if (localStorage.authtoken) {
    xhrAjax.setRequestHeader('Authorization', `Kinvey ${localStorage.authtoken}`)
  } else {
    xhrAjax.setRequestHeader('Authorization', `Basic ${store.settings.basicAuth}`)
  }
})

if (localStorage.authtoken) {
  store.session.retrieve()
}

ReactDOM.render(router, document.getElementById('container'))
