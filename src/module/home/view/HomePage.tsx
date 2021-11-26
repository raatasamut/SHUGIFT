import * as React from 'react';
import { Row, Image, Button, Col, Container, Table } from 'react-bootstrap';
import RequestLogModel from '../../main/model/LoginRequestModel'

export interface IHomePageProps {
    logoutCallback: () => void
}


export interface IHomePageState {
    containerWidth: number
}

export default class HomePage extends React.Component<IHomePageProps, IHomePageState> {

    constructor(props: IHomePageProps) {
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

        return (
            <div>
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
                <div style={{
                    fontSize: '18px',
                    textAlign: 'center',
                    color: '#6C6C6C'
                }}>
                    SHU GLOBAL LUCKY DRAW
                </div>

                <Row className="justify-content-center">
                    <Image style={{ width: '240px', marginBottom: '16px', marginTop: '16px' }} src={'ic-section.svg'} />
                </Row>


            </>
        )
    }

    largeScreen() {
        return (
            <>

            </>
        )
    }
}
