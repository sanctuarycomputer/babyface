import React, { Component } from 'react';
import './ImageSet.css';
import Image from 'components/Image';
import Video from 'components/Video';
import get from 'utils/get';
import Store from 'state/Store';

export default class ImageSet extends Component {
  constructor() {
    super(...arguments);
    const { midSectionWidth, keyImage } = Store.getState();
    this.state = { midSectionWidth, keyImage };
    this.unsubscribe = Store.subscribe(() => {
      const { midSectionWidth, keyImage } = Store.getState();
      this.setState({ midSectionWidth, keyImage });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    let imageWrapperClasses = "ImageWrapper";
    if (this.props.loading) imageWrapperClasses = `${imageWrapperClasses} hidden`;

    return (get(this, 'props.images', [])).map((image, index) => {
      if (!index) {
        return (
          <div
            key={get(this.state, 'keyImage.sys.id')}
            style={{
              height: '90%',
              backgroundImage: `url(${get(this.state.keyImage, 'fields.file.url')})`,
            }}
            className="ImageHero"
          >
            <img
              style={{
                width: `${(this.state.midSectionWidth - 100)}px`,
              }}
              src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            />
          </div>
        );

      }

      const styles = {};
      get(image, 'fields.description', '').split(';').forEach(pair => {
        let splat = pair.split(':');
        if (splat.length !== 2) return;
        styles[splat[0].trim()] = splat[1].trim();
      });

      if (image.fields.file.contentType === 'video/mp4') {
        return (
          <div className={imageWrapperClasses} key={index} style={styles}>
            <Video
              src={get(image, 'fields.file.url')}
              alt={get(image, 'fields.file.fileName', 'Image')}
            />
          </div>
        );
      }

      return (
        <div className={imageWrapperClasses} key={index} style={styles}>
          <Image
            src={get(image, 'fields.file.url')}
            alt={get(image, 'fields.file.fileName', 'Image')}
          />
        </div>
      );
    });
  }
}
