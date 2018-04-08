import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import Nav from 'components/Nav';
import ContentfulData from 'lib/ContentfulData';

import HomeContainer from 'containers/HomeContainer';
import AboutContainer from 'containers/AboutContainer';
import StudiesContainer from 'containers/StudiesContainer';
import StudiesShowContainer from 'containers/StudiesShowContainer';

import { setMidsectionWidth } from 'state/actions';

class App extends Component {
  constructor() {
    super(...arguments);
    this.logoWrapperRef = null;
    this.mainInnerRef = null;
    this.blurbWrapperRef = null;
    this.state = { content: null };
  }

  componentWillMount() {
    ContentfulData.getEntries({
      content_type: 'homePage',
      include: 2,
    }).then(res => {
      this.setState({ content: res.items[0] });
    });
  }

  componentDidMount() {
    this.syncSizes();
    window.addEventListener("resize", this.syncSizes);
  }

  syncSizes = () => {
    this.mainInnerRef.style.paddingLeft = `${this.logoWrapperRef.offsetWidth}px`;
    setMidsectionWidth(this.blurbWrapperRef.offsetWidth);
  }

  render() {
    return (
      <div className="App">
        <section className="Main">
          <div className="MainInner" ref={r => this.mainInnerRef = r}>
            {
              this.state.content ?
              <Switch>
                <Route
                  path="/"
                  component={HomeContainer}
                  exact
                />
                <Route
                  path="/about"
                  component={AboutContainer}
                  exact
                />
                <Route
                  path="/studies"
                  component={StudiesContainer}
                  exact
                />
                <Route
                  path="/studies/:slug"
                  component={StudiesShowContainer}
                />
              </Switch> :
              null
            }
          </div>
        </section>
        <Nav
          logoWrapperRef={r => this.logoWrapperRef = r}
          blurbWrapperRef={r => this.blurbWrapperRef = r}
          content={this.state.content}
        />
      </div>
    );
  }
}

export default App;
