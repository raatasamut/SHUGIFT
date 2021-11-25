import * as React from 'react';
import { Row, Image, Button } from 'react-bootstrap';
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
                    fontSize: '24px',
                    textAlign: 'center',
                    color: '#6C6C6C'
                }}>
                    อนุญาตให้ใช้ข้อมูลไลน์ ในการลงทะเบียน กรุณากดปุ่ม “ยืนยัน” เพื่อไปยังหน้า Lucky Draw
                </div>

                <Row className="justify-content-center">
                    <Image style={{ width: '240px', marginBottom: '48px' }} src={'ic-section.svg'} />
                </Row>


                <Row className="justify-content-center">
                    <Image style={{ width: '150px', margin: '24px' }} src={this.props.data.picture} rounded />
                </Row>

                <Row className="justify-content-center">
                    <Button variant="secondary" size="lg" onClick={this.props.loginCallback}>
                        ยืนยัน
                    </Button>
                </Row>

                <Row className="justify-content-center">
                    <Button variant="light" onClick={this.props.logoutCallback}>LINE Logout</Button>
                </Row>
            </div >
        );
    }
}
