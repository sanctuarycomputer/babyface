import React, { Component } from 'react';
import "./HomeView.css";

export default class HomeView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>

    return (
      <div className="HomeView">
        <img
          className="Image"
          src="http://localhost:3000/assets/Japan-5138.jpg"
        />
        <img
          className="Image2"
          src="http://localhost:3000/assets/Japan-5138.jpg"
        />
        <img
          className="Image"
          src="http://localhost:3000/assets/Japan-5138.jpg"
        />
        <img
          className="Image"
          src="http://localhost:3000/assets/Japan-5138.jpg"
        />
        <img
          className="Image2"
          src="http://localhost:3000/assets/Japan-5138.jpg"
        />
        <img
          className="Image"
          src="http://localhost:3000/assets/Japan-5138.jpg"
        />
      </div>
    );
  }
}
