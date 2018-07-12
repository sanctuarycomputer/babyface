import React, { Component, Fragment } from 'react';
import "./StudiesShowView.css";
import Store from 'state/Store';
import ImageSet from 'components/ImageSet';
import get from 'utils/get';
import Markdown from 'react-markdown';
import MediaQuery from 'react-responsive';

export default class StudiesShowView extends Component {
  constructor() {
    super(...arguments);
    const { consideredLoading } = Store.getState();
    this.state = { consideredLoading };
    this.unsubscribe = Store.subscribe(() => {
      const { consideredLoading } = Store.getState();
      this.setState({ consideredLoading });
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  renderMobileImages(model) {
    return get(model, 'fields.images', []).map((image, index) => {
      if (!index) {
        return (
          <div className="ImageHolder" key="hero">
            <div className="MobileImage" style={{backgroundImage: `url(${get(image, 'fields.file.url')})`}}></div>
            <div className='Description'>
              <h2>{`${model.fields.role}`}</h2>
              <h2>{`${model.fields.date}`}</h2>
            </div>
            <h2 className='Title'>{model.fields.name}</h2>
          </div>
        );
      }

      if (image.fields.file.contentType === 'video/mp4') {
        return (
          <video muted autoPlay loop key={image.sys.id}>
            <source src={get(image, 'fields.file.url')} type="video/mp4" />
          </video>
        );
      }

      return (
        <img
          key={image.sys.id}
          src={get(image, 'fields.file.url')}
          alt={get(image, 'fields.file.fileName', 'Image')}
        />
      );
    });
  }

  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>

    return (
      <Fragment>
        <MediaQuery query="(max-width: 700px)">
          <div className={'StudiesShowView MobileImageGallery'}>
            {this.renderMobileImages(model)}
            <Markdown source={get(model, 'fields.credits', '')} />

            <a className="MobileLink" href={get(model, 'fields.url')} target={'_blank'}>
              <h3>{get(model, 'fields.url')}</h3>
            </a>

          </div>
        </MediaQuery>

        <MediaQuery query="(min-width: 700px)">
          <div className="StudiesShowView ImageGallery">
            <ImageSet images={get(model, 'fields.images', [])} loading={this.state.consideredLoading} />
            <Markdown source={get(model, 'fields.credits', '')} />
          </div>
        </MediaQuery>
      </Fragment>
    );
  }
}
