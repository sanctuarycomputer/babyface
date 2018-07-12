import React, { Component, Fragment } from 'react';
import "./HomeView.css";
import ImageSet from 'components/ImageSet';
import get from 'utils/get';
import MediaQuery from 'react-responsive';
import MobileView from 'components/MobileView';

export default class HomeView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>

    return (
      <Fragment>
        <MediaQuery query="(max-width: 700px)">
          <MobileView content={model} />
        </MediaQuery>

        <MediaQuery query="(min-width: 700px)">
          <div className="HomeView ImageGallery">
            <ImageSet images={get(model, 'fields.images', [])} />
          </div>
        </MediaQuery>
      </Fragment>
    );
  }
}
