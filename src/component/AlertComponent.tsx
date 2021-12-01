import * as React from 'react';
import { Alert, Container, Modal, Nav, Navbar, NavDropdown } from 'react-bootstrap';

export interface IAlertComponentProps {
  msg: string
}

export interface IAlertComponentState {
  show: boolean,
}

export default class AlertComponent extends React.Component<IAlertComponentProps, IAlertComponentState> {

  constructor(props: IAlertComponentProps) {
    super(props)

    this.state = {
      show: false
    }
  }

  public render() {
    return (
      <Modal className="toast-modal" show={this.state.show} onHide={() => this.setState({ show: false })}>
        <Modal.Header closeButton>
          <Modal.Title>คัดลอกโค้ดเรียบร้อยแล้ว</Modal.Title>
        </Modal.Header>
      </Modal>
    );
  }
}
