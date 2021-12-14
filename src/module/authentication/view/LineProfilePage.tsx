import * as React from 'react';
import { Row, Image, Button, Col, Container, Table } from 'react-bootstrap';
import { LogD } from '../../../util/AppLog';
import RequestLogModel from '../../main/model/LoginRequestModel'

export interface ILineProfilePageProps {
    data: RequestLogModel,
    loginCallback: () => void,
    logoutCallback: () => void,
    alertCallback: (status: number, msg: string) => void
}

export interface ILineProfilePageState {
    containerWidth: number
}

export default class LineProfilePage extends React.Component<ILineProfilePageProps, ILineProfilePageState> {

    constructor(props: ILineProfilePageProps) {
        super(props)

        this.state = {
            containerWidth: window.innerWidth
        }
    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize)
    }

    handleResize = () => this.setState({
        containerWidth: window.innerWidth
    });

    public render() {

        LogD('LineProfilePage')
        LogD(this.props.data)

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
                    <Image style={{ width: '240px', marginBottom: '16px', marginTop: '16px' }} src={'ic-section.svg'} />
                </Row>

                {

                    this.state.containerWidth < 550 ?
                        this.smallScreen() :
                        this.largeScreen()

                }

            </div >
        );
    }

    smallScreen() {
        return (
            <>
                <Row className="justify-content-center" style={{
                    fontSize: '16px',
                    textAlign: 'center',
                    paddingRight: '16px',
                    color: '#6C6C6C'
                }}>
                    <Image style={{ width: '40px' }} src={'ic-line.svg'} /> LINE Profile
                </Row>

                <Row className="justify-content-center">
                    <Image style={{ width: '110px', height: '110px', margin: '6px', padding: '0px'  }} src={this.props.data.picture} rounded />
                </Row>

                <Table style={{
                    fontSize: '16px',
                    color: '#6C6C6C'
                }} responsive>
                    <tbody>
                        <tr style={{ lineHeight: '1.2px' }}>
                            <td className="noborder" style={{ textAlign: 'end' }}>UserID:</td>
                            <td className="noborder">{this.props.data.userID}</td>
                        </tr>
                        <tr style={{ lineHeight: '1.2px' }}>
                            <td className="noborder" style={{ textAlign: 'end' }}>Username:</td>
                            <td className="noborder">{this.props.data.name}</td>
                        </tr>
                    </tbody>
                </Table>

                <Row className="justify-content-center" style={{ paddingTop: '4px' }}>
                    <Button variant="secondary" style={{ maxWidth: '130px', maxHeight: '48px', backgroundColor: '#535353' }} size="lg" onClick={this.props.loginCallback}>
                        ยืนยัน
                    </Button>
                </Row>

                <Row className="justify-content-center" style={{ paddingTop: '24px' }}>
                    <Image className='hover' style={{ height: '46px', float: 'right' }} src={'bt-logout.svg'} onClick={this.props.logoutCallback} />
                </Row>
            </>
        )
    }

    largeScreen() {
        return (
            <>
                <Container>
                    <Row>
                        <Col style={{ width: '200px' }}>
                            <Row className="justify-content-center">
                                <Image style={{ width: '110px', height: '110px', margin: '6px', padding: '0px' }} src={this.props.data.picture} rounded />
                            </Row>
                        </Col>

                        <Col style={{ width: '350px' }}>

                            <Row className="justify-content-center" style={{
                                fontSize: '16px',
                                textAlign: 'center',
                                paddingRight: '16px',
                                color: '#6C6C6C'
                            }}>
                                <Image style={{ width: '40px' }} src={'ic-line.svg'} /> LINE Profile
                            </Row>
                            <Table style={{
                                fontSize: '16px',
                                color: '#6C6C6C',
                                marginTop: '24px'
                            }} responsive>
                                <tbody>
                                    <tr style={{ lineHeight: '1.2px' }}>
                                        <td className="noborder" style={{ textAlign: 'end' }}>UserID:</td>
                                        <td className="noborder">{this.props.data.userID}</td>
                                    </tr>
                                    <tr style={{ lineHeight: '1.2px' }}>
                                        <td className="noborder" style={{ textAlign: 'end' }}>Username:</td>
                                        <td className="noborder">{this.props.data.name}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{ width: '200px', padding: '0px' }}>
                            <Row className="justify-content-center" style={{ width: '200px' }}>
                                <Image className='hover' style={{ height: '40px', float: 'right' }} src={'bt-logout.svg'} onClick={this.props.logoutCallback} />
                            </Row>
                        </Col>
                        <Col style={{ width: '350px', padding: '0px' }}>
                            <Row className="justify-content-center" style={{ width: '350px' }}>
                                <Button variant="secondary" style={{ maxWidth: '100px', maxHeight: '40px', backgroundColor: '#535353' }} size="sm" onClick={this.props.loginCallback}>
                                    ยืนยัน
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}
