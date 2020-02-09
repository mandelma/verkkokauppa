import React from 'react';
import ReactDOM from 'react-dom';
import store from './store'
import { Provider } from 'react-redux'
import App from './App';
import './index.css'
import 'semantic-ui-css/semantic.min.css'

//ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')
)