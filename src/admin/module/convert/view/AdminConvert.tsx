import * as React from 'react';
import { Row, Image, Form, Container, FormControl, InputGroup, Button } from 'react-bootstrap';
import AdminConvertViewModel from '../viewmodel/AdminConvertViewModel';

export interface IAdminConvertProps {
}

export interface IAdminConvertState {
  showWrongCode: boolean,
  input: string,
  decoded: string
}

export default class AdminConvert extends React.Component<IAdminConvertProps, IAdminConvertState> {

  viewModel?: AdminConvertViewModel

  constructor(props: IAdminConvertProps) {
    super(props)
    this.viewModel = new AdminConvertViewModel()
    this.state = {
      showWrongCode: false,
      input: '',
      decoded: ''
    }
  }

  coppyCode() {
    let txt = this.state.decoded
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
  }

  public render() {
    return (
      <div>

        <Row className="justify-content-center" style={{ fontSize: '22px', paddingTop: '12px' }}>
          Coupon Decoder
        </Row>
        <Row className="justify-content-center" style={{ fontSize: '22px' }}>
          ถอดรหัสคูปอง
        </Row>

        <Row className="justify-content-center">
          <Image style={{ width: '240px', marginBottom: '16px', marginTop: '16px' }} src={'ic-section.svg'} />
        </Row>

        <Row className="justify-content-center" style={{ fontSize: '18px', color: '#6C6C6C' }}>
          โค้ดที่ต้องการถอดรหัส
        </Row>

        <Row className="justify-content-center">
          <InputGroup style={{ maxWidth: '400px', textAlign: 'center' }} >
            <FormControl
              type="text"
              aria-describedby="basic-addon2"
              placeholder="ระบุ Username ของท่่าน"
              style={{ textAlign: 'center' }}
              onChange={(event) => {
                this.viewModel?.setInputCode(event.target.value || '')
                this.viewModel?.shouldPass((scc: boolean, code: string) => {
                  if (scc) {
                    this.setState({
                      input: this.viewModel?.inputCode || '',
                      showWrongCode: false,
                      decoded: code
                    })
                    this.coppyCode()
                  } else {
                    this.setState({
                      input: this.viewModel?.inputCode || '',
                      showWrongCode: true,
                      decoded: '-'
                    })
                  }
                })
              }}
            />
            {
              !this.state.showWrongCode && this.state.input.length > 4 ?
                <Button variant="outline-secondary" id="button-addon2" style={{ backgroundColor: '#525252', color: '#FFFFFF' }}>
                  ถอดรหัส
                </Button> : <></>
            }

          </InputGroup>
        </Row>

        {
          this.state.showWrongCode ? <>
            <Row className="justify-content-center" style={{ fontSize: '14px', color: '#AC3A3F', paddingTop: '10px' }}>
              รหัสนี้ไม่สามารถนำมาถอดรหัสได้ กรุณาแจ้งลูกค้าให้ตรวจสอบรหัสใหม่อีกครั้ง
            </Row>
          </> : <></>
        }

        <Container
          className='rounded-border'
          style={{
            maxWidth: '500px',
            padding: '16px',
            backgroundColor: '#525252',
            marginTop: '16px',
            marginBottom: '16px'
          }}>

          <Row className="justify-content-center" style={{ fontSize: '18px', color: '#FFFFFF', textAlign: 'center' }}>
            คัดลอกรหัสนี้และ<br />ใช้เมื่อต้องการเปิดออเดอร์
          </Row>

          <Row className="justify-content-center" style={{ fontSize: '16px', color: '#FFFFFF', textAlign: 'center', paddingTop: '12px' }}>
            รหัสที่ถอดรหัส : {this.state.input}
          </Row>

          <Row className="justify-content-center">
            <InputGroup style={{ maxWidth: '400px', textAlign: 'center', padding: '16px' }} >
              <FormControl
                type="text"
                aria-describedby="basic-addon3"
                placeholder="ถอดรหัสแล้ว"
                style={{ textAlign: 'center', backgroundColor: this.state.decoded.length > 2 ? '#FFFFFF' : '#E8E8E8', color: this.state.decoded.length > 2 ? '#397DF3' : '#B4B4B4', fontSize: this.state.decoded.length > 2 ? '20px' : '16px' }}
                value={this.state.decoded}
              />
              {
                this.state.decoded.length > 2 ?
                  <Button variant="outline-secondary" id="button-addon3" style={{ backgroundColor: '#397DF3', color: '#FFFFFF' }}
                    onClick={() => {
                      this.coppyCode()
                    }}>
                    คัดลอก
                  </Button> : <></>
              }

            </InputGroup>
          </Row>
        </Container>


        <Row className="justify-content-center" style={{ fontSize: '10px', color: '#AC3A3F' }}>
          ***** กรุณา “ออกจากระบบ” ทุกครั้งหลังใช้งาน *****
        </Row>
      </div>
    );
  }
}
