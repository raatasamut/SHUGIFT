import * as React from 'react';
import { Row, Image, Container, Button } from 'react-bootstrap';
import { WheelData } from '../../../game/wheel/components/Wheel/types';
import { WheelComponent } from '../../../game/wheel/components/Wheel/WheelComponent';
import User from '../../authentication/User';
import { MCouponType } from '../model/MCouponType';
import { UserData, UserHistoryData } from '../model/UserData';
import HomeViewModel from '../viewmodel/HomeViewModel';
import RoundComponent from './component/RoundComponent';
import UseCodeComponent from './component/UseCodeComponent';

export interface IHomePageProps {
    logoutCallback: () => void
}

export interface IHomePageState {
    listMCouponType: Array<MCouponType>,
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
                    {this.state.data?.campaign || '-'}
                </div>

                <div style={{
                    fontSize: '24px',
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
                    fontSize: '30px',
                    textAlign: 'center',
                    color: '#6C6C6C'
                }}>
                    {
                        this.state.data?.getDuration()
                    }
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

                <UseCodeComponent imageName='ic-use-code-web' title='ใช้โค้ดสั่งซื้อสินค้าบนเว็บไซร์' onclick={() => {

                }} />

                <UseCodeComponent imageName='ic-use-code-admin' title='แจ้งโค้ดและสั่งซื้อกับแอดมิน' onclick={() => {

                }} />

                <div ref={this.spinRef} style={{ paddingTop: '20px', paddingBottom: '20px' }}>
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
                            <RoundComponent index={i + 1} data={item} />
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
                    คูปองหมดอายุวันที่ 10 มกราคม 2565
                </div>

                <Row className="justify-content-center" style={{ paddingTop: '12px' }}>
                    <Image style={{ height: '46px', float: 'right' }} src={'bt-logout.svg'} onClick={this.props.logoutCallback} />
                </Row>
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
            mList.push({ option: item.name || '-', style: { backgroundColor: item.bgColor } })
        })
        return mList
    }

    spin() {
        console.log(this.spinRef.current?.clientWidth)
        return (
            <div className="justify-content-center" onClick={() => {
                this.setState({
                    spin: true
                })
            }}>
                <WheelComponent
                    spinWidth={this.spinRef.current?.clientWidth || window.screen.width / 1.3}
                    mustStartSpinning={this.state.spin}
                    prizeNumber={this.state.prizeNumber}
                    data={this.getMList()}
                    onStopSpinning={() => {
                        this.setState({
                            spin: false
                        })
                        console.log('STOP')
                    }}
                    backgroundColors={['#3e3e3e', '#df3428']}
                    textColors={['#ffffff']} />
            </div>
        )
    }
}