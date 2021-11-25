import * as React from 'react';
import { Row, Image, Button, Col, Container, Table } from 'react-bootstrap';
import RequestLogModel from '../../main/model/LoginRequestModel'

export interface ILineProfilePageProps {
    data: RequestLogModel,
    loginCallback: () => void,
    logoutCallback: () => void
}

export default class LineProfilePage extends React.Component<ILineProfilePageProps> {

    public render() {

        console.log('LineProfilePage')
        console.log(this.props.data)

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

                <Table style={{
                    fontSize: '16px',
                    color: '#6C6C6C'
                }} responsive>
                    <tbody>
                        <tr>
                            <td className="noborder" style={{ textAlign: 'end' }}>UserID:</td>
                            <td className="noborder">{this.props.data.userID}</td>
                        </tr>
                        <tr>
                            <td className="noborder" style={{ textAlign: 'end' }}>Username:</td>
                            <td className="noborder">{this.props.data.name}</td>
                        </tr>
                    </tbody>
                </Table>

                <Row className="justify-content-center" style={{ paddingTop: '24px' }}>
                    <Button variant="secondary" style={{ maxWidth: '130px', maxHeight: '48px' }} size="lg" onClick={this.props.loginCallback}>
                        ยืนยัน
                    </Button>
                </Row>

                <Row className="justify-content-center" style={{ paddingTop: '24px' }}>
                    <Button variant="light" style={{ maxWidth: '110px', maxHeight: '28px', fontSize: '12px', color: '#6C6C6C' }} size="sm" onClick={this.props.logoutCallback}>LINE Logout</Button>
                </Row>
            </div >
        );
    }
}
