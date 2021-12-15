import * as React from 'react';
import { Container, Row, Image } from 'react-bootstrap';

export interface ITermPageProps {
}
export interface ITermPageState {
  data: string
}

export default class TermPage extends React.Component<ITermPageProps, ITermPageState> {

  constructor(props: ITermPageProps) {
    super(props)

    this.state = {
      data: localStorage.getItem('term') || ''
    }
  }

  componentDidMount(){
    if(this.state.data.length < 10){
      window.open('/', "_self")
    }
  }

  public render() {
    return (
      <Container
        className='rounded-border'
        style={{
          maxWidth: '900px',
          padding: '20px',
          backgroundColor: '#F2F2F2'
        }}>

        <Container
          className='rounded-border'
          style={{
            maxWidth: '900px',
            paddingBottom: '24px',
            paddingLeft: '12px',
            paddingRight: '12px',
            backgroundColor: '#FFFFFF'
          }}>

          <Row className="justify-content-center">
            <Image style={{ width: '150px', margin: '16px' }} src='logo-shu.svg' />
          </Row>

          <div dangerouslySetInnerHTML={{__html: this.state.data}} />
        </Container>
      </Container>

    );
  }
}
