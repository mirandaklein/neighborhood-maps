import React, { Component } from 'react';
import './App.css';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './components/Map.js'

class App extends Component {
  render() {
    const style={
      width: '100vw',
      height: '100vw'
    }
    return (
      <div style={style} className="container">
          <Map
          google={this.props.google}
          />
        </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAsOPxWLU4htpMUFxdOvFBRzmA4xVeNjbw'
})(App)


