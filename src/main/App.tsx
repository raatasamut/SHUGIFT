import logo from '.././logo.svg';
import './App.css';
import liff from '@line/liff';
import { useEffect, useState } from 'react';
import AppViewModel from './viewmodel/AppViewModel';
import User from '../authentication/User';
import { Console } from 'console';

function App() {

  const viewModel = new AppViewModel()

  const logout = () => {
    window.sessionStorage.removeItem('user')
    window.location.reload()
  }

  const checkUser = () => {
    console.log('checkUser')
    console.log(User.getUser())
    console.log('checkUser done')
  }

  const initial = () => {
    liff.init({ liffId: '1656661903-7gDz0NJL' }, () => {
      if (liff.isLoggedIn()) {
        requestLogin();
      } else {
        checkUser();
      }
    }, err => console.error(err));
  }

  useEffect(() => {
    initial()
  });

  const requestLogin = () => {
    const idToken = liff.getIDToken();
    liff.getProfile().then(profile => {

      console.log(profile);

      viewModel.request.channel = 'LINE'
      viewModel.request.userID = profile.userId
      viewModel.request.name = profile.displayName
      viewModel.request.picture = profile.pictureUrl

      viewModel.login((msg) => {
        liff.logout();
        window.location.reload();
      })
    }).catch(err => console.error(err));
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ textAlign: "center" }}>
          <button onClick={() => { liff.login() }} >Line Login</button>
          <hr />
          <button onClick={() => logout()} style={{ width: "100%", height: 30 }}>Logout</button>
        </div>
      </header>
    </div>
  );
}

export default App;
