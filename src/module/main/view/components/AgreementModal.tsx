import { Button, Modal, Image, Stack, Card, Row, Col } from 'react-bootstrap';
import * as React from 'react';

export interface IAgreementModalProps {
    show: boolean,
    onSelected: () => void
    onCancel: () => void
}

export interface IAgreementModalComponentState {
    selected: boolean
}

export default class AgreementModal extends React.Component<IAgreementModalProps, IAgreementModalComponentState> {

    constructor(props: IAgreementModalProps) {
        super(props)

        this.state = {
            selected: false
        }
    }

    public render() {
        return (
            <Modal
                show={this.props.show}
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Body style={{
                    padding: '0px'
                }}>
                    <div style={{
                        textAlign: 'center',
                        fontSize: '24px',
                        padding: '12px'
                    }}>
                        ยอมรับข้อตกลง
                        <Image style={{ height: '18px', float: 'right' }} src={'ic-cancel.svg'} onClick={() => {
                            this.props.onCancel()
                        }} />
                    </div>

                    <Stack style={{
                        textAlign: 'center',
                        fontSize: '20px',
                        backgroundColor: '#F7F7F7',
                        padding: '12px 12px 24px 12px'
                    }}>
                        ท่านยอมรับที่จะเข้าร่วมกิจกรรมและยอมรับงื่อนไขการร่วมกิจกรรมและของรางวัล

                        <Stack gap={2} style={{ padding: '12px', textAlign: 'left', color: '#6C6C6C' }}>
                            <Card>
                                <Card.Body>
                                    <Row xs="auto">
                                        <Col><input type='radio' checked={this.state.selected} onChange={() => { this.setState({ selected: true }) }} />
                                        </Col>
                                        <Col><div>
                                            ยอมรับ ข้าพเจ้าได้อ่านและยอมรับ<br />
                                            <a className='hover' style={{ color: 'blue', textDecoration: 'underline' }} onClick={() => {

                                            }}>เงื่อนไขการร่วมกิจกรรมและของรางวัล</a>
                                        </div></Col>
                                    </Row>

                                </Card.Body>
                            </Card>
                        </Stack>

                        <div>
                            <Button style={{
                                backgroundColor: this.state.selected ? '#198654' : '#A7A7A7',
                                color: '#FFFFFF',
                                border: '0px',
                                fontSize: '24px'
                            }} onClick={() => {
                                if (this.state.selected) {
                                    this.props.onSelected()
                                }
                            }}>ยืนยันการเลือก</Button>
                        </div>
                    </Stack>
                </Modal.Body>
            </Modal>
        );
    }
}
