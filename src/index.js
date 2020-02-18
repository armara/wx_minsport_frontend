import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { setupInterceptor } from 'utils/auth'
import history from 'utils/utils'

import 'styles/custom-bulma.scss'
import 'styles/index.scss'
import 'react-table/react-table.css'

import App from 'pages/App'

import * as serviceWorker from 'serviceWorker'
import store from 'store/store'

setupInterceptor()

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
