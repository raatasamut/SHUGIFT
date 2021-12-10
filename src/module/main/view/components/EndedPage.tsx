import * as React from 'react';
import { Row, Image} from 'react-bootstrap';

export interface IEndedPageProps {
}

export interface IEndedPageState {
}

export default class EndedPage extends React.Component<IEndedPageProps, IEndedPageState> {

  constructor(props: IEndedPageProps) {
    super(props)

  }

  shareButton(icon: string, title: string, link: string) {
    return (
      <Row className="justify-content-center">
        <div className='rounded-border-button' style={{
          backgroundColor: '#F7F7F7',
          marginBottom: '8px',
          marginTop: '8px',
          marginRight: '16px',
          marginLeft: '16px',
          width: '300px',
          height: '48px'
        }} onClick={() => {
          window.open(link, "_blank")
        }}>
          <Image src={icon} style={{
            width: '48px',
            height: '48px',
            marginRight: '36px'
          }} />

          {title}

          <Image src='ic-arrow.svg' style={{
            width: '26px',
            height: '26px',
            margin: '11px',
            float: 'right'
          }} />
        </div>
      </Row>
    )
  }

  public render() {
    return (
      <div>
        <div style={{
          fontSize: '32px',
          textAlign: 'center',
          color: '#000000'
        }}>
          กิจกรรมใหม่<br />กำลังจะกลับมาอีกครั้ง
        </div>

        <div style={{
          fontSize: '24px',
          textAlign: 'center',
          color: '#6C6C6C',
          paddingTop: '8px'
        }}>
          สามารถติดตามข่าวสารได้ที่
        </div>

        {
          this.shareButton('ic-facebook.svg', 'ไปยัง Facebook SHU', 'https://www.facebook.com/www.shu.global')
        }
        {
          this.shareButton('ic-ig.svg', 'ไปยัง Instagram SHU', 'https://www.instagram.com/shu.global/')
        }
        {
          this.shareButton('ic-line-sc.svg', 'ไปยัง Line Official SHU', 'https://page.line.me/?liff.state=%3FaccountId%3Dshu.global')
        }
        {
          this.shareButton('ic-tiktok.svg', 'ไปยัง TikTok SHU', 'https://www.tiktok.com/@shu.global')
        }

        <Row className="justify-content-center">
          <Image style={{ width: '240px', margin: '16px' }} src={'ic-section.svg'} />
        </Row>

        <div style={{
          fontSize: '28px',
          textAlign: 'center',
          color: '#6C6C6C'
        }}>
          ทาง SHU ขอขอบคุณลูกค้าทุกท่าน ที่ให้ความสนใจกิจกรรมของ SHU
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
