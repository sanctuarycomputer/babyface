import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';
import get from 'utils/get';
import { toggleCaseStudiesMenu } from 'state/actions';
import Constants from 'lib/Constants';
import Store from 'state/Store';

export default class Nav extends Component {
  constructor() {
    super(...arguments);
    const { nav: { blurbMode, meta } } = Store.getState();
    this.state = { blurbMode, meta };
    Store.subscribe(() => {
      const { nav: { blurbMode, meta } } = Store.getState();
      this.setState({ blurbMode, meta });
    });
  }

  renderBlurb = () => {
    switch(this.state.blurbMode) {
      case Constants.NavBlurbMode.EMAIL:
        return (
          <a href="mailto:xo@babyface.nyc" className="EmailAddress" target="_blank" rel="noopener noreferrer">
            {`xo@babyface.nyc`}
          </a>
        );
      case Constants.NavBlurbMode.DETAILS:
        return (
          <div className="DetailsSplit">
            <div>
              <h2>{get(this.state.meta, 'fields.name')}</h2>
              <a href={get(this.state.meta, 'fields.url')} target={'_blank'}>
                <h3>{get(this.state.meta, 'fields.url')}</h3>
              </a>
            </div>
            <div className={'Secondary'}>
              <h3>
                {get(this.state.meta, 'fields.role')}
              </h3>
              <h3>
                {get(this.state.meta, 'fields.date')}
              </h3>
            </div>
          </div>
        );
      case Constants.NavBlurbMode.HOME:
      default:
        return <h2 className="BlurbText">{get(this, 'props.content.fields.blurb', '')}</h2>
    }
  }

  render() {
    return (
      <div className="Nav">
        <div className="Logo" ref={this.props.logoWrapperRef}>
          <NavLink to="/">
            <h1>Babyface</h1>
          </NavLink>
        </div>
        <div className="Blurb" ref={this.props.blurbWrapperRef}>
          {this.renderBlurb()}
        </div>
        <div className="Links">
          <div onClick={toggleCaseStudiesMenu}>
            <h2 className="CaseStudiesLink">Case Studies</h2>
          </div>
          <NavLink to="/about">
            <h2>About</h2>
          </NavLink>
        </div>
      </div>
    );
  }
}
