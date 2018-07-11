import React, { Component } from 'react';
import "./StudiesShowView.css";
import Store from 'state/Store';
import ImageSet from 'components/ImageSet';
import get from 'utils/get';
import Markdown from 'react-markdown';

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

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>
    //if (this.state.consideredLoading) return null;

    return (
      <div className="StudiesShowView ImageGallery">
        <ImageSet images={get(model, 'fields.images', [])} loading={this.state.consideredLoading} />
        <Markdown source={get(model, 'fields.credits', '')} />
      </div>
    );
  }
}
