import React, { Component } from 'react';
import './MobileView.css';
import get from 'utils/get';
import Waypoint from 'react-waypoint';

const loadImage = url => {
  const img = new window.Image();
  img.src = url;
}


export default class MobileView extends Component {
  constructor(props) {
    super(...arguments);
    this.state = { image: props.content.fields.images[0] }
  }

  componentWillMount() {
    loadImage(this.state.image);
    get(this, 'props.content.fields.studies', []).forEach(study => loadImage(study.fields.images[0]));
  }

  itemDidEnter = (waypoint, image) => {
    this.setState({ image });
  }

  render() {
    const currentImage = this.props.content.fields.images[0];

    return (
      <div className="MobileView">
        <nav className="MobileNav">
          <h1>Babyface</h1>
        </nav>
        <div className="NameScroll">
          <Waypoint key={'_HOME'} onEnter={wp => this.itemDidEnter(wp, currentImage)} topOffset={"50%"}>
            <div className="Item">{""}</div>
          </Waypoint>
          {
            get(this, 'props.content.fields.studies', []).map(study =>
              <Waypoint key={study.fields.slug} onEnter={wp => this.itemDidEnter(wp, study.fields.images[0])} topOffset={"50%"}>
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
};

