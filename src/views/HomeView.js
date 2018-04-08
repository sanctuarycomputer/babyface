import React, { Component } from 'react';
import "./HomeView.css";
import ImageSet from 'components/ImageSet';
import get from 'utils/get';

export default class HomeView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>

    return (
      <div className="HomeView ImageGallery">
        <ImageSet images={get(model, 'fields.images', [])} />
      </div>
    );
  }
}
