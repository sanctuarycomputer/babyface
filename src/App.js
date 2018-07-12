import React, { Component, Fragment } from 'react';
import { Switch, Route } from "react-router-dom";
import Nav from 'components/Nav';
import CaseStudiesMenu from 'components/CaseStudiesMenu';
import ContentfulData from 'lib/ContentfulData';
import { NavLink } from 'react-router-dom';

import HomeContainer from 'containers/HomeContainer';
import AboutContainer from 'containers/AboutContainer';
import StudiesContainer from 'containers/StudiesContainer';
import StudiesShowContainer from 'containers/StudiesShowContainer';

import MediaQuery from 'react-responsive';
import loadImage from 'utils/loadImage';
import get from 'utils/get';

import {
  setMidsectionWidth,
  setPaddingWidth,
  loadHome,
  loadStudies,
} from 'state/actions';

var difference = function (a, b) { return Math.abs(a - b); }

class App extends Component {
  constructor() {
    super(...arguments);
    this.logoWrapperRef = null;
    this.mainInnerRef = null;
    this.blurbWrapperRef = null;
    this.state = { content: null };

    this.prevScrollDelta = { x: 0, y: 0 };
  }

  didScroll = e => {
    const mainInner = document.querySelector(".MainInner");

    if (mainInner) {
      e.preventDefault();

      const { x, y } = this.prevScrollDelta;
      this.prevScrollDelta = { x: e.deltaX, y: e.deltaY };

      const xChange = difference(x, this.prevScrollDelta.x);
      const yChange = difference(y, this.prevScrollDelta.y);

      if (yChange > xChange) {
        var delta = e.detail ? e.detail * (-120) : e.wheelDelta;
        mainInner.scrollLeft -= (delta);
      }
    }
  }

  componentWillMount() {
    ContentfulData.getEntries({
      content_type: 'homePage',
      include: 2,
    }).then(res => {
      const homePage = res.items[0];
      this.setState({ content: homePage });
      loadStudies(homePage.fields.studies);

      get(homePage, 'fields.studies', []).map(study => {
        let url = get(
          get(study, 'fields.images', [])[0],
          'fields.file.url',
          ''
        );
        return loadImage(url);
      });

    });
    loadHome();
  }

  componentDidMount() {
    this.syncSizes();
    window.addEventListener("resize", this.syncSizes);
    window.addEventListener("wheel", this.didScroll);
  }

  syncSizes = () => {
    if (!this.mainInnerRef) return;
    if (!this.logoWrapperRef) return;
    if (!this.blurbWrapperRef) return;

    this.mainInnerRef.style.paddingLeft = `${this.logoWrapperRef.offsetWidth}px`;
    setPaddingWidth(this.logoWrapperRef.offsetWidth);
    setMidsectionWidth(this.blurbWrapperRef.offsetWidth);
  }

  renderRouter = () => {
    return (
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
      </Switch>
    );
  }

  render() {
    return (
      <Fragment>
        {
          /*<Loader />*/
        }

        <MediaQuery query="(max-width: 700px)">
          <nav className="MobileNav">
            <NavLink to="/">
              <h1>Babyface</h1>
            </NavLink>
          </nav>
          {
            this.state.content ?
            this.renderRouter() :
            null
          }
        </MediaQuery>

        <MediaQuery query="(min-width: 700px)">
          <div className="App">
            <section className="Main">
              <div className="MainInner" ref={r => this.mainInnerRef = r}>
                {
                  this.state.content ?
                  this.renderRouter() :
                  null
                }
              </div>
            </section>
            <Nav
              logoWrapperRef={r => this.logoWrapperRef = r}
              blurbWrapperRef={r => this.blurbWrapperRef = r}
              content={this.state.content}
            />
            <CaseStudiesMenu />
          </div>
        </MediaQuery>
      </Fragment>
    );
  }
}

export default App;
