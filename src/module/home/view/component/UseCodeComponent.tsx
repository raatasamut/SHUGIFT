import * as React from 'react';
import { Image } from 'react-bootstrap';

export interface IUseCodeComponentProps {
  imageName: string,
  title: string,
  onclick: () => void
}

export default class UseCodeComponent extends React.Component<IUseCodeComponentProps> {
  public render() {
    return (
      <div style={{ display: 'block', justifyContent: 'space-around' }}>
        <Image style={{ width: '16px', marginRight: '8px' }} src={this.props.imageName + '.svg'} />

        <a style={{
          fontSize: '24px',
          color: '#6C6C6C',
          paddingTop: '12px'
        }}>
          {this.props.title}
        </a>

        <Image style={{ height: '36px', float: 'right' }} src={'bt-click.svg'} onClick={this.props.onclick} />
      </div>
    );
  }
}
