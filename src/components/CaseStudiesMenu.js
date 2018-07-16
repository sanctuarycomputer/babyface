import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Store from 'state/Store';
import { toggleCaseStudiesMenu, closeCaseStudiesMenu } from 'state/actions';
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

  componentDidMount() {
    document.onkeydown = (evt) => {
      evt = evt || window.event;
      let isEscape = false;
      if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
      } else {
        isEscape = (evt.keyCode === 27);
      }
      if (isEscape && this.state.active) toggleCaseStudiesMenu()
    };
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
      <div
        key={get(image, 'sys.id')}
        style={{
          height: '90%',
          backgroundImage: `url(${get(image, 'fields.file.url')})`,
        }}
        className="KeyImageHero"
      >
        <img
          style={{
            width: `${(this.state.midSectionWidth - 100)}px`,
          }}
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          alt="fake"
        />
      </div>
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
      <div className={classes} onClick={closeCaseStudiesMenu}>
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
            <div>
              <h2>Case Studies</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

