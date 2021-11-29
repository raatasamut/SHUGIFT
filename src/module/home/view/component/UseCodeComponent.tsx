import * as React from 'react';
import { Button, Image } from 'react-bootstrap';

export interface IUseCodeComponentProps {
  isSmall: boolean,
  imageName: string,
  title: string,
  onclick: () => void
}

export default class UseCodeComponent extends React.Component<IUseCodeComponentProps> {
  public render() {
    return (
      <div style={{ display: 'block', justifyContent: 'space-around' }}>
        <Image style={{ width: this.props.isSmall ? '10px ': '14px', marginRight: this.props.isSmall ? '5px ': '8px', verticalAlign: '0px' }} src={this.props.imageName + '.svg'} />

        <a style={{
          fontSize: this.props.isSmall ? '18px ': '22px',
          color: '#6C6C6C'
        }}>
          {this.props.title}
        </a>

        <Button variant="light" className='rounded-sm-border' size='sm' style={{ height: this.props.isSmall ? '20px ': '22px', marginTop: this.props.isSmall ? '2px ': '4px', paddingLeft: '10px', paddingRight: '10px', paddingTop: '0px',float: 'right' }} onClick={this.props.onclick}>คลิกที่นี่</Button>

      </div>
    );
  }
}
