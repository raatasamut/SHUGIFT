import * as React from 'react';
import { Row, Image } from 'react-bootstrap';
import { UserData } from '../../../home/model/UserData';

export interface IWaittingPageProps {
  data: UserData
}

export interface IWaittingPageState {
  detail?: string
}

export default class WaittingPage extends React.Component<IWaittingPageProps, IWaittingPageState> {

  constructor(props: IWaittingPageProps) {
    super(props)


    const now = new Date()
    const end = new Date((this.props.data.startDate || 0) * 1000)

    let nextDuration = '(เหลืออีก ' + (end.getDate() - now.getDate()) + ' วัน)'

    this.state = {
      detail: nextDuration
    }
  }

  public render() {
    return (
      <div>
        <div style={{
          fontSize: '28px',
          textAlign: 'center',
          color: '#000000'
        }}>
          กิจกรรมใหม่จะเริ่มใน<br />
          {
            'วันที่ ' + new Date((this.props.data.startDate || 0) * 1000).toLocaleDateString('th-TH', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          }
        </div>

        <div style={{
          fontSize: '20px',
          textAlign: 'center',
          color: '#000000'
        }}>
          {
            this.state.detail
          }
        </div>




        <Row className="justify-content-center">
          <Image style={{ width: '240px', margin: '16px' }} src={'ic-section.svg'} />
        </Row>
        
        <div style={{
          fontSize: '28px',
          textAlign: 'center',
          color: '#6C6C6C'
        }}>
          ทาง SHU ขอขอบคุณ ลูกค้าทุกท่าน ที่ให้ความสนใจกิจกรรมของ SHU
        </div>

        <div style={{
          fontSize: '24px',
          textAlign: 'center',
          color: '#6C6C6C',
          paddingTop: '20px',
          paddingBottom: '50px'
        }}>
          ขอบคุณค่ะ/ครับ
        </div>
      </div>
    );
  }
}
