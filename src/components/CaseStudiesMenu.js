import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Store from 'state/Store';
import { toggleCaseStudiesMenu } from 'state/actions';
import './CaseStudiesMenu.css';
import get from 'utils/get';

export default class CaseStudiesMenu extends Component {
  constructor() {
    super(...arguments);

    const {
      showCaseStudiesMenu,
      paddingWidth,
      midSectionWidth,
      studies,
    } = Store.getState();
    this.state = {
      active: showCaseStudiesMenu,
      paddingWidth,
      midSectionWidth,
      studies: studies.filter(study => get(study, 'fields.featured', false))
    };

    Store.subscribe(() => {
      const {
        showCaseStudiesMenu,
        paddingWidth,
        midSectionWidth,
        studies,
      } = Store.getState();
      this.setState({
        active: showCaseStudiesMenu,
        paddingWidth,
        midSectionWidth,
        studies: studies.filter(study => get(study, 'fields.featured', false))
      });
    });
  }

  renderKeyImage = () => {
    let image;
    let splat = window.location.pathname.split('/').filter(s => s.length);

    if (this.state.hovered) {
      image = this.state.hovered.fields.images[0];
    } else if (splat.length > 1) {
      let slug = splat[splat.length - 1];
      let study = (Store.getState().studies || []).find(study => study.fields.slug === slug);
      if (study) image = get(study, 'fields.images', [])[0];
    } else {
      image = get(Store.getState(), 'homePage.fields.images', [])[0];
    }

    if (!image) return null;

    return (
      <img
        src={get(image, 'fields.file.url')}
        alt={get(image, 'fields.file.fileName', 'Image')}
        className="KeyImageHero"
      />
    );
  }

  renderStudies = studies => {
    return studies.map((study, index) => {
      const onMouseEnter = () => this.setState({ hovered: study });
      const onMouseLeave = () => this.setState({ hovered: null });

      return (
        <NavLink
          to={`/studies/${study.fields.slug}`}
          key={index}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <h4>{study.fields.name}</h4>
        </NavLink>
      );
    });
  }

  render() {
    let classes = "CaseStudiesMenu";
    if (this.state.active) classes = `${classes} active`;

    return (
      <div className={classes}>
        <div className="CaseStudiesInner" style={{ paddingLeft: this.state.paddingWidth }}>
          <div className="CaseStudiesMenuImage" style={{ width: this.state.midSectionWidth }}>
            {this.renderKeyImage()}
          </div>
          <div className="CaseStudiesIndex">
            {this.renderStudies(this.state.studies)}
          </div>
        </div>

        <div className="CaseStudiesFauxNav">
          <div className="Logo"></div>
          <div className="Blurb"></div>
          <div className="Links">
            <div onClick={toggleCaseStudiesMenu}>
              <h2>Case Studies</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

