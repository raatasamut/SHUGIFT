import * as React from 'react';
import { Modal, Stack, Image, Row, Button } from 'react-bootstrap';
import { USEVIA } from './SelectorComponent';

export interface IHowToUseCodeProps {
  show: boolean,
  forType: USEVIA,
  onCancel: () => void
}

export default class HowToUseCode extends React.Component<IHowToUseCodeProps> {
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
          <Stack>

            <div>
              <Image style={{ height: '18px', float: 'right' }} src={'ic-cancel.svg'} onClick={this.props.onCancel} />
            </div>

            <Image style={{ height: '54px', marginBottom: '16px' }} src={this.props.forType === USEVIA.USER ? 'ic-use-code-web.svg' : 'ic-use-code-admin.svg'} />

            <Row className="justify-content-center" style={{ fontSize: '26px', textAlign: 'center' }}>
              {this.props.forType === USEVIA.USER ? 'วิธีใช้โค้ดบนเว็บไซต์ SHU' : 'วิธีใช้โค้ดและสั่งซื้อกับแอดมิน'}
            </Row>

            {this.props.forType === USEVIA.USER ?
              <div style={{ fontSize: '24px', color: '#6C6C6C' }}>
                1. ล็อกอินเข้าสู่ระบบ SHU<br />
                2. เลือกสินค้าที่คุณต้องการ<br />
                3. ไปยังตะกร้า แล้วกด “ดำเนินการสั่งซื้อ”<br />
                4. ในหน้าที่อยู่และการจัดส่ง ไปยังส่วนของ
                ใช้รหัสส่วนลด เพื่อระบุโค้ดของคูปอง<br />
                5. คัดลอกโค้ดที่ได้รับ แล้วนำไประบุที่ช่องใช้
                รหัสส่วนลด แล้วกดปุ่ม “ใช้ส่วนลด” เพื่อ
                ใช้งานคูปองที่ได้รับ<br />
                <Row className="justify-content-center" style={{ paddingTop: '24px' }}>
                  <Button variant="secondary" style={{ maxWidth: '130px', maxHeight: '44px', backgroundColor: '#535353' }} size="lg" onClick={() => {
                    window.open('https://www.shu.global/customer/account/login/', "_blank")
                    this.props.onCancel()
                  }}>
                    เปิดเว็บไซต์ SHU
                  </Button>
                </Row>
              </div> :
              <div style={{ fontSize: '24px', color: '#6C6C6C' }}>
                1. กดที่ปุ่ม “แจ้งแอดมิน” จะไปยังแอปหน้า
                LINE ของโปรไฟล์ SHU<br />
                2. คัดลอกโค้ดที่ได้รับ ส่งให้กับทางแอดมิน<br />
                3. ส่งรูปสินค้าที่ระบุชื่อรุ่นพร้อมไซส์ของ
                ท่านให้แก่แอดมิน<br />

                <Row className="justify-content-center" style={{ paddingTop: '24px' }}>
                  <Button variant="secondary" style={{ maxWidth: '130px', maxHeight: '44px', backgroundColor: '#535353' }} size="lg" onClick={() => {
                    window.open('https://page.line.me/?liff.state=%3FaccountId%3Dshu.global', "_blank")
                    this.props.onCancel()
                  }}>
                    แจ้งแอดมิน
                  </Button>
                </Row>
              </div>
            }

            <Row className="justify-content-center">
              <Image style={{ width: '240px', marginBottom: '16px', marginTop: '16px' }} src={'ic-section.svg'} />
            </Row>

            <Row className="justify-content-center" style={{ paddingBottom: '16px' }}>
              <Button variant="outline-dark" style={{ maxWidth: '130px', maxHeight: '44px' }} size="lg" onClick={this.props.onCancel}>
                ปิดหน้าต่าง
              </Button>
            </Row>

          </Stack>
        </Modal.Body>
      </Modal>
    );
  }
}
