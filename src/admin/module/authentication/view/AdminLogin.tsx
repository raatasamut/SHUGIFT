import * as React from 'react';
import { Row, Image, Form, Button, Container } from 'react-bootstrap';
import AdminLoginViewModel from '../viewmodel/AdminLoginViewModel';

export interface IAdminLoginProps {
  login: (user: string, pass: string) => void
}

export default class AdminLogin extends React.Component<IAdminLoginProps> {

  viewModel?: AdminLoginViewModel

  constructor(props: IAdminLoginProps){
    super(props)

    this.viewModel = new AdminLoginViewModel()
  }

  public render() {

    return (
      <div>

        <Row className="justify-content-center" style={{ fontSize: '18px' }}>
          ยินดีต้อนรับเข้าสู่ระบบ
        </Row>
        <Row className="justify-content-center" style={{ fontSize: '22px', paddingTop: '12px' }}>
          Coupon Decoder
        </Row>
        <Row className="justify-content-center" style={{ fontSize: '22px' }}>
          ถอดรหัสคูปอง
        </Row>

        <Row className="justify-content-center">
          <Image style={{ width: '240px', marginBottom: '16px', marginTop: '16px' }} src={'ic-section.svg'} />
        </Row>

        <Container style={{ maxWidth: '360px', paddingTop: '26px', paddingBottom: '48px' }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="ระบุ Username ของท่่าน" onChange={(event) => {
                this.viewModel?.setUsername(event.target.value || '')
              }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="ระบุ Password ของท่่าน" onChange={(event) => {
                this.viewModel?.setPassword(event.target.value || '')
              }} onKeyPress={(target) => {
                if (target.charCode == 13) {
                  this.props.login(this.viewModel?.username || '', this.viewModel?.password || '')
                }
              }} />
            </Form.Group>

            <Row className="justify-content-center">
              <Button variant="primary" size="sm" style={{ maxWidth: '130px', marginTop: '16px', maxHeight: '40px', backgroundColor: '#535353' }} onClick={() => {
                this.props.login(this.viewModel?.username || '', this.viewModel?.password || '')
              }}>
                เข้าสู่ระบบ
              </Button>
            </Row>
          </Form>
        </Container>

      </div>
    );
  }
}
