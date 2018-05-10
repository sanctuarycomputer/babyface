import React, { Component } from 'react';
import './Image.css';

export default class Image extends Component {
  constructor() {
    super(...arguments);
    this.state = { loaded: false };
    this.ignoreLoad = false;
  }

  onImageLoad = () => {
    if (this.ignoreLoad) return;
    this.setState({ loaded: true });
  }

  componentDidMount() {
    const img = new window.Image();
    img.onload = this.onImageLoad;
    img.src = this.props.src;
  }

  componentWillUnmount() {
    this.ignoreLoad = true;
  }

  render() {
    const { src, alt } = this.props;
    let className = 'Image';
    if (this.state.loaded) className += ' Loaded';
    return <img src={src} alt={alt} className={className} />;
  }
};

