import * as React from 'react';
import { Row, Image, Button } from 'react-bootstrap';
import WebAPI from '../../../../api/WebAPI';
import { UserData } from '../../../home/model/UserData';

export interface IWaittingPageProps {
  data: UserData
}

export interface IWaittingPageState {
  detail?: string,
  isShowJoinBtn: boolean
}

export default class WaittingPage extends React.Component<IWaittingPageProps, IWaittingPageState> {

  intervalId?: NodeJS.Timeout

  constructor(props: IWaittingPageProps) {
    super(props)
    this.state = {
      detail: '(เหลืออีก ... วัน)',
      isShowJoinBtn: false
    }
  }

  componentDidMount() {
    new WebAPI().getWorldTime((now: Date) => {
      const end = new Date((this.props.data.startDate || 0) * 1000)

      let dayLeft = (end.getDate() - now.getDate())
      if (dayLeft <= 0) {
        dayLeft = 1
      }

      let nextDuration = '(เหลืออีก ' + dayLeft + ' วัน)'

      this.state = {
        detail: nextDuration,
        isShowJoinBtn: false
      }

      let counter = (end.getTime() - now.getTime()) / 1000
      this.intervalId = setInterval(() => {
        counter = counter - 1;
        if (counter <= 0) {
          this.setState({
            detail: '(กิจกรรมเริ่มแล้ว)',
            isShowJoinBtn: true
          })
          if (this.intervalId) {
            clearInterval(this.intervalId)
          }
        }
      }, 1000)
    })
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
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

        {
          this.state.isShowJoinBtn ?
            <Row className="justify-content-center" style={{ paddingTop: '4px' }}>
              <Button variant="secondary" style={{ maxWidth: '200px', maxHeight: '40px', backgroundColor: '#535353' }} onClick={() => {
                window.location.reload();
              }}>
                เข้าร่วมกิจกรรม
              </Button>
            </Row>
            : <></>
        }

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
