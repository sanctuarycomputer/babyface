import React, { Component } from 'react';
import "./StudiesView.css";
import get from 'utils/get';
import { Link } from "react-router-dom";

const renderLinks = studies => {
  return (studies || []).map((study, index) => {
    return (
      <Link to={`/studies/${get(study, 'fields.slug')}`} key={index} className="StudyLink">
        <h2 className="Descriptor">{get(study, 'fields.name')}</h2>
        <h3 className="CityDescriptor">{get(study, 'fields.city')}</h3>
        <h3 className="Descriptor">{get(study, 'fields.role')}</h3>
        <h3 className="DateDescriptor">{get(study, 'fields.date')}</h3>
      </Link>
    );
  });
}

export default class StudiesView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>

    return (
      <div className="StudiesView">
        {renderLinks(model)}
      </div>
    );
  }
}
