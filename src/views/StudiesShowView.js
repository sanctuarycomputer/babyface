import React, { Component } from 'react';
import "./StudiesShowView.css";
import ImageSet from 'components/ImageSet';
import get from 'utils/get';
import Markdown from 'react-markdown';

export default class StudiesShowView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>

    return (
      <div className="StudiesShowView ImageGallery">
        <ImageSet images={get(model, 'fields.images', [])} />
        <Markdown source={get(model, 'fields.credits', '')} />
      </div>
    );
  }
}
