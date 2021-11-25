import * as React from 'react';
import { Row, Image, Button, Col, Container } from 'react-bootstrap';
import RequestLogModel from '../../main/model/LoginRequestModel'

export interface ILineProfilePageProps {
    data: RequestLogModel,
    loginCallback: () => void,
    logoutCallback: () => void
}

export default class LineProfilePage extends React.Component<ILineProfilePageProps> {

    public render() {
        return (
            <div>

                <div style={{
                    fontSize: '18px',
                    textAlign: 'center',
                    color: '#6C6C6C'
                }}>
                    อนุญาตให้ใช้ข้อมูลไลน์ ในการลงทะเบียน กรุณากดปุ่ม “ยืนยัน” เพื่อไปยังหน้า Lucky Draw
                </div>

                <Row className="justify-content-center">
                    <Image style={{ width: '240px', marginBottom: '12px', marginTop: '12px' }} src={'ic-section.svg'} />
                </Row>

                <Row className="justify-content-center" style={{
                    fontSize: '16px',
                    textAlign: 'center',
                    color: '#6C6C6C'
                }}>
                    <Image style={{ width: '44px' }} src={'ic-line.svg'} /> LINE Profile
                </Row>

                <Row className="justify-content-center">
                    <Image style={{ width: '130px', margin: '12px' }} src={this.props.data.picture} rounded />
                </Row>

                <Container style={{
                    fontSize: '16px',
                    color: '#6C6C6C'
                }}>
                    <Row>
                        <Col style={{
                            textAlign: 'right',
                        }}>UserID :</Col>
                        <Col>{this.props.data.userID}</Col>
                    </Row>
                    <Row>
                        <Col style={{
                            textAlign: 'right',
                        }}>Username :</Col>
                        <Col>{this.props.data.name}</Col>
                    </Row>
                </Container>

                <Row className="justify-content-center" style={{paddingTop:'24px'}}>
                    <Button variant="secondary" style={{ maxWidth: '130px', maxHeight: '48px' }} size="lg" onClick={this.props.loginCallback}>
                        ยืนยัน
                    </Button>
                </Row>

                <Row className="justify-content-center" style={{paddingTop:'24px'}}>
                    <Button variant="light" style={{ maxWidth: '110px', maxHeight: '28px' }} size="sm" onClick={this.props.logoutCallback}>LINE Logout</Button>
                </Row>
            </div >
        );
    }
}
