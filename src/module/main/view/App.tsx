import liff from '@line/liff';
import { useEffect, useState } from 'react';
import AppViewModel from '../viewmodel/AppViewModel';
import User from '../../authentication/User';
import { Container, Row, Image, Modal, Button, Stack } from 'react-bootstrap';
import LoginPage from '../../authentication/view/LoginPage';
import LineProfilePage from '../../authentication/view/LineProfilePage';
import RequestLogModel from '../model/LoginRequestModel'
import './App.scss';
import HomePage from '../../home/view/HomePage';
import { UserData } from '../../home/model/UserData';
import WaittingPage from './components/WaittingPage';
import EndedPage from './components/EndedPage';
import AppConfig from '../../../AppConfig';
import LoadingOverlay from 'react-loading-overlay-ts';
import AgreementModal from './components/AgreementModal';

const viewModel = new AppViewModel()

function App() {

  enum AppState {
    LOGIN = 'login', PROFILE = 'profile', HOME = 'home'
  }

  const [alert, isShow] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')

  const [agreementAlert, isAgreementShow] = useState(false)
  const [OAAlert, isOAShow] = useState(false)

  const [forceLogout, isShowForceLogout] = useState(false)
  const [forceLogoutMsg, setForceLogoutMsg] = useState('')

  const [appState, setState] = useState(AppState.LOGIN)
  const [lineData, setData] = useState(new RequestLogModel())


  const [waittingPage, isShowWaittingPage] = useState(false)
  const [waittingData, setWaittingPageData] = useState(new UserData())

  const [endedPage, isShowEndedPage] = useState(false)

  const [appTheme, setAppTheme] = useState({
    logo: '',
    backgroundColor: '#FFFFFF',
    nextEvent: {
      detail: '',
      duration: ''
    },
    count: 3
  })

  const [isShowLoading, setShowLoading] = useState(true)

  useEffect(() => {

    viewModel.loadAppTheme((data?: {
      logo: string,
      backgroundColor: string,
      nextEvent?: {
        detail: string,
        duration: string
      },
      count?: number
    }) => {
      setAppTheme({
        logo: data?.logo || '',
        backgroundColor: data?.backgroundColor || '',
        nextEvent: data?.nextEvent || {
          detail: '',
          duration: ''
        },
        count: data?.count || 3
      })
    }, () => {

    })

    if (!AppConfig.useMockup) {
      initial()
    } else {

      viewModel.request.channel = 'LINE'
      viewModel.request.userID = 'uwuduwuelrdlewmkldmweklmdklewmeduuweqd'
      viewModel.request.name = 'fair'
      viewModel.request.picture = 'https://profile.line-scdn.net/0hsvPcIZdMLFltGgHUCotTDlFfIjQaNCoRFS42OkBKJmoQKjkOVn0xPUkYJT4XLj4JU382a00ccz1C'

      setData(viewModel.request)
      setState(AppState.PROFILE)

      setShowLoading(false)
    }

    // document.addEventListener('contextmenu', (e) => {
    //   e.preventDefault();
    // });
  }, []);

  const logout = () => {
    setData(new RequestLogModel())
    window.localStorage.removeItem('user')
    window.localStorage.removeItem('loa')
    setState(AppState.LOGIN)
    window.location.reload()
  }

  const checkUser = () => {
    let user = User.getUser()
    if (user) {
      if (window.localStorage.getItem('loa') === 'n') {
        window.localStorage.setItem('loa', 'y')
        isOAShow(true)
      } else {
        setState(AppState.HOME)
      }
    } else {
      setState(AppState.LOGIN)
    }
  }

  const showAlert = (status: number, msg: string) => {

    if (status === AppConfig.SHOW_LOADING) {
      setShowLoading(true)
    } else if (status === AppConfig.HIDE_LOADING) {
      setShowLoading(false)
    } else if (status === 401) {
      setForceLogoutMsg(msg)
      isShowForceLogout(true)
    } else {
      setAlertMsg(msg)
      isShow(true)
    }
  }

  const initial = () => {
    liff.init({ liffId: '1656710228-XJeQj4Lv' }, () => {
      setShowLoading(false)
      if (liff.isLoggedIn()) {
        getLineAccountData()
      } else {
        checkUser();
      }
    }, err => {
      setShowLoading(false)
      showAlert(0, err.message)
    });
  }

  const getLineAccountData = () => {

    setShowLoading(true)
    liff.getProfile().then(profile => {

      window.history.replaceState({
        additionalInformation: 'Updated the URL with JS'
      }, 'SHU Box of Happiness', window.location.origin)

      viewModel.checkAddedOA(liff.getAccessToken(), (added: boolean) => {
        window.localStorage.setItem('loa', added ? 'y' : 'n')
      })

      viewModel.request.channel = 'LINE'
      viewModel.request.userID = profile.userId
      viewModel.request.name = profile.displayName
      viewModel.request.picture = profile.pictureUrl
      viewModel.request.email = liff.getDecodedIDToken()?.email

      setData(viewModel.request)
      setState(AppState.PROFILE)

      liff.logout();

      setShowLoading(false)
    }).catch(err => {
      setShowLoading(false)
      showAlert(0, err)
    });
  }

  const requestLogin = () => {
    setShowLoading(true)
    window.localStorage.removeItem('loa')
    viewModel.login((msg) => {
      setShowLoading(false)
      initial();
    }, (status, msg) => {
      setShowLoading(false)
      showAlert(status, msg)
    })
  }

  return (

    <LoadingOverlay
      active={isShowLoading}
      spinner
    >
      <div
        style={{
          height: appState === AppState.HOME ? '100%' : '100vh'
        }}>
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

          <AgreementModal show={agreementAlert}
            onSelected={() => {
              isAgreementShow(false)
              requestLogin()
            }}
            onCancel={() => {
              isAgreementShow(false)
            }} />

          <Modal
            show={OAAlert}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header>
              <Modal.Title>คุณยังไม่ได้เป็นเพื่อนกับ SHU</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              SHU's Gift code ของคุณจะส่งไปยัง SHU's Official account

            </Modal.Body>
            <Modal.Footer>
              <Stack gap={3}>
                <Button variant="secondary" style={{ backgroundColor: '#535353' }} onClick={() => {
                  window.open('https://page.line.me/?liff.state=%3FaccountId%3Dshu.global', "_blank")
                  isOAShow(false)
                  setState(AppState.HOME)
                }}>ตกลงและเพิ่มเพื่อนกับ SHU</Button>
                <Button variant="outline-dark" onClick={() => {
                  isOAShow(false)
                  setState(AppState.HOME)
                }}>ข้ามและไปยังหน้ากิจกรรม</Button>
              </Stack>
            </Modal.Footer>
          </Modal>

          <Row className="justify-content-center">
            <Image style={{ width: '80px', padding: '16px' }} src={'logo-shu.svg'} />
          </Row>

          {
            waittingPage ?
              <>
                <Container
                  className='rounded-border'
                  style={{
                    height: '100%',
                    maxWidth: '900px',
                    padding: '20px',
                    backgroundColor: '#F2F2F2'
                  }}>

                  <Container
                    className='rounded-border'
                    style={{
                      height: '100%',
                      maxWidth: appState === AppState.HOME ? '900px' : '550px',
                      paddingBottom: '24px',
                      paddingLeft: '12px',
                      paddingRight: '12px',
                      backgroundColor: '#FFFFFF'
                    }}>

                    <Row className="justify-content-center">
                      <Image style={{ width: '100%', maxWidth: '300px' }} src='ic-shopping.svg' />
                    </Row>

                    <WaittingPage data={waittingData} />

                  </Container>
                </Container>
              </>
              : endedPage ?
                <>
                  <Container
                    className='rounded-border'
                    style={{
                      height: '100%',
                      maxWidth: '900px',
                      padding: '20px',
                      backgroundColor: '#F2F2F2'
                    }}>

                    <Container
                      className='rounded-border'
                      style={{
                        height: '100%',
                        maxWidth: appState === AppState.HOME ? '900px' : '550px',
                        paddingBottom: '24px',
                        paddingLeft: '12px',
                        paddingRight: '12px',
                        backgroundColor: '#FFFFFF'
                      }}>

                      <Row className="justify-content-center">
                        <Image style={{ width: '100%', maxWidth: '300px' }} src='ic-shopping.svg' />
                      </Row>

                      <EndedPage />

                    </Container>
                  </Container>
                </> :
                <>
                  <Container
                    className='rounded-border'
                    style={{
                      height: '100%',
                      maxWidth: '900px',
                      paddingBottom: '24px',
                      paddingLeft: '20px',
                      paddingRight: '20px',
                      backgroundColor: appTheme.backgroundColor
                    }}>

                    <Row className="justify-content-center">
                      <Image style={{ width: '90%', maxWidth: '250px' }} src={appTheme.logo} />
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
                        appState === AppState.LOGIN ? <LoginPage nextEvent={appTheme.nextEvent} count={appTheme.count} lineCallback={() => {
                          liff.login()
                        }} alertCallback={(status: number, msg: string) => {
                          showAlert(status, msg)
                        }} /> :
                          appState === AppState.PROFILE ? <LineProfilePage data={lineData} loginCallback={() => {
                            isAgreementShow(true)
                          }} logoutCallback={() => {
                            logout();
                          }} alertCallback={(status: number, msg: string) => {
                            showAlert(status, msg)
                          }} /> :
                            appState === AppState.HOME ? <HomePage logoutCallback={() => {
                              logout();
                            }} alertCallback={(status: number, msg: string) => {
                              showAlert(status, msg)
                            }} showWaittingPage={(data: UserData) => {
                              setWaittingPageData(data)
                              isShowWaittingPage(true)
                            }} showEndPage={() => {
                              isShowEndedPage(true)
                            }} /> :
                              <>{appState}</>
                      }

                    </Container>
                  </Container>
                </>
          }
        </Container>

        <footer style={{ fontSize: '12px', color: '#6C6C6C', textAlign: 'center', padding: '8px' }}>Copyright @ SHU Global 2020. All Right Reserved.</footer>
      </div>
    </LoadingOverlay>
  );
}

export default App