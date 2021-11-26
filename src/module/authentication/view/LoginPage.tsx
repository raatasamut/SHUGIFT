import * as React from 'react';
import { Row, Image } from 'react-bootstrap';

export interface ILoginPageProps {
  lineCallback: () => void
}

export interface ILoginPageState {
  used: number,
  total: number
}

export default class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {

  constructor(props: ILoginPageProps) {
    super(props)

    this.state = {
      used: 5000,
      total: 10000
    }
  }


  public render() {
    return (
      <div>
        <div style={{
          fontSize: '24px',
          textAlign: 'center',
          color: '#6C6C6C'
        }}>
          กรุณา Login<br/>ก่อนกด Lucky draw<br/>จำนวนสิทธิ์กดรับโค๊ด ท่านละ 3 ครั้ง
        </div>

        <Row className="justify-content-center">
          <Image style={{ width: '240px', marginTop: '36px', marginBottom: '8px' }} src={'bt-line-login.svg'} onClick={this.props.lineCallback}/>
        </Row>

        <Row className="justify-content-center">
          <Image style={{ width: '240px', marginBottom: '36px' }} src={'ic-section.svg'} />
        </Row>

        <div style={{
          fontSize: '16px',
          textAlign: 'center',
          color: '#6C6C6C'
        }}>
          มีคนจับคูปองแล้ว <a style={{
            color: '#000000'
          }}>{this.state.used}</a>/{this.state.total} คูปอง
        </div>
      </div>
    );
  }
}
