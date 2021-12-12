import { Button, Modal, Image, Stack, Card } from 'react-bootstrap';
import * as React from 'react';

export interface ISelectorComponentProps {
    show: boolean,
    onSelected: (forType: USEVIA) => void
    onCancel: () => void
}

export interface ISelectorComponentState {
    forType: USEVIA
}

export enum USEVIA {
    NONE = 'NONE', USER = 'USER', ADMIN = 'ADMIN'
}

export default class SelectorComponent extends React.Component<ISelectorComponentProps, ISelectorComponentState> {

    constructor(props: ISelectorComponentProps) {
        super(props)

        this.state = {
            forType: USEVIA.NONE
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
                        เลือกช่องทางที่คุณต้องการใช้คูปอง
                        <Image style={{ height: '18px', float: 'right' }} src={'ic-cancel.svg'} onClick={()=>{
                            this.setState({
                                forType: USEVIA.NONE
                            })
                            this.props.onCancel()
                        }} />
                    </div>

                    <Stack style={{
                        textAlign: 'center',
                        fontSize: '20px',
                        backgroundColor: '#F7F7F7',
                        padding: '12px 12px 24px 12px'
                    }}>
                        คุณสามารถเลือกช่องทางการใช้คูปองแค่ครั้งแรกเท่านั้น

                        <Stack gap={2} style={{ padding: '12px', textAlign: 'left', color: '#6C6C6C' }}>
                            <Card>
                                <Card.Body onClick={() => {
                                    this.setState({ forType: USEVIA.USER })
                                }}>
                                    <input type='radio' checked={this.state.forType === USEVIA.USER} onChange={()=>{}}/>
                                    <Image style={{ height: '18px', paddingLeft: '10px', paddingRight: '10px', marginTop: '-4px' }} src={'ic-use-code-web.svg'} />
                                    ใช้โค้ดสั่งซื้อสินค้าบนเว็บไซต์
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body onClick={() => {
                                    this.setState({ forType: USEVIA.ADMIN })
                                }}>
                                    <input type='radio' checked={this.state.forType === USEVIA.ADMIN} onChange={()=>{}}/>
                                    <Image style={{ height: '18px', paddingLeft: '10px', paddingRight: '10px', marginTop: '-4px' }} src={'ic-use-code-admin.svg'} />
                                    แจ้งโค้ดและสั่งซื้อกับแอดมิน
                                </Card.Body>
                            </Card>
                        </Stack>

                        <div>
                            <Button style={{
                                backgroundColor: this.state.forType === USEVIA.NONE ? '#A7A7A7' : '#198654',
                                color: '#FFFFFF',
                                border: '0px',
                                fontSize: '24px'
                            }} onClick={() => {
                                if (this.state.forType !== USEVIA.NONE) {
                                    this.props.onSelected(this.state.forType)
                                }
                            }}>ยืนยันการเลือก</Button>
                        </div>
                    </Stack>
                </Modal.Body>
            </Modal>
        );
    }
}
