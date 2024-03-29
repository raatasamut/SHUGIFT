import ReactDOM from 'react-dom';
import App from './module/main/view/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './index.scss';
import AdminPage from './admin/AdminPage';
import MainPage from './module/main/view/MainPage';
import TermPage from './components/TermPage';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/term" element={<TermPage />} />
      <Route path="*" element={<MainPage />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
