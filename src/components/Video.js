import React, { Component } from 'react';
import './Video.css';

export default class Image extends Component {
  render() {
    const { src } = this.props;
    let className = 'Video';

    return (
      <video className={className} muted autoPlay loop playsInline>
        <source src={src} type="video/mp4" />
      </video>
    )
  }
};

