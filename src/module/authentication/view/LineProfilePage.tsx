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
            <div style={{
                fontSize: '24px',
                textAlign: 'center',
                color: '#6C6C6C'
            }}>


                <Button variant="secondary" size="lg" onClick={this.props.loginCallback}>
                    ยืนยัน
                </Button>

                <Button variant="light" onClick={this.props.logoutCallback}>LINE Logout</Button>
            </div>
        );
    }
}
