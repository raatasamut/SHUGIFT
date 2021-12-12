import * as React from 'react';
import AdminLogin from './module/authentication/view/AdminLogin';
import AdminConvert from './module/convert/view/AdminConvert';
import LoadingOverlay from 'react-loading-overlay-ts';
import { Container, Row, Image, Button, Col, Modal } from 'react-bootstrap';
import AdminViewModel from './AdminViewModel';
import { plainToClass } from 'class-transformer';
import { UserModel } from '../module/authentication/model/UserModel';

export interface IAdminPageProps {
}

export interface IAdminStateProps {
  authenticated: boolean,
  isShowLoading: boolean,
  user: string,
  toast: {
    isShow: Boolean,
    msg: string
  }
}

export default class AdminPage extends React.Component<IAdminPageProps, IAdminStateProps> {

  viewModel?: AdminViewModel

  constructor(props: IAdminPageProps) {
    super(props)

    this.viewModel = new AdminViewModel()

    try {
      let tmp = window.localStorage.getItem('admin')
      if (tmp) {
        let user = plainToClass(UserModel, JSON.parse(tmp))
        this.state = {
          authenticated: true,
          isShowLoading: false,
          user: user?.user?.name || '',
          toast: {
            isShow: false,
            msg: ''
          }
        }
      } else {
        this.state = {
          authenticated: false,
          isShowLoading: false,
          user: '',
          toast: {
            isShow: false,
            msg: ''
          }
        }
      }
    } catch (e) {
      this.state = {
        authenticated: false,
        isShowLoading: false,
        user: '',
        toast: {
          isShow: false,
          msg: ''
        }
      }
    }

  }

  logout() {
    window.localStorage.removeItem('admin')
    window.location.reload()
  }

  showLoading(show: boolean) {
    this.setState({ isShowLoading: show })
  }

  public render() {
    return (
      <LoadingOverlay
        active={this.state.isShowLoading}
        spinner
      >

        <div
          style={{
            height: '100vh',
            backgroundColor: '#393939'
          }}>

          <Modal className="toast-modal" show={this.state.toast.isShow} onHide={() => this.setState({ toast: { isShow: false, msg: '' } })}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.toast.msg}</Modal.Title>
            </Modal.Header>
          </Modal>

          <Container
            style={{
              height: '100%',
              maxWidth: '800px',
              paddingTop: '24px',
              paddingBottom: '24px',
              paddingLeft: '12px',
              paddingRight: '12px',
              backgroundColor: '#E4E4E4'
            }}>
            <Container>

              <Row className="justify-content-end" style={{ paddingBottom: '16px', paddingRight: '16px', textAlign: 'center', fontSize: '18px', color: '#6C6C6C' }}>

                {
                  this.state.authenticated ? <>
                    {'User : ' + this.state.user}
                    <Button variant="primary" size="sm" style={{ maxWidth: '100px', maxHeight: '40px', backgroundColor: '#535353', marginLeft: '12px' }} onClick={() => {
                      this.logout()
                    }}>
                      ออกจากระบบ
                    </Button>
                  </> : <></>
                }

              </Row>

              <Container
                className='rounded-border'
                style={{
                  height: '100%',
                  maxWidth: '570px',
                  padding: '16px',
                  backgroundColor: '#F7F7F7'
                }}>

                <Row className="justify-content-center">
                  <Image style={{ width: '70px', padding: '16px' }} src={'logo-shu.svg'} />
                </Row>

                {
                  this.state.authenticated ? <AdminConvert toast={(msg) => {
                    this.setState({
                      toast: {
                        isShow: true,
                        msg: msg
                      }
                    })
                  }} /> : <AdminLogin login={(user: string, pass: string) => {

                    console.log(`User: ${user}, Pass: ${pass}`)

                    this.showLoading(true)
                    this.viewModel?.login(user, pass, (user) => {
                      this.showLoading(false)
                      this.setState({
                        user: user?.user?.name || '',
                        authenticated: true
                      })
                    }, (status, msg) => {
                      this.showLoading(false)
                      this.setState({
                        toast: {
                          isShow: true,
                          msg: msg
                        }
                      })
                    })
                  }} />
                }

              </Container>
            </Container>

            <footer style={{ fontSize: '12px', color: '#6C6C6C', textAlign: 'center', padding: '8px' }}>Copyright @ SHU Global 2020. All Right Reserved.</footer>

          </Container>

        </div>
      </LoadingOverlay >
    );
  }
}