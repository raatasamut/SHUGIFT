import * as React from 'react';
import { Row, Image, Button, Col, Container, Table } from 'react-bootstrap';
import RequestLogModel from '../../main/model/LoginRequestModel'
import { Type } from 'class-transformer';
import { WheelComponent } from '../../../game/wheel/components/Wheel/WheelComponent';

export interface IHomePageProps {
    logoutCallback: () => void
}


export interface IHomePageState {
    containerWidth: number,
    prizeNumber: number,
    spin: boolean
}

export default class HomePage extends React.Component<IHomePageProps, IHomePageState> {

    constructor(props: IHomePageProps) {
        super(props)

        this.state = {
            containerWidth: window.innerWidth,
            prizeNumber: 0,
            spin: false
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
                    fontSize: '24px',
                    textAlign: 'center',
                    color: '#000000'
                }}>
                    SHU GLOBAL LUCKY DRAW
                </div>

                <div style={{
                    fontSize: '24px',
                    textAlign: 'center',
                    color: '#6C6C6C'
                }}>
                    ยินดีต้อนรับในการล็อกอินของท่าน <a style={{
                        color: '#000000'
                    }}>Darin</a>
                </div>

                <div style={{
                    fontSize: '30px',
                    textAlign: 'center',
                    color: '#6C6C6C'
                }}>
                    20 - 31 ธันวาคม 2564
                </div>

                <div style={{
                    fontSize: '24px',
                    color: '#000000',
                    paddingTop: '12px',
                    lineHeight: 1
                }}>
                    ท่านได้ร่วมลุ้นโค้ดแล้วจำนวน <a style={{
                        color: '#00A54C'
                    }}>3</a> ครั้งเท่านั้น ต่อ 1 LINE ID
                </div>

                <Row className="justify-content-center">
                    <Image style={{ width: '240px', marginBottom: '16px', marginTop: '16px' }} src={'ic-section.svg'} />
                </Row>

                {
                    this.spin()
                }
            </>
        )
    }

    largeScreen() {
        return (
            <>
                {
                    this.spin()
                }
            </>
        )
    }

    spin() {
        return (
            <Container className="justify-content-center">
                <WheelComponent
                    spinWidth={window.screen.width / 1.4}
                    mustStartSpinning={this.state.spin}
                    prizeNumber={this.state.prizeNumber}
                    data={[
                        { option: '0', style: { backgroundColor: 'green', textColor: 'black' } },
                        { option: '1', style: { backgroundColor: 'white', textColor: 'black' } },
                        { option: '2', style: { backgroundColor: 'green', textColor: 'black' } },
                        { option: '3', style: { backgroundColor: 'white', textColor: 'black' } },
                        { option: '4', style: { backgroundColor: 'green', textColor: 'black' } },
                        { option: '5', style: { backgroundColor: 'white', textColor: 'black' } },
                        { option: '6', style: { backgroundColor: 'green', textColor: 'black' } },
                        { option: '7', style: { backgroundColor: 'white', textColor: 'black' } }
                    ]}
                    onStopSpinning={() => {
                        this.setState({
                            spin: false
                        })
                    }}
                    backgroundColors={['#3e3e3e', '#df3428']}
                    textColors={['#ffffff']} />

                <button onClick={() => {
                    this.setState({
                        spin: true
                    })
                }}>Start</button>
            </Container>
        )
    }
}
