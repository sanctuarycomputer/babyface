import React, { Component } from 'react';
import './MobileView.css';
import get from 'utils/get';
import Waypoint from 'react-waypoint';
import { withRouter } from 'react-router-dom'

const loadImage = url => {
  const img = new window.Image();
  img.src = url;
}

export default withRouter(class MobileView extends Component {
  constructor(props) {
    super(...arguments);
    this.state = {
      image: props.content.fields.images[0],
      activeStudy: null
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
    const currentImage = this.props.content.fields.images[0];

    return (
      <div className="MobileView" onClick={this.didClick}>
        <div className="NameScroll">
          <Waypoint key={'_HOME'} onEnter={wp => this.itemDidEnter(wp)} topOffset={"50%"}>
            <div className="Item">{""}</div>
          </Waypoint>
          {
            get(this, 'props.content.fields.studies', []).map(study =>
              <Waypoint key={study.fields.slug} onEnter={wp => this.itemDidEnter(wp, study)} topOffset={"50%"}>
                <div className="Item">{study.fields.name}</div>
              </Waypoint>
            )
          }
        </div>
        <div className="ImageHolder">
          <div className="MobileImage" style={{backgroundImage: `url(${this.state.image.fields.file.url})`}}></div>
        </div>
        <nav className="MobileBottomNav">
          <h3>About</h3>
        </nav>
      </div>
    );
  }
});

