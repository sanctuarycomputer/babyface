import React, { Component } from 'react';
import './ImageSet.css';
import Image from 'components/Image';
import get from 'utils/get';
import Store from 'state/Store';

export default class ImageSet extends Component {
  componentDidMount() {
    Store.subscribe(() => this.syncSizes());
    this.syncSizes();
  }

  syncSizes = () => {
    this.heroImageRef.style.width = `${Store.getState().midSectionWidth - 100}px`;
  }

  render() {
    return (get(this, 'props.images', [])).map((image, index) => {

      if (!index) {
        return (
          <img
            key={index}
            src={get(image, 'fields.file.url')}
            alt={get(image, 'fields.file.fileName', 'Image')}
            ref={r => this.heroImageRef = r}
            className="ImageHero"
          />
        );
      }

      const styles = {};
      get(image, 'fields.description', '').split(';').forEach(pair => {
        let splat = pair.split(':');
        if (splat.length !== 2) return;
        styles[splat[0].trim()] = splat[1].trim();
      });

      return (
        <div className="ImageWrapper" key={index} style={styles}>
          <Image
            src={get(image, 'fields.file.url')}
            alt={get(image, 'fields.file.fileName', 'Image')}
          />
        </div>
      );
    });
  }
}
