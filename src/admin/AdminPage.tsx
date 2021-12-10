import * as React from 'react';
import AdminLogin from './module/authentication/view/AdminLogin';
import AdminConvert from './module/convert/view/AdminConvert';
import LoadingOverlay from 'react-loading-overlay-ts';
import { Container, Row, Image, Button, Col } from 'react-bootstrap';
import AdminViewModel from './AdminViewModel';

export interface IAdminPageProps {
}

export interface IAdminStateProps {
  authenticated: boolean,
  isShowLoading: boolean,
  user: string,
}

export default class AdminPage extends React.Component<IAdminPageProps, IAdminStateProps> {

  viewModel?: AdminViewModel

  constructor(props: IAdminPageProps) {
    super(props)

    this.state = {
      authenticated: false,
      isShowLoading: false,
      user: ''
    }

    this.viewModel = new AdminViewModel()
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
                  this.state.authenticated ? <AdminConvert /> : <AdminLogin login={(user: string, pass: string) => {

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