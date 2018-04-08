import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';
import get from 'utils/get';
import Store from 'state/Store';

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
          <NavLink to="/studies">
            <h2>Case Studies</h2>
          </NavLink>
          <NavLink to="/about">
            <h2>About</h2>
          </NavLink>
        </div>
      </div>
    );
  }
}
