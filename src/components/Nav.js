import React, { Component } from 'react';
import './Nav.css';

export default class Nav extends Component {
  render() {
    return (
      <div className="Nav">
        <div className="Logo" ref={this.props.logoWrapperRef}>
          <h1>Babyface</h1>
        </div>
        <div className="Blurb">
          <h2 className="BlurbText">A creative studio building experience for URL & IRL.</h2>
        </div>
        <div className="Links">
          <h2>Case Studies</h2>
          <h2>About</h2>
        </div>
      </div>
    );
  }
}
