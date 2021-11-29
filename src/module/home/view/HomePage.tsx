import * as React from 'react';
import { Row, Image, Container, Button, Col } from 'react-bootstrap';
import { WheelData } from '../../../game/wheel/components/Wheel/types';
import { WheelComponent } from '../../../game/wheel/components/Wheel/WheelComponent';
import User from '../../authentication/User';
import { MCouponType } from '../model/MCouponType';
import { UserData, UserHistoryData } from '../model/UserData';
import HomeViewModel from '../viewmodel/HomeViewModel';
import RoundComponent from './component/RoundComponent';
import UseCodeComponent from './component/UseCodeComponent';
import { GiftData } from '../model/GiftData';

export interface IHomePageProps {
    logoutCallback: () => void
}

export interface IHomePageState {
    listMCouponType: Array<MCouponType>,
    winData: UserHistoryData,
    data?: UserData,
    containerWidth: number,
    prizeNumber: number,
    spin: boolean,
    used: number,
    total: number
}

export default class HomePage extends React.Component<IHomePageProps, IHomePageState> {

    viewModel?: HomeViewModel

    spinRef: React.RefObject<HTMLDivElement>;

    constructor(props: IHomePageProps) {
        super(props)
        this.spinRef = React.createRef();
        this.state = {
            listMCouponType: [],
            winData: new UserHistoryData(-1, ''),
            data: undefined,
            containerWidth: window.innerWidth,
            prizeNumber: 0,
            spin: false,
            used: 5000,
            total: 10000
        }

        this.viewModel = new HomeViewModel()
        this.viewModel.loadMCouponType((list?: Array<MCouponType>) => {
            this.setState({
                listMCouponType: list || []
            })
            this.loadUserData()
        }, (msg) => {

        })
    }

    loadUserData() {
        this.viewModel?.loadUserData((data?: UserData) => {
            console.log('loadUserData')
            if (data) {
                if ((data.history?.length || 0) <= 0 || undefined) {
                    data.history = new Array<UserHistoryData>()
                }

                let addCount = 3 - (data.history?.length || 3)

                for (let i = 0; i < addCount; i++) {
                    data.history?.push(new UserHistoryData(-1, 'รอการสุ่ม'))
                }

                console.log('Validated coupon')
                console.log(data)

                this.setState({
                    data: data
                })
            } else {

            }
        }, (msg) => {

        })
    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize)
    }

    handleResize = () => {
        console.log('Screen ' + window.innerWidth)
        this.setState({
            containerWidth: window.innerWidth
        });
    }

    useCodeViaWeb = () => {
        window.open('https://www.shu.global', "_blank")
    }

    useCodeViaAdmin = () => {
        window.open('https://www.facebook.com/www.shu.global', "_blank")
    }

    public render() {
        return (
            <div>
                {
                    this.state.containerWidth < 990 ?
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
                    fontSize: '28px',
                    textAlign: 'center',
                    color: '#000000'
                }}>
                    {this.state.data?.name || '-'}
                </div>

                <div style={{
                    fontSize: '22px',
                    textAlign: 'center',
                    color: '#6C6C6C'
                }}>
                    ยินดีต้อนรับในการล็อกอินของท่าน <a style={{
                        color: '#000000'
                    }}>{
                            User.getUser()?.user?.name || '-'
                        }</a>
                </div>

                <div style={{
                    fontSize: '26px',
                    textAlign: 'center',
                    color: '#6C6C6C'
                }}>
                    {
                        this.state.data?.getDuration()
                    }
                </div>

                <div style={{
                    fontSize: '22px',
                    color: '#000000',
                    paddingTop: '12px',
                    lineHeight: 1
                }}>
                    ท่านได้ร่วมลุ้นโค้ดแล้วจำนวน <a style={{
                        color: '#00A54C'
                    }}>3</a> ครั้งเท่านั้น ต่อ 1 LINE ID
                </div>

                <UseCodeComponent isSmall={false} imageName='ic-use-code-web' title='ใช้โค้ดสั่งซื้อสินค้าบนเว็บไซร์' onclick={this.useCodeViaWeb} />

                <UseCodeComponent isSmall={false} imageName='ic-use-code-admin' title='แจ้งโค้ดและสั่งซื้อกับแอดมิน' onclick={this.useCodeViaAdmin} />

                <div key="spiner" ref={this.spinRef} style={{ paddingTop: '20px', paddingBottom: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {
                        this.state.listMCouponType.length > 0 ?
                            this.spin() : <></>
                    }
                </div>

                <Container
                    className='rounded-border'
                    style={{
                        padding: '10px'
                    }}>

                    <div className='justify-content-center' style={{ display: 'block', textAlign: 'center', marginRight: 'auto', marginLeft: 'auto' }}>
                        <Image style={{ height: '28px', marginRight: '8px', verticalAlign: '0px', marginBottom: '-6px' }} src={'ic-gift.svg'} />

                        <a style={{
                            fontSize: '32px',
                            color: '#6C6C6C'
                        }}>
                            ประวัติของรางวัล
                        </a>
                    </div>

                    {
                        this.state.data?.history?.map((item, i) =>
                            <RoundComponent isSmall={true} key={'his' + i} index={i + 1} data={item} />
                        )
                    }

                    <div style={{
                        fontSize: '24px',
                        textAlign: 'center',
                        color: '#6C6C6C'
                    }}>
                        มีคนจับคูปองแล้ว <a style={{
                            color: '#000000'
                        }}>{this.state.used}</a>/{this.state.total} คูปอง
                    </div>

                    <div style={{
                        fontSize: '18px',
                        textAlign: 'center',
                        color: '#6C6C6C'
                    }}>
                        “ขอบคุณที่เข้าร่วมกิจกรรมของ SHU”
                    </div>
                </Container>

                <div style={{
                    fontSize: '26px',
                    textAlign: 'center',
                    color: '#000000',
                    paddingTop: '10px'
                }}>
                    {
                        'คูปองหมดอายุวันที่ ' + this.state.data?.getExpired()
                    }
                </div>

                <Row className="justify-content-center" style={{ paddingTop: '12px' }}>
                    <Image style={{ height: '46px', float: 'right' }} src={'bt-logout.svg'} onClick={this.props.logoutCallback} />
                </Row>
            </>
        )
    }

    largeScreen() {
        return (

            <Container>
                <div style={{
                    fontSize: '32px',
                    textAlign: 'center',
                    color: '#000000',
                    marginTop: '-12px'
                }}>
                    {this.state.data?.name || '-'}
                </div>

                <div style={{
                    fontSize: '28px',
                    textAlign: 'center',
                    color: '#6C6C6C',
                    marginTop: '-12px'
                }}>
                    ยินดีต้อนรับในการล็อกอินของท่าน <a style={{
                        color: '#000000'
                    }}>{
                            User.getUser()?.user?.name || '-'
                        }</a>
                </div>

                <div style={{
                    fontSize: '30px',
                    textAlign: 'center',
                    color: '#6C6C6C',
                    marginTop: '-12px'
                }}>
                    {
                        this.state.data?.getDuration()
                    }
                </div>
                <Row>
                    <Col>
                        <div style={{
                            fontSize: '20px',
                            color: '#000000',
                            paddingTop: '12px',
                            lineHeight: 1
                        }}>
                            ท่านได้ร่วมลุ้นโค้ดแล้วจำนวน <a style={{
                                color: '#00A54C'
                            }}>3</a> ครั้งเท่านั้น ต่อ 1 LINE ID
                        </div>

                        <UseCodeComponent isSmall={true} imageName='ic-use-code-web' title='ใช้โค้ดสั่งซื้อสินค้าบนเว็บไซร์' onclick={this.useCodeViaWeb} />

                        <UseCodeComponent isSmall={true} imageName='ic-use-code-admin' title='แจ้งโค้ดและสั่งซื้อกับแอดมิน' onclick={this.useCodeViaAdmin} />

                        <Row className="justify-content-center" style={{ paddingTop: '12px' }}>
                            <Image style={{ height: '46px', float: 'right' }} src={'bt-logout.svg'} onClick={this.props.logoutCallback} />
                        </Row>
                    </Col>
                    <Col>
                        <div key="spiner" ref={this.spinRef}>
                            {
                                this.state.listMCouponType.length > 0 ?
                                    this.spin() : <></>
                            }
                        </div>
                    </Col>
                    <Col>
                        <Container
                            className='rounded-border'
                            style={{
                                padding: '8px'
                            }}>

                            <div className='justify-content-center' style={{ display: 'block', textAlign: 'center', marginRight: 'auto', marginLeft: 'auto' }}>
                                <Image style={{ height: '22px', marginRight: '3px', verticalAlign: '0px', marginBottom: '-3px' }} src={'ic-gift.svg'} />

                                <a style={{
                                    fontSize: '26px',
                                    color: '#6C6C6C'
                                }}>
                                    ประวัติของรางวัล
                                </a>
                            </div>

                            {
                                this.state.data?.history?.map((item, i) =>
                                    <RoundComponent isSmall={true} key={'his' + i} index={i + 1} data={item} />
                                )
                            }

                            <div style={{
                                fontSize: '16px',
                                textAlign: 'center',
                                color: '#6C6C6C'
                            }}>
                                มีคนจับคูปองแล้ว <a style={{
                                    color: '#000000'
                                }}>{this.state.used.toLocaleString()}</a>/{this.state.total.toLocaleString()} คูปอง
                            </div>

                            <div style={{
                                fontSize: '12px',
                                textAlign: 'center',
                                color: '#6C6C6C'
                            }}>
                                “ขอบคุณที่เข้าร่วมกิจกรรมของ SHU”
                            </div>
                        </Container>

                        <div style={{
                            fontSize: '14px',
                            textAlign: 'center',
                            color: '#000000',
                            paddingTop: '10px'
                        }}>
                            {
                                'คูปองหมดอายุวันที่ ' + this.state.data?.getExpired()
                            }
                        </div>
                    </Col>
                </Row>
            </Container>

        )
    }

    getMList() {
        let mList: Array<WheelData> = []
        this.state.listMCouponType.map((item, index) => {
            mList.push({ option: item.name || '-', style: { backgroundColor: item.bgColor } })
        })
        return mList
    }

    spin() {
        console.log(this.spinRef.current?.clientWidth)
        return (
            <div className="justify-content-center" onClick={() => {

                let position = this.state.data?.history?.findIndex(tmp => tmp.couponTypeID === -1) || -1

                if (position >= 0) {

                    this.viewModel?.loadGiftData((data) => {
                        if (data) {
                            if ((data.couponTypeID || -1) >= 0) {
                                this.setState({
                                    winData: data,
                                })
                                this.setState({
                                    spin: true,
                                })
                            }
                        }
                    }, (msg) => {

                    })

                }
            }}>
                <WheelComponent
                    spinWidth={260}
                    mustStartSpinning={this.state.spin}
                    prizeNumber={this.state.listMCouponType.findIndex(tmp => tmp.uniqueID == this.state.winData.couponTypeID)}
                    data={this.getMList()}
                    onStopSpinning={() => {
                        this.setState({
                            spin: false
                        })

                        if (this.state.data?.history != null) {
                            let position = this.state.data?.history?.findIndex(tmp => tmp.couponTypeID === -1)
                            this.state.data.history[position] = this.state.winData

                            this.setState({
                                data: this.state.data
                            })
                        }

                        // this.loadUserData()
                    }}
                    backgroundColors={['#3e3e3e', '#df3428']}
                    textColors={['#ffffff']} />
            </div>
        )
    }
}