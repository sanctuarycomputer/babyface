import React, { Component } from 'react';
import './ImageSet.css';
import Image from 'components/Image';
import get from 'utils/get';
import Store from 'state/Store';

export default class ImageSet extends Component {
  constructor() {
    super(...arguments);

    const { midSectionWidth } = Store.getState();
    this.state = { midSectionWidth, hidden: true };

    this.unsubscribe = Store.subscribe(() => {
      const { midSectionWidth } = Store.getState();
      this.setState({ midSectionWidth });
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ hidden: false });
    }, 300);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    let imageWrapperClasses = "ImageWrapper";
    if (this.state.hidden) imageWrapperClasses = `${imageWrapperClasses} hidden`;

    return (get(this, 'props.images', [])).map((image, index) => {
      if (!index) {
        return (
          <div
            key={get(image, 'sys.id')}
            style={{
              height: '90%',
              backgroundImage: `url(${get(image, 'fields.file.url')})`,
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

        return (
          <img
            key={get(image, 'sys.id')}
            src={get(image, 'fields.file.url')}
            alt={get(image, 'fields.file.fileName', 'Image')}
            style={{ width: `${(this.state.midSectionWidth - 100)}px` }}
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
