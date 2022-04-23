import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore } from './store';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
const store = createStore();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
