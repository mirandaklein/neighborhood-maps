import React, { Component } from 'react';
import './App.css';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './components/Map.js';
import ListContainer from './components/ListContainer.js';



class App extends Component {
  constructor(){
    super();
    const locations= [
      {title: 'Barleys', location: {lat: 35.9709, lng: -83.9173}},
      {title: 'Preservation Pub', location: {lat: 35.9657, lng: -83.9196}},
      {title: 'Downtown Grill and Brewery', location: {lat: 35.9657, lng:-83.9181}},
      {title: 'Sutrees', location: {lat: 35.9660, lng: -83.9189}},
      {title: 'Urban Bar', location: {lat: 35.9707, lng: -83.9187}},
    ]

    this.state = {
      locations: locations,
    }
  }
    
   
  
  
  render() {
    let locations = this.state.locations;
  

    if (!this.props.loaded){
      return <div>Loading...</div>
    }
      return (
      <div className="container">
          <Map
            google={this.props.google}
            zoom={15}
            initialCenter={
               {
                  lat: 35.9691,
                  lng: -83.9185
                }
             }
            locations={locations}
          >
          </Map>
          <ListContainer
            locations= {locations}
            filter= {this.state.filter}
          />
        
        </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAsOPxWLU4htpMUFxdOvFBRzmA4xVeNjbw'
})(App)


