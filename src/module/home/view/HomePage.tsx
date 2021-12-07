import * as React from 'react';
import { Row, Image, Container, Col, Button } from 'react-bootstrap';
import { WheelData } from '../../../game/wheel/components/Wheel/types';
import { WheelComponent } from '../../../game/wheel/components/Wheel/WheelComponent';
import User from '../../authentication/User';
import { MCouponType } from '../model/MCouponType';
import { UserData, UserHistoryData } from '../model/UserData';
import HomeViewModel from '../viewmodel/HomeViewModel';
import GettingCoupon from './component/GettingCoupon';
import HowToUseCode from './component/HowToUseCode';
import RoundComponent from './component/RoundComponent';
import SelectedComponent from './component/SelectedComponent';
import SelectorComponent, { USEVIA } from './component/SelectorComponent';
import UseCodeComponent from './component/UseCodeComponent';

export interface IHomePageProps {
    logoutCallback: () => void,
    alertCallback: (status: number, msg: string) => void
}

export interface IHomePageState {
    listMCouponType: Array<MCouponType>,
    winData: UserHistoryData,
    data?: UserData,
    containerWidth: number,
    prizeNumber: number,
    spin: boolean,
    showSelector: boolean,
    showSelected: boolean,
    showPrize: boolean,
    showHowToUseCode: boolean,
    forType: USEVIA,
    position: number,
    maxPosition: number,
    endEvent: boolean
}

export default class HomePage extends React.Component<IHomePageProps, IHomePageState> {

    viewModel?: HomeViewModel
    spining: boolean = false

    spinRef: React.RefObject<HTMLDivElement>;
    historyRef: React.RefObject<HTMLDivElement>;

    constructor(props: IHomePageProps) {
        super(props)
        this.spinRef = React.createRef();
        this.historyRef = React.createRef();
        this.state = {
            listMCouponType: [],
            showSelector: false,
            showSelected: false,
            showPrize: false,
            showHowToUseCode: false,
            forType: USEVIA.NONE,
            position: -1,
            maxPosition: 0,
            winData: new UserHistoryData(-1, ''),
            data: undefined,
            containerWidth: window.innerWidth,
            prizeNumber: 0,
            spin: false,
            endEvent: false
        }

        this.viewModel = new HomeViewModel()
        this.viewModel.loadMCouponType((list?: Array<MCouponType>) => {
            this.setState({
                listMCouponType: list || []
            })
            this.loadUserData()
        }, (status, msg) => {
            this.props.alertCallback(status, msg)
        })
    }

    loadUserData() {
        this.viewModel?.loadUserData((data?: UserData) => {
            console.log('loadUserData')
            if (data) {

                if (data.isEventEnd()) {
                    this.setState({
                        endEvent: true
                    })
                } else {

                    let max = data.couponPerUser || 0

                    if ((data.history?.length || 0) <= 0 || undefined) {
                        data.history = new Array<UserHistoryData>()
                    }

                    let addCount = max - (data.history?.length || 0)

                    for (let i = 0; i < addCount; i++) {
                        data.history?.push(new UserHistoryData(-1, 'รอการสุ่ม'))
                    }

                    console.log('Validated coupon')
                    console.log(data)

                    let useingVia = USEVIA.NONE
                    if (data.usingAdminChannel !== null) {
                        useingVia = data.usingAdminChannel ? USEVIA.ADMIN : USEVIA.USER
                    }

                    this.setState({
                        maxPosition: max,
                        data: data
                    })
                    // this.setState({
                    //     forType: useingVia,
                    //     maxPosition: max,
                    //     data: data
                    // })
                }

            } else {

            }
        }, (status, msg) => {
            this.props.alertCallback(status, msg)
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
        this.setState({
            showHowToUseCode: true
        })
    }

    useCodeViaAdmin = () => {
        this.setState({
            showHowToUseCode: true
        })
    }

    public render() {
        return (
            <div>
                {
                    this.state.endEvent ?
                        <div>
                            <Row className="justify-content-center" style={{ fontSize: '34px', textAlign: 'center', color: '#6C6C6C' }}>
                                กิจกรรมจบลงแล้ว
                            </Row>

                            <Row className="justify-content-center">
                                <Image style={{ width: '240px', marginBottom: '16px', marginTop: '16px' }} src={'ic-section.svg'} />
                            </Row>

                            <Row className="justify-content-center" style={{ fontSize: '34px', textAlign: 'center', color: '#6C6C6C', lineHeight: '1', padding: '20px' }}>
                                ทาง SHU ขอขอบคุณ ลูกค้าทุกท่าน ที่ให้ความสนใจ กิจกรรมของ SHU
                            </Row>

                            <Row className="justify-content-center" style={{ fontSize: '28px', textAlign: 'center', color: '#6C6C6C' }}>
                                ขอบคุณค่ะ/ครับ
                            </Row>
                        </div>
                        :
                        <div>
                            <SelectorComponent show={this.state.showSelector} onSelected={(forType: USEVIA) => {
                                this.viewModel?.updateCouponChannel(forType === USEVIA.ADMIN, () => {
                                    this.setState({
                                        forType: forType,
                                        showSelector: false,
                                        showSelected: true
                                    })
                                }, () => {
                                    this.setState({
                                        showSelector: false,
                                    })
                                })
                            }} onCancel={() => {
                                this.setState({
                                    showSelector: false
                                })
                            }} />
                            <SelectedComponent show={this.state.showSelected}
                                forType={this.state.forType}
                                onStart={() => {
                                    this.setState({
                                        showSelected: false
                                    })
                                    this.startSpin()
                                }} onCancel={() => {
                                    this.setState({
                                        showSelected: false
                                    })
                                }} />
                            <GettingCoupon
                                show={this.state.showPrize}
                                position={this.state.position}
                                winData={this.state.winData}
                                onCancel={() => {
                                    this.setState({
                                        showPrize: false
                                    })
                                }} />
                            <HowToUseCode show={this.state.showHowToUseCode}
                                forType={this.state.forType}
                                onCancel={() => {
                                    this.setState({
                                        showHowToUseCode: false
                                    })
                                }} />
                            {
                                this.state.containerWidth < 990 ?
                                    this.smallScreen() :
                                    this.largeScreen()
                            }

                        </div >
                }
            </div>
        );
    }

    startSpin() {
        if (this.state.forType === USEVIA.NONE) {
            this.setState({
                showSelector: true
            })
        } else {
            if (!this.spining) {
                this.spining = true
                let position = this.state.data?.history?.findIndex(tmp => tmp.couponTypeID === -1)
                if (!position) {
                    position = 1
                }
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
                    }, (status, msg) => {
                        this.props.alertCallback(status, msg)
                    })
                }
            }
        }
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
                    ref={this.historyRef}
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

                    {
                        this.useCodeAction()
                    }

                    <div style={{
                        fontSize: '26px',
                        textAlign: 'center',
                        color: '#000000',
                        marginTop: '16px'
                    }}>
                        {
                            this.state.data?.getDayLeft()
                        }
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
                    <Image className='hover' style={{ height: '46px', float: 'right' }} src={'bt-logout.svg'} onClick={this.props.logoutCallback} />
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
                            <Image className='hover' style={{ height: '46px', float: 'right' }} src={'bt-logout.svg'} onClick={this.props.logoutCallback} />
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

                            {
                                this.useCodeAction()
                            }

                            <div style={{
                                fontSize: '18px',
                                textAlign: 'center',
                                color: '#000000',
                                marginTop: '16px'
                            }}>
                                {
                                    this.state.data?.getDayLeft()
                                }
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
            mList.push({ option: item.name || '-', style: { backgroundColor: item.bgColor, textColor: item.fontColor } })
        })
        return mList
    }

    spin() {
        console.log(this.spinRef.current?.clientWidth)
        return (
            <div>
                <div className="justify-content-center" style={{ position: 'relative' }}>
                    {
                        this.state.spin ? <></> :
                            <div className="justify-content-center" style={{
                                position: 'absolute', zIndex: 11, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Image className='hover' style={{ height: '68px', float: 'right' }} src={'ic-start.svg'} onClick={() => {
                                    this.startSpin()
                                }} />
                            </div>
                    }
                    {
                        this.state.data?.history?.findIndex(tmp => tmp.couponTypeID === -1) !== -1 ? <></> :
                            <div className="justify-content-center" style={{
                                position: 'absolute', zIndex: 11, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'
                            }}>
                                <div className='rounded-border' style={{
                                    backgroundColor: '#F4FFF4', color: '#00893F', fontSize: '30px', paddingLeft: '30px', paddingRight: '30px', textAlign: 'center'
                                }}>
                                    ลุ้นสิทธิครบแล้ว
                                </div>
                            </div>
                    }

                    <WheelComponent
                        radiusLineWidth={0}
                        spinWidth={260}
                        mustStartSpinning={this.state.spin}
                        prizeNumber={this.state.listMCouponType.findIndex(tmp => tmp.uniqueID == this.state.winData.couponTypeID)}
                        data={this.getMList()}
                        onStopSpinning={() => {
                            this.spining = false
                            if (this.state.data?.history != null) {
                                let position = this.state.data?.history?.findIndex(tmp => tmp.couponTypeID === -1)
                                this.state.data.history[position] = this.state.winData

                                if (position >= 2) {
                                    this.historyRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                }

                                this.setState({
                                    data: this.state.data,
                                    spin: false,
                                    showPrize: true,
                                    position: position
                                })
                            }
                        }}
                        backgroundColors={['#3e3e3e', '#df3428']}
                        textColors={['#ffffff']} />
                </div>

                <div style={{
                    fontSize: '22px',
                    textAlign: 'center',
                    color: '#6C6C6C',
                    paddingTop: '10px'
                }}>กดปุ่ม START เพื่อเริ่มเล่น
                </div>
            </div>
        )
    }

    useCodeAction() {
        return (
            this.state.data?.history?.find(tmp => tmp.couponTypeID !== -1) ?
                <>
                    {this.state.forType === USEVIA.ADMIN ?
                        <>
                            <div style={{
                                fontSize: '26px',
                                textAlign: 'center',
                                color: '#000000',
                                paddingTop: '10px'
                            }}>
                                การใช้งาน : ทำการ “คัดลอกโค้ด” และกดที่ “แจ้งแอดมิน” เพื่อใช้คูปอง
                            </div>
                            <Row className="justify-content-center" style={{ paddingTop: '4px' }}>
                                <Button variant="secondary" style={{ maxWidth: '130px', maxHeight: '44px', backgroundColor: '#535353' }} size="lg" onClick={() => {
                                    window.open('https://www.facebook.com/www.shu.global', "_blank")
                                }}>
                                    แจ้งแอดมิน SHU
                                </Button>
                            </Row>
                            <UseCodeComponent isSmall={false} imageName='ic-use-code-admin' title='แจ้งโค้ดและสั่งซื้อกับแอดมิน' onclick={this.useCodeViaAdmin} />
                        </>
                        :
                        <>
                            <div style={{
                                fontSize: '26px',
                                textAlign: 'center',
                                color: '#000000',
                                paddingTop: '10px'
                            }}>
                                การใช้งาน : ทำการ “คัดลอกโค้ด” และกดที่ “เปิดเว็บไซร์” เพื่อใช้คูปอง
                            </div>
                            <Row className="justify-content-center" style={{ paddingTop: '4px' }}>
                                <Button variant="secondary" style={{ maxWidth: '130px', maxHeight: '44px', backgroundColor: '#535353' }} size="lg" onClick={() => {
                                    window.open('https://www.shu.global', "_blank")
                                }}>
                                    เปิดเว็บไซร์ SHU
                                </Button>
                            </Row>
                            <UseCodeComponent isSmall={false} imageName='ic-use-code-web' title='ใช้โค้ดสั่งซื้อสินค้าบนเว็บไซร์' onclick={this.useCodeViaWeb} />
                        </>}
                </> :
                <>GONE</>
        )
    }
}