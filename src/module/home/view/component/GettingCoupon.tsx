import * as React from 'react';
import { Modal, Stack, Image, Row, Button, Container, Card } from 'react-bootstrap';
import { UserHistoryData } from '../../model/UserData';

export interface IGettingCouponProps {
  show: boolean,
  position: number,
  winData: UserHistoryData,
  onCancel: () => void
}

export default class GettingCoupon extends React.Component<IGettingCouponProps> {
  public render() {
    return (
      <Modal
        show={this.props.show}
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body>
          <Stack style={{
            textAlign: 'center'
          }}>

            <Row className="justify-content-center" style={{ fontSize: '38px', textAlign: 'center' }}>
              ครั้งที่ {this.props.position + 1}
            </Row>

            <Image style={{ height: '66px' }} src={'ic-gift.svg'} />

            <Row className="justify-content-center" style={{ fontSize: '32px', textAlign: 'center' }}>
              ยินดีด้วยค่ะ คุณได้รับ
            </Row>

            <Card style={{
              border: '0px',
              height: '170px'
            }}>
              <Card.Img style={{
                height: '170px'
              }} src="bg-prize.svg" alt="Card image" />
              <Card.ImgOverlay>
                <Row>
                  <div style={{ width: '25%' }} />
                  <div style={{ width: '75%' }}>
                    <Row className="justify-content-center" style={{ fontSize: '26px', textAlign: 'center', color: '#DD9619', lineHeight: '1.2', paddingTop: '8px' }}>
                      คูปองส่วนลด
                    </Row>
                    <Row className="justify-content-center" style={{ fontSize: '30px', textAlign: 'center', color: '#6F2812', lineHeight: '1.1', paddingTop: '12px' }}>
                      {this.props.winData.detail}
                    </Row>
                    <Row className="justify-content-center" style={{ fontSize: '14px', textAlign: 'center', color: '#6F2812', lineHeight: '1.1', paddingTop: '12px', marginBottom: '8px' }}>
                      {
                        'คูปองหมดอายุวันที่ ' + this.props.winData?.getExpired()
                      }
                    </Row>
                    <Row className="justify-content-center" style={{ fontSize: '14px', textAlign: 'center', color: '#DD9619', lineHeight: '1.1' }}>
                      ขอบคุณที่ร่วมลุ่นกิจกรรม
                    </Row>
                  </div>
                </Row>
              </Card.ImgOverlay>
            </Card>

            <div>
              <Button style={{
                backgroundColor: '#198654',
                color: '#FFFFFF',
                border: '0px',
                fontSize: '24px',
                minWidth: '140px',
                marginTop: '20px'
              }} onClick={this.props.onCancel}>ตกลง</Button>
            </div>

            <Row className="justify-content-center" style={{ fontSize: '24px', textAlign: 'center', paddingTop: '12px' }}>
              {
                'คูปองหมดอายุวันที่ ' + this.props.winData?.getExpired()
              }
            </Row>
          </Stack>
        </Modal.Body>
      </Modal>
    );
  }
}
