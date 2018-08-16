import React, { Component } from 'react';
import './App.css';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './components/Map.js';
import ListContainer from './components/ListContainer.js';



class App extends Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
    let locations= [
      {title: 'Barleys Taproom & Pizzeria', location: {lat: 35.9709, lng: -83.9173}},
      {title: 'Preservation Pub', location: {lat: 35.9657, lng: -83.9196}},
      {title: 'Downtown Grill and Brewery', location: {lat: 35.9657, lng:-83.9181}},
      {title: 'Sutrees High Gravity Tavern & Harrogates Lounge', location: {lat: 35.9660, lng: -83.9189}},
      {title: 'Pilot Light', location: {lat: 35.9705, lng: -83.9181}}
    ]
   
    this.state = {
      locations: locations,
      query: '',
    }
    
  };

  handleClick = () => {
    console.log('clicked');
    }
  



updateQuery = (query) => {
  this.setState({
    query: query
  })
}

//Error handling for Google Maps API
gm_authFailure() { 
  alert("Google Maps API has failed to load"); // here you define your authentication failed message
};


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
            query= {this.state.query}  
            locations={locations}
            onListClick={(event)=> this.handleClick(event.target.value)}

          >
          </Map>
          <ListContainer
            google={this.props.google}
            locations={locations}
            onChange={(event) => this.updateQuery(event.target.value)}  
            query= {this.state.query}
            onListClick = {(event)=> this.handleClick(event.target.value)}
            />    
        </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAsOPxWLU4htpMUFxdOvFBRzmA4xVeNjbw'
})(App)


