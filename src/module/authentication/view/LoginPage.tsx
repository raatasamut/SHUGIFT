import * as React from 'react';
import { Row, Image } from 'react-bootstrap';

export interface ILoginPageProps {
  lineCallback: () => void,
  alertCallback: (status: number, msg: string) => void,
  nextEvent: {
    detail: string,
    duration: string
  },
  count: number
}

export default class LoginPage extends React.Component<ILoginPageProps> {

  constructor(props: ILoginPageProps) {
    super(props)
  }

  public render() {
    return (
      <div>

        <div style={{
          fontSize: '30px',
          textAlign: 'center',
          color: '#6C6C6C',
          fontWeight: 'bold',
          paddingBottom: '16px'
        }}>
          ยินดีต้อนรับ<br />เข้าสู่เทศกาลหมุนวงล้อ
        </div>

        {
          this.props.nextEvent.detail.length > 0 ? <>

            <div style={{
              fontSize: '28px',
              textAlign: 'center',
              color: '#4A4A4A'
            }}>
              {this.props.nextEvent.detail}
            </div>

            <div style={{
              fontSize: '18px',
              textAlign: 'center',
              color: '#4A4A4A',
              paddingBottom: '16px'
            }}>
              {this.props.nextEvent.duration}
            </div>
          </> : <></>
        }

        <Row className="justify-content-center">
          <Image style={{ width: '240px', marginBottom: '26px' }} src={'ic-section.svg'} />
        </Row>

        <div style={{
          fontSize: '26px',
          textAlign: 'center',
          color: '#6C6C6C'
        }}>
          สามารถ Login ก่อนกด<br />Lucky draw<br />จำนวนสิทธิ์กดรับโค้ด<br />ท่านละ {this.props.count} ครั้ง ต่อ<br />1 LINE ID
        </div>

        <Row className="justify-content-center">
          <Image className='hover' style={{ width: '240px', marginTop: '36px', marginBottom: '8px' }} src={'bt-line-login.svg'} onClick={this.props.lineCallback} />
        </Row>

      </div>
    );
  }
}