import * as React from 'react';
import liff from '@line/liff';
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

export interface IMainPageProps {
}

export interface IMainPageState {
    appTheme: {
        logo: string,
        backgroundColor: string,
        nextEvent: {
            detail: string,
            duration: string
        },
        count: number
    },
    isShowLoading: boolean,
    alert: {
        isShow: boolean,
        msg: string
    },
    agreementAlert: boolean,
    isOAShow: boolean,
    isShowWaittingPage: {
        isShow: boolean,
        data: UserData
    },
    isShowForceLogout: {
        isShow: boolean,
        msg: string
    },
    isShowEndedPage: boolean,
    appState: AppState,
    userRequestLoginData: RequestLogModel
}

enum AppState {
    LOGIN = 'login', PROFILE = 'profile', HOME = 'home'
}

export default class MainPage extends React.Component<IMainPageProps, IMainPageState> {

    viewModel: AppViewModel

    constructor(props: IMainPageProps) {
        super(props)

        this.viewModel = new AppViewModel()

        this.state = {
            appTheme: {
                logo: '',
                backgroundColor: '#FFFFFF',
                nextEvent: {
                    detail: '',
                    duration: ''
                },
                count: 3
            },
            isShowLoading: true,
            alert: {
                isShow: false,
                msg: ''
            },
            agreementAlert: false,
            isOAShow: false,
            isShowWaittingPage: {
                isShow: false,
                data: new UserData()
            },
            isShowForceLogout: {
                isShow: false,
                msg: ''
            },
            isShowEndedPage: false,
            appState: AppState.LOGIN,
            userRequestLoginData: new RequestLogModel()
        }

        // document.addEventListener('contextmenu', (e) => {
        //   e.preventDefault();
        // });
    }

    componentDidMount() {

        this.viewModel.loadAppTheme((data?: {
            logo: string,
            backgroundColor: string,
            nextEvent?: {
                detail: string,
                duration: string
            },
            count?: number
        }) => {
            this.setState({
                isShowLoading: false,
                appTheme: {
                    logo: data?.logo || '',
                    backgroundColor: data?.backgroundColor || '',
                    nextEvent: data?.nextEvent || {
                        detail: '',
                        duration: ''
                    },
                    count: data?.count || 3
                }
            })
        }, () => {

        })

        if (!AppConfig.useMockup) {
            this.initial()
        } else {

            this.viewModel.request.channel = 'LINE'
            this.viewModel.request.userID = 'uwuduwuelrdlewmkldmweklmdklewmeduuweqd'
            this.viewModel.request.name = 'fair'
            this.viewModel.request.picture = 'https://profile.line-scdn.net/0hsvPcIZdMLFltGgHUCotTDlFfIjQaNCoRFS42OkBKJmoQKjkOVn0xPUkYJT4XLj4JU382a00ccz1C'

            this.setState({
                isShowLoading: false,
                userRequestLoginData: this.viewModel.request,
                appState: AppState.PROFILE
            })
        }
    }

    initial() {
        liff.init({ liffId: '1656710228-XJeQj4Lv' }, () => {
            this.setState({
                isShowLoading: false
            })
            if (liff.isLoggedIn()) {
                this.getLineAccountData()
            } else {
                this.checkUser();
            }
        }, err => {
            this.setState({
                isShowLoading: false
            })
            this.showAlert(0, err.message)
        });
    }

    getLineAccountData() {
        this.setState({
            isShowLoading: true
        })
        liff.getProfile().then(profile => {

            window.history.replaceState({
                additionalInformation: 'Updated the URL with JS'
            }, 'SHU Box of Happiness', window.location.origin)

            this.viewModel.checkAddedOA(liff.getAccessToken(), (added: boolean) => {
                window.localStorage.setItem('loa', added ? 'y' : 'n')
            })

            this.viewModel.request.channel = 'LINE'
            this.viewModel.request.userID = profile.userId
            this.viewModel.request.name = profile.displayName
            this.viewModel.request.picture = profile.pictureUrl
            this.viewModel.request.email = liff.getDecodedIDToken()?.email

            this.setState({
                userRequestLoginData: this.viewModel.request,
                appState: AppState.PROFILE,
                isShowLoading: false
            })

            liff.logout();

        }).catch(err => {
            this.setState({
                isShowLoading: false
            })
            this.showAlert(0, err)
        });
    }

    requestLogin() {
        this.setState({
            isShowLoading: true
        })
        window.localStorage.removeItem('loa')
        this.viewModel.login((msg) => {
            this.setState({
                isShowLoading: false
            })
            this.initial();
        }, (status, msg) => {
            this.setState({
                isShowLoading: false
            })
            this.showAlert(status, msg)
        })
    }

    logout() {
        this.viewModel.logout()
        this.setState({
            userRequestLoginData: new RequestLogModel(),
            appState: AppState.LOGIN
        })
        window.location.reload()
    }

    checkUser() {
        let user = User.getUser()
        if (user) {
            if (window.localStorage.getItem('loa') === 'n') {
                window.localStorage.setItem('loa', 'y')
                this.setState({
                    isOAShow: true
                })
            } else {
                this.setState({
                    appState: AppState.HOME
                })
            }
        } else {
            this.setState({
                appState: AppState.LOGIN
            })
        }
    }

    showAlert(status: number, msg: string) {

        if (status === AppConfig.SHOW_LOADING) {
            this.setState({
                isShowLoading: true
            })
        } else if (status === AppConfig.HIDE_LOADING) {
            this.setState({
                isShowLoading: false
            })
        } else if (status === 401) {
            this.setState({
                isShowForceLogout: {
                    isShow: true,
                    msg: msg
                }
            })
        } else {
            this.setState({
                alert: {
                    isShow: true,
                    msg: msg
                }
            })
        }
    }

    public render() {
        return (
            <LoadingOverlay
                active={this.state.isShowLoading}
                spinner
            >
                <div
                    style={{
                        height: this.state.appState === AppState.HOME ? '100%' : '100vh'
                    }}>
                    <Container>
                        <Modal className="toast-modal" show={this.state.alert.isShow} onHide={() => this.setState({
                            alert: {
                                isShow: false,
                                msg: ''
                            }
                        })}>
                            <Modal.Header closeButton>
                                <Modal.Title>{this.state.alert.msg}</Modal.Title>
                            </Modal.Header>
                        </Modal>

                        <Modal
                            show={this.state.isShowForceLogout.isShow}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header>
                                <Modal.Title>{this.state.isShowForceLogout.msg}</Modal.Title>
                            </Modal.Header>
                            <Modal.Footer>
                                <Button variant="outline-dark" onClick={() => {
                                    this.logout()
                                }}>กลับไปที่หน้าเข้าสู่ระบบ</Button>
                            </Modal.Footer>
                        </Modal>

                        <AgreementModal show={this.state.agreementAlert}
                            onSelected={() => {
                                this.setState({
                                    agreementAlert: false
                                })
                                this.requestLogin()
                            }}
                            onCancel={() => {
                                this.setState({
                                    agreementAlert: false
                                })
                            }} />

                        <Modal
                            show={this.state.isOAShow}
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
                                        this.setState({
                                            isOAShow: false,
                                            appState: AppState.HOME
                                        })
                                    }}>ตกลงและเพิ่มเพื่อนกับ SHU</Button>
                                    <Button variant="outline-dark" onClick={() => {
                                        this.setState({
                                            isOAShow: false,
                                            appState: AppState.HOME
                                        })
                                    }}>ข้ามและไปยังหน้ากิจกรรม</Button>
                                </Stack>
                            </Modal.Footer>
                        </Modal>

                        <Row className="justify-content-center">
                            <Image style={{ width: '80px', padding: '16px' }} src={'logo-shu.svg'} />
                        </Row>

                        {
                            this.state.isShowWaittingPage.isShow ?
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
                                                maxWidth: this.state.appState === AppState.HOME ? '900px' : '550px',
                                                paddingBottom: '24px',
                                                paddingLeft: '12px',
                                                paddingRight: '12px',
                                                backgroundColor: '#FFFFFF'
                                            }}>

                                            <Row className="justify-content-center">
                                                <Image style={{ width: '100%', maxWidth: '300px' }} src='ic-shopping.svg' />
                                            </Row>

                                            <WaittingPage data={this.state.isShowWaittingPage.data} />

                                        </Container>
                                    </Container>
                                </>
                                : this.state.isShowEndedPage ?
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
                                                    maxWidth: this.state.appState === AppState.HOME ? '900px' : '550px',
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
                                                backgroundColor: this.state.appTheme.backgroundColor
                                            }}>

                                            <Row className="justify-content-center">
                                                <Image style={{ width: '90%', maxWidth: '250px' }} src={this.state.appTheme.logo} />
                                            </Row>

                                            <Container
                                                className='rounded-border'
                                                style={{
                                                    height: '100%',
                                                    maxWidth: this.state.appState === AppState.HOME ? '900px' : '550px',
                                                    paddingTop: '24px',
                                                    paddingBottom: '24px',
                                                    paddingLeft: '12px',
                                                    paddingRight: '12px',
                                                    backgroundColor: '#FFFFFF'
                                                }}>

                                                {
                                                    this.state.appState === AppState.LOGIN ? <LoginPage nextEvent={this.state.appTheme.nextEvent} count={this.state.appTheme.count} lineCallback={() => {
                                                        liff.login()
                                                    }} alertCallback={(status: number, msg: string) => {
                                                        this.showAlert(status, msg)
                                                    }} /> :
                                                        this.state.appState === AppState.PROFILE ? <LineProfilePage data={this.state.userRequestLoginData} loginCallback={() => {
                                                            this.setState({
                                                                agreementAlert: true
                                                            })
                                                        }} logoutCallback={() => {
                                                            this.logout();
                                                        }} alertCallback={(status: number, msg: string) => {
                                                            this.showAlert(status, msg)
                                                        }} /> :
                                                            this.state.appState === AppState.HOME ? <HomePage logoutCallback={() => {
                                                                this.logout();
                                                            }} alertCallback={(status: number, msg: string) => {
                                                                this.showAlert(status, msg)
                                                            }} showWaittingPage={(data: UserData) => {
                                                                this.setState({
                                                                    isShowWaittingPage: {
                                                                        isShow: true,
                                                                        data: data
                                                                    }
                                                                })
                                                            }} showEndPage={() => {
                                                                this.setState({
                                                                    isShowEndedPage: true
                                                                })
                                                            }} /> :
                                                                <>{this.state.appState}</>
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
}
