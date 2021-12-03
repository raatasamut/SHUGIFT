import liff from '@line/liff';
import { useEffect, useState } from 'react';
import AppViewModel from '../viewmodel/AppViewModel';
import User from '../../authentication/User';
import { Container, Row, Image, Modal, Button } from 'react-bootstrap';
import LoginPage from '../../authentication/view/LoginPage';
import LineProfilePage from '../../authentication/view/LineProfilePage';
import RequestLogModel from '../model/LoginRequestModel'
import './App.scss';
import HomePage from '../../home/view/HomePage';

function App() {

  enum AppState {
    LOGIN = 'login', PROFILE = 'profile', HOME = 'home'
  }

  const [alert, isShow] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')

  const [forceLogout, isShowForceLogout] = useState(false)
  const [forceLogoutMsg, setForceLogoutMsg] = useState('')

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

    // document.addEventListener('contextmenu', (e) => {
    //   e.preventDefault();
    // });
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

  const showAlert = (status: number, msg: string) => {

    if (status === 401) {
      setForceLogoutMsg(msg)
      isShowForceLogout(true)
    } else {
      setAlertMsg(msg)
      isShow(true)
    }
  }

  const initial = () => {
    liff.init({ liffId: '1656680913-v15bQrE1' }, () => {
      if (liff.isLoggedIn()) {
        getLineAccountData()
      } else {
        checkUser();
      }
    }, err => showAlert(0, err.message));
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
    }).catch(err => {
      showAlert(0, err)
    });
  }

  const requestLogin = () => {
    viewModel.login((msg) => {
      initial();
    }, (status, msg) => {
      showAlert(status, msg)
    })
  }

  return (
    <Container>

      <Modal className="toast-modal" show={alert} onHide={() => isShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{alertMsg}</Modal.Title>
        </Modal.Header>
      </Modal>

      <Modal
        show={forceLogout}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>{forceLogoutMsg}</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={() => {
            logout()
          }}>กลับไปที่หน้าเข้าสู่ระบบ</Button>
        </Modal.Footer>
      </Modal>

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
            }} alertCallback={(status: number, msg: string) => {
              showAlert(status, msg)
            }} /> :
              appState === AppState.PROFILE ? <LineProfilePage data={lineData} loginCallback={() => {
                requestLogin()
              }} logoutCallback={() => {
                logout();
              }} alertCallback={(status: number, msg: string) => {
                showAlert(status, msg)
              }} /> :
                appState === AppState.HOME ? <HomePage logoutCallback={() => {
                  logout();
                }} alertCallback={(status: number, msg: string) => {
                  showAlert(status, msg)
                }} /> :
                  <>{appState}</>
          }

        </Container>
      </Container>
    </Container>
  );
}

export default App