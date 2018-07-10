import React, { Component } from 'react';
import Store from 'state/Store';
import './Loader.css';

export default class Loader extends Component {
  constructor() {
    super(...arguments);
    const { consideredLoading } = Store.getState();
    this.state = { consideredLoading };
    Store.subscribe(() => {
      const { consideredLoading } = Store.getState();
      this.setState({ consideredLoading });
    });
  }

  render() {
    let classes = "Loader";
    if (!this.state.consideredLoading) classes = `${classes} loaded`;

    return <div className={classes}><span>GENDER   IS   OVER.</span></div>;
  }
};

