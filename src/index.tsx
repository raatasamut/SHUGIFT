import React from 'react';
import ReactDOM from 'react-dom';
import App from './module/main/view/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <footer style={{ fontSize: '12px', color: '#6C6C6C', textAlign: 'center', padding: '8px' }}>Copyright @ SHU Global 2020. All Right Reserved.</footer>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
