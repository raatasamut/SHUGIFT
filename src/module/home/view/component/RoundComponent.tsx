import * as React from 'react';
import { Button, Image, Modal } from 'react-bootstrap';
import { UserHistoryData } from '../../model/UserData';

export interface IRoundComponentProps {
    isSmall: boolean,
    index: number,
    data: UserHistoryData
}

export interface IRoundComponentState {
    coppied: boolean,
}


export default class RoundComponent extends React.Component<IRoundComponentProps, IRoundComponentState> {

    constructor(props: IRoundComponentProps) {
        super(props)

        this.state = {
            coppied: false
        }
    }

    public render() {
        return (
            <div style={{ display: 'block', justifyContent: 'space-around' }}>

                <Modal className="toast-modal" show={this.state.coppied} onHide={() => this.setState({ coppied: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>คัดลอกโค้ดเรียบร้อยแล้ว</Modal.Title>
                    </Modal.Header>
                </Modal>

                <a style={{
                    fontSize: this.props.isSmall ? '24px ': '26px',
                    color: '#6C6C6C',
                    paddingRight: this.props.isSmall ? '12px ': '16px'
                }}>
                    ครั้งที่ {this.props.index}
                </a>

                <a style={{
                    fontSize: this.props.isSmall ? '24px ': '26px',
                    color: (this.props.data.couponTypeID || -1) >= 0 ? '#6C6C6C' : '#ACACAC'
                }}>
                    {this.props.data.detail}
                </a>

                {
                    (this.props.data.couponTypeID || -1) >= 0 ? <Button variant="light" className='rounded-sm-border' size='sm' style={{ height: this.props.isSmall ? '26px ': '30px', marginTop: this.props.isSmall ? '2px ': '4px', fontSize: this.props.isSmall ? '16px ': '18px', paddingTop: '0px', float: 'right' }} onClick={() => {
                        let txt = this.props.data.code64 || ''
                        const el = document.createElement("textarea");
                        el.value = txt;
                        el.setAttribute("readonly", "");
                        el.style.position = "absolute";
                        el.style.left = "-9999px";
                        document.body.appendChild(el);
                        el.select();
                        el.setSelectionRange(0, 99999);
                        document.execCommand("copy");
                        document.body.removeChild(el);
                        this.setState({ coppied: true })
                    }}>คัดลอกโค้ด</Button> : ''
                }

            </div>
        );
    }
}
