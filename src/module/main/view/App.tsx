import './App.css';
import liff from '@line/liff';
import { useEffect, useState } from 'react';
import AppViewModel from '../viewmodel/AppViewModel';
import User from '../../authentication/User';
import { Container, Row, Image } from 'react-bootstrap';
import LoginPage from '../../authentication/view/LoginPage';
import LineProfilePage from '../../authentication/view/LineProfilePage';

function App() {

  enum AppState {
    LOGIN = 'login', PROFILE = 'profile', HOME = 'home'
  }

  const [appState, setState] = useState(AppState.LOGIN)

  const viewModel = new AppViewModel()

  useEffect(() => {
    initial()
  });

  const logout = () => {
    window.sessionStorage.removeItem('user')
    window.location.reload()
  }

  const checkUser = () => {
    let user = User.getUser()

    if (user) {
      setState(AppState.HOME)
    } else {
      setState(AppState.LOGIN)
    }
  }

  const initial = () => {
    liff.init({ liffId: '1656661903-7gDz0NJL' }, () => {
      if (liff.isLoggedIn()) {
        getLineAccountData()
      } else {
        checkUser();
      }
    }, err => console.error(err));
  }

  const getLineAccountData = () => {
    const idToken = liff.getIDToken();
    liff.getProfile().then(profile => {

      console.log(profile);

      viewModel.request.channel = 'LINE'
      viewModel.request.userID = profile.userId
      viewModel.request.name = profile.displayName
      viewModel.request.picture = profile.pictureUrl

      setState(AppState.PROFILE)
    }).catch(err => console.error(err));
  }

  const requestLogin = () => {
    viewModel.login((msg) => {
      liff.logout();
      initial();
    })
  }

  return (
    <Container>

      <Row className="justify-content-center">
        <Image style={{ width: '100px' }} src={'logo.png'} />
      </Row>

      <Container
        className='rounded-border'
        style={{
          height: '100%',
          maxWidth: '600px',
          padding: '24px',
          backgroundColor: '#F2EFEA'
        }}>

        <Row className="justify-content-center">
          <Image style={{ width: '80%', maxWidth: '360px' }} src={'event-logo.svg'} />
        </Row>

        <Container
          className='rounded-border'
          style={{
            height: '100%',
            maxWidth: '460px',
            paddingTop: '36px',
            paddingBottom: '36px',
            paddingLeft: '12px',
            paddingRight: '12px',
            backgroundColor: '#FFFFFF'
          }}>

          {

            appState === AppState.LOGIN ? <LoginPage lineCallback={() => {
              liff.login()
            }} /> :
              appState === AppState.PROFILE ? <LineProfilePage data={viewModel.request} loginCallback={() => {
                requestLogin()
              }} logoutCallback={() => {
                setState(AppState.LOGIN)
              }} /> :
                appState === AppState.HOME ? <>HOME</> :
                  <>{appState}</>

          }

        </Container>
      </Container>

    </Container>
  );
  // return (
  //   <div className="App">

  //     <div style={{ textAlign: "center" }}>

  //       <button onClick={() => { liff.login() }} >Line Login</button>
  //       <button onClick={() => logout()} style={{ width: "100%", height: 30 }}>Logout</button>

  //     </div>

  //   </div>
  // );
}

export default App;
