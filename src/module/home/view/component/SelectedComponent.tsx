import * as React from 'react';
import { Modal, Stack, Image, Row } from 'react-bootstrap';
import { USEVIA } from './SelectorComponent';

export interface ISelectedComponentProps {
  show: boolean,
  forType: USEVIA,
  onStart: () => void
  onCancel: () => void
}

export default class SelectedComponent extends React.Component<ISelectedComponentProps> {
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

            <Image style={{ height: '72px' }} src={'ic-check.svg'} />

            <Row className="justify-content-center" style={{ fontSize: '26px', textAlign: 'center' }}>
              การใช้คูปองเรียบร้อยแล้ว<br />คุณเลือกช่องทาง
            </Row>

            <div style={{
              textAlign: 'center',
              marginTop: '16px'
            }}>
              <Image style={{
                marginTop: '-6px',
                marginRight: '12px'
              }} src={this.props.forType === USEVIA.USER ? 'ic-use-code-web.svg' : 'ic-use-code-admin.svg'} />
              <a style={{
                fontSize: '28px',
                color: '#6C6C6C'
              }}>
                {this.props.forType === USEVIA.USER ? 'ใช้โค้ดสั่งซื้อสินค้าบนเว็บไซร์' : 'แจ้งโค้ดและสั่งซื้อกับแอดมิน'}
              </a>
            </div>

            <Row className="justify-content-center">
              <Image style={{ width: '240px', marginBottom: '16px', marginTop: '16px' }} src={'ic-section.svg'} />
            </Row>

            <Row className="justify-content-center" style={{ fontSize: '26px', textAlign: 'center' }}>
              เริ่มสุ่มคูปอง ครั้งที่ 1
            </Row>

            <Image style={{ height: '96px', float: 'right' }} src={'bt-start.svg'} onClick={this.props.onStart} />

            <Row className="justify-content-center" style={{ fontSize: '18px', textAlign: 'center', color: '#6C6C6C' }}>
            (กดปุ่ม START เพื่อเริ่มเล่น)
            </Row>
          </Stack>
        </Modal.Body>
      </Modal>
    );
  }
}
