import * as React from 'react';
import { Image } from 'react-bootstrap';
import { UserHistoryData } from '../../model/UserData';

export interface IRoundComponentProps {
    index: number,
    data: UserHistoryData
}

export default class RoundComponent extends React.Component<IRoundComponentProps> {

    constructor(props: IRoundComponentProps) {
        super(props)
        console.log('sssss')
    }

    public render() {
        return (
            <div style={{ display: 'block', justifyContent: 'space-around' }}>
                <a style={{
                    fontSize: '32px',
                    color: '#6C6C6C',
                    paddingRight: '16px'
                }}>
                    ครั้งที่ {this.props.index}
                </a>

                <a style={{
                    fontSize: '32px',
                    color: (this.props.data.couponTypeID || -1) >= 0 ? '#6C6C6C' : '#ACACAC'
                }}>
                    {this.props.data.detail}
                </a>

                {
                    (this.props.data.couponTypeID || -1) >= 0 ? <Image style={{ height: '40px', marginTop: '4px', float: 'right' }} src={'bt-coppy.svg'} onClick={() => {

                    }} /> : ''
                }

            </div>
        );
    }
}
