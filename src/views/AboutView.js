import React, { Component } from 'react';
import "./AboutView.css";
import get from 'utils/get';
import Markdown from 'react-markdown';

export default class AboutView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>

    return (
      <div className="AboutView">
        <Markdown source={get(model, 'fields.copy', '')} />
      </div>
    );
  }
}
