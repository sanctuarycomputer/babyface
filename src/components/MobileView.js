import React, { Component } from 'react';
import './MobileView.css';
import get from 'utils/get';
import Waypoint from 'react-waypoint';
import { withRouter } from 'react-router-dom'
import { NavLink } from 'react-router-dom';

const loadImage = url => {
  const img = new window.Image();
  img.src = url;
}

export default withRouter(class MobileView extends Component {
  constructor(props) {
    super(...arguments);
    this.state = {
      image: props.content.fields.studies[0].fields.images[0],
      activeStudy: props.content.fields.studies[0]
    }
  }

  componentWillMount() {
    loadImage(this.state.image);
    get(this, 'props.content.fields.studies', []).forEach(study => loadImage(study.fields.images[0]));
  }

  itemDidEnter = (waypoint, study) => {
    if (!study) return this.setState({ image: this.props.content.fields.images[0], activeStudy: null });
    this.setState({ image: study.fields.images[0], activeStudy: study });
  }

  didClick = (e) => {
    e.preventDefault();
    if (!this.state.activeStudy) return;
    this.props.history.push(`/studies/${this.state.activeStudy.fields.slug}`);
  }

  render() {
    return (
      <div className="MobileView" >
        <div className="NameScroll">
          <div className="Item">{""}</div>
          {
            get(this, 'props.content.fields.studies', []).map(study =>
              <div className="Item" key={study.fields.slug}>
                <Waypoint onEnter={wp => this.itemDidEnter(wp, study)}>
                  <span>{study.fields.name}</span>
                </Waypoint>
              </div>
            )
          }
        </div>
        <div className="ImageHolder" onClick={this.didClick}>
          <div className="MobileImage" style={{backgroundImage: `url(${this.state.image.fields.file.url})`}}></div>
          <div className='Description'>
            <h2>{`${this.state.activeStudy.fields.role}`}</h2>
            <h2>{`${this.state.activeStudy.fields.date}`}</h2>
          </div>
        </div>
        <NavLink to="/about">
          <nav className="MobileBottomNav">
            <h3>About</h3>
          </nav>
        </NavLink>
      </div>
    );
  }
});

