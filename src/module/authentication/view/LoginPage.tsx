import * as React from 'react';
import { Row, Image } from 'react-bootstrap';

export interface ILoginPageProps {
  lineCallback: () => void,
  alertCallback: (status: number, msg: string) => void
}

export default class LoginPage extends React.Component<ILoginPageProps> {

  constructor(props: ILoginPageProps) {
    super(props)
  }

  public render() {
    return (
      <div>

        <div style={{
          fontSize: '35px',
          textAlign: 'center',
          color: '#6C6C6C'
        }}>
          ยินดีต้อนรับ<br/>เข้าสู่เทศกาลหมุนวงล้อ
        </div>

        <Row className="justify-content-center">
          <Image style={{ width: '240px', marginBottom: '36px' }} src={'ic-section.svg'} />
        </Row>

        <div style={{
          fontSize: '30px',
          textAlign: 'center',
          color: '#6C6C6C'
        }}>
          กรุณา Login<br/>ก่อนกด Lucky draw<br/>จำนวนสิทธิ์กดรับโค้ด ท่านละ 3 ครั้ง ต่อ 1 LINE ID
        </div>

        <Row className="justify-content-center">
          <Image className='hover' style={{ width: '240px', marginTop: '36px', marginBottom: '8px' }} src={'bt-line-login.svg'} onClick={this.props.lineCallback} />
        </Row>

      </div>
    );
  }
}