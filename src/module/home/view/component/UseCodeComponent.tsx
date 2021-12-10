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
        <Image style={{ width: this.props.isSmall ? '10px ': '12px', marginRight: this.props.isSmall ? '3px ': '6px', verticalAlign: '0px' }} src={this.props.imageName + '.svg'} />

        <a style={{
          fontSize: this.props.isSmall ? '14px ': '18px',
          color: '#6C6C6C'
        }}>
          {this.props.title}
        </a>

        <Button variant="light" className='rounded-sm-border' size='sm' style={{ height: this.props.isSmall ? '14px ': '18px', marginTop: this.props.isSmall ? '2px ': '3px', paddingLeft: '5px', paddingRight: '8px', paddingTop: '0px',float: 'right', fontSize: this.props.isSmall ? '10px ': '12px' }} onClick={this.props.onclick}>คลิกที่นี่</Button>

      </div>
    );
  }
}
