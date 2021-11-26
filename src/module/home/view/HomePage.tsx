import * as React from 'react';
import { Row, Image, Container } from 'react-bootstrap';
import { WheelData } from '../../../game/wheel/components/Wheel/types';
import { WheelComponent } from '../../../game/wheel/components/Wheel/WheelComponent';
import { MCouponType } from '../model/MCouponType';
import { UserData } from '../model/UserData';
import HomeViewModel from '../viewmodel/HomeViewModel';

export interface IHomePageProps {
    logoutCallback: () => void
}

export interface IHomePageState {
    listMCouponType: Array<MCouponType>,
    data?: UserData,
    containerWidth: number,
    prizeNumber: number,
    spin: boolean
}

export default class HomePage extends React.Component<IHomePageProps, IHomePageState> {

    viewModel?: HomeViewModel

    constructor(props: IHomePageProps) {
        super(props)

        this.state = {
            listMCouponType: [],
            data: undefined,
            containerWidth: window.innerWidth,
            prizeNumber: 0,
            spin: false
        }

        this.viewModel = new HomeViewModel()
        this.viewModel.loadMCouponType((list?: Array<MCouponType>) => {
            // this.setState({
            //     listMCouponType: list || []
            // })
            // this.viewModel?.loadUserData((data?: UserData) => {
            //     console.log('loadUserData')
            //     this.setState({
            //         data: data
            //     })
            // }, (msg) => {

            // })
        }, (msg) => {

        })
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
                    {this.state.data?.name || '-'}
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
                    this.state.listMCouponType.length > 0 ?
                        this.spin() : <></>
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

    getMList() {
        let mList: Array<WheelData> = []
        this.state.listMCouponType.map((item, index) => {
            mList.push({ option: item.name || '-', style: { backgroundColor: index % 2 == 1 ? 'green' : 'white', textColor: 'black' } })
        })
        return mList
    }

    spin() {
        return (
            <div className="justify-content-center" onClick={() => {
                this.setState({
                    spin: true
                })
            }}>
                <WheelComponent
                    spinWidth={window.screen.width / 1.3}
                    mustStartSpinning={this.state.spin}
                    prizeNumber={this.state.prizeNumber}
                    data={this.getMList()}
                    onStopSpinning={() => {
                        this.setState({
                            spin: false
                        })
                    }}
                    backgroundColors={['#3e3e3e', '#df3428']}
                    textColors={['#ffffff']} />
            </div>
        )
    }
}