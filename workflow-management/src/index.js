import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store'; // Adjust the path as necessary
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
