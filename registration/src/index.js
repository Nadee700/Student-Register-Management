import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import { ToastProvider } from 'react-toast-notifications';

ReactDOM.render(
  <Provider store={configureStore()}>
    <ToastProvider autoDismiss
      autoDismissTimeout={6000}>
      <App />
    </ToastProvider>
  </Provider>,
  document.getElementById('root')
);
