import React, { Component } from 'react';
import './App.css';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './components/Map.js'
import ListContainer from './components/ListContainer';



class App extends Component {
  constructor(props){
    super(props);
    this.state={}
}

  render() {
    return (
      <div className="container">
          <Map
          google={this.props.google}>
         </Map>
         <ListContainer/>
        </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAsOPxWLU4htpMUFxdOvFBRzmA4xVeNjbw'
})(App)


