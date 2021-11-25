import './App.css';
import liff from '@line/liff';
import { useEffect, useState } from 'react';
import { Console } from 'console';
import AppViewModel from '../viewmodel/AppViewModel';
import User from '../../authentication/User';
import { Button, Col, Container, Row, Image, Card } from 'react-bootstrap';
import LoginPage from '../../authentication/view/LoginPage';

function App() {

  enum AppState {
    LOGIN, PROFILE, HOME
  }

  const [appState, setState] = useState(Number)

  const viewModel = new AppViewModel()

  const logout = () => {
    window.sessionStorage.removeItem('user')
    window.location.reload()
  }

  const checkUser = () => {
    let user = User.getUser()

    if(user){
      setState(AppState.HOME)
    } else {
      setState(AppState.LOGIN)
    }
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
        // window.location.reload();
      })
    }).catch(err => console.error(err));
  }

  return (
    <Container>
      <button onClick={() => { liff.login() }} >Line Login</button>

      <Row className="justify-content-center">
        <Image style={{ width: '100px' }} src={'logo.png'} />
      </Row>

      <Container
        className='rounded-border'
        style={{
          height: '100%',
          padding: '16px',
          backgroundColor: '#F2EFEA'
        }}>

        <Row className="justify-content-center">
          <Image style={{ width: '80%' }} src={'event-logo.svg'} />
        </Row>

        <Container
          className='rounded-border'
          style={{
            height: '100%',
            padding: '16px',
            backgroundColor: '#FFFFFF'
          }}>

          {

            appState === AppState.LOGIN ? <LoginPage /> : 
            appState === AppState.PROFILE ? <>PROFILE</> : 
            appState === AppState.HOME ? <>HOME</> : 
            <></>

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
