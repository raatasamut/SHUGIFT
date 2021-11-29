import liff from '@line/liff';
import { useEffect, useState } from 'react';
import AppViewModel from '../viewmodel/AppViewModel';
import User from '../../authentication/User';
import { Container, Row, Image } from 'react-bootstrap';
import LoginPage from '../../authentication/view/LoginPage';
import LineProfilePage from '../../authentication/view/LineProfilePage';
import RequestLogModel from '../model/LoginRequestModel'
import './App.scss';
import HomePage from '../../home/view/HomePage';

function App() {

  enum AppState {
    LOGIN = 'login', PROFILE = 'profile', HOME = 'home'
  }

  const [appState, setState] = useState(AppState.LOGIN)
  const [lineData, setData] = useState(new RequestLogModel())

  const viewModel = new AppViewModel()

  useEffect(() => {
    initial()

    // viewModel.request.channel = 'LINE'
    // viewModel.request.userID = 'uwuduwuelr,flre,l;f,erlf,mllerw,dlewmkldmweklmdklewmeduuweqd'
    // viewModel.request.name = 'fair'
    // viewModel.request.picture = 'https://profile.line-scdn.net/0hsvPcIZdMLFltGgHUCotTDlFfIjQaNCoRFS42OkBKJmoQKjkOVn0xPUkYJT4XLj4JU382a00ccz1C'

    // setData(viewModel.request)

    // setState(AppState.PROFILE)

  }, []);

  const logout = () => {
    setData(new RequestLogModel())
    window.sessionStorage.removeItem('user')
    setState(AppState.LOGIN)
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

      viewModel.request.channel = 'LINE'
      viewModel.request.userID = profile.userId
      viewModel.request.name = profile.displayName
      viewModel.request.picture = profile.pictureUrl

      setData(viewModel.request)
      setState(AppState.PROFILE)

      liff.logout();
    }).catch(err => console.error(err));
  }

  const requestLogin = () => {
    viewModel.login((msg) => {
      initial();
    })
  }

  return (
    <Container>

      <Row className="justify-content-center">
        <Image style={{ width: '90px' }} src={'logo.png'} />
      </Row>

      <Container
        className='rounded-border'
        style={{
          height: '100%',
          maxWidth: '900px',
          paddingBottom: '24px',
          paddingLeft: '20px',
          paddingRight: '20px',
          backgroundColor: '#F2EFEA'
        }}>

        <Row className="justify-content-center">
          <Image style={{ width: '90%', maxWidth: '250px' }} src={'event-logo.svg'} />
        </Row>

        <Container
          className='rounded-border'
          style={{
            height: '100%',
            maxWidth: appState === AppState.HOME ? '900px' : '550px',
            paddingTop: '24px',
            paddingBottom: '24px',
            paddingLeft: '12px',
            paddingRight: '12px',
            backgroundColor: '#FFFFFF'
          }}>

          {
            appState === AppState.LOGIN ? <LoginPage lineCallback={() => {
              liff.login()
            }} /> :
              appState === AppState.PROFILE ? <LineProfilePage data={lineData} loginCallback={() => {
                requestLogin()
              }} logoutCallback={() => {
                logout();
              }} /> :
                appState === AppState.HOME ? <HomePage logoutCallback={() => {
                  logout();
                }} /> :
                  <>{appState}</>
          }

        </Container>
      </Container>
    </Container>
  );
}

export default App