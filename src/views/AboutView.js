import React, { Component } from 'react';
import "./AboutView.css";
import get from 'utils/get';
import Markdown from 'react-markdown';
import MediaQuery from 'react-responsive';

const renderLinks = (studies, onMouseEnter, onMouseLeave) => {
  return (studies || []).map((study, index) => {
    return (
      <div
        key={index}
        className="StudyLink"
        onMouseEnter={() => onMouseEnter(study)}
        onMouseLeave={onMouseLeave}
      >
        <h3 className="Descriptor">{get(study, 'fields.name')}</h3>
        <h3 className="CityDescriptor">{get(study, 'fields.city')}</h3>
        <h3 className="RoleDescriptor">{get(study, 'fields.role')}</h3>
        <h3 className="DateDescriptor">{get(study, 'fields.date')}</h3>
      </div>
    );
  });
}

export default class AboutView extends Component {
  constructor() {
    super(...arguments);
    this.state = { hovered: null };
  }

  mouseEnterStudy = study => this.setState({ hovered: study });
  mouseLeaveStudy = () => this.setState({ hovered: null });

  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>

    const { hovered } = this.state;

    return (
      <div className="AboutView">
        <MediaQuery query="(max-device-width: 800px)">
          <h1>Hi</h1>
          <Markdown source={get(model.aboutPage, 'fields.copy', '')} />
        </MediaQuery>

        <MediaQuery query="(min-device-width: 800px)">
          { hovered ? (
            <div
              style={{backgroundImage: `url(${get(hovered.fields.image, 'fields.file.url')})`}}
              className="AboutKeyImageHero"
            />
          ) : null }
          {renderLinks(model.aboutPage.fields.projects, this.mouseEnterStudy, this.mouseLeaveStudy)}
        </MediaQuery>
      </div>
    );
  }
}
