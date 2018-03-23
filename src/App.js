import React, { Component } from 'react';
import HomeContainer from 'containers/HomeContainer';
import { Route } from "react-router-dom";
import Nav from 'components/Nav';

class App extends Component {
  constructor() {
    super(...arguments);
    this.logoWrapperRef = null;
    this.mainInnerRef = null;
  }

  componentDidMount() {
    this.syncMainInnerPaddingToLogoWrapper();
    window.addEventListener("resize", this.syncMainInnerPaddingToLogoWrapper);
  }

  syncMainInnerPaddingToLogoWrapper = () => {
    this.mainInnerRef.style.paddingLeft = `${this.logoWrapperRef.offsetWidth}px`;
  }

  render() {
    return (
      <div className="App">
        <section className="Main">
          <div className="MainInner" ref={r => this.mainInnerRef = r}>
            <Route path="/" component={HomeContainer} />
          </div>
        </section>
        <Nav logoWrapperRef={r => this.logoWrapperRef = r} />
      </div>
    );
  }
}

export default App;
