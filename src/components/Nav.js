import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';
import get from 'utils/get';
import { toggleCaseStudiesMenu } from 'state/actions';

export default class Nav extends Component {
  render() {
    return (
      <div className="Nav">
        <div className="Logo" ref={this.props.logoWrapperRef}>
          <NavLink to="/">
            <h1>Babyface</h1>
          </NavLink>
        </div>
        <div className="Blurb" ref={this.props.blurbWrapperRef}>
          <h2 className="BlurbText">{get(this, 'props.content.fields.blurb', '')}</h2>
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
