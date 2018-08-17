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
      {title: 'Clancys Tavern & Whiskey House', location: {lat: 35.9643, lng: -83.9175}},
      {title: 'Peter Kern Library', location: {lat: 35.9647, lng: -83.9197}},
      {title: 'Bar Marley', location: {lat: 35.9755, lng: -83.9245}},
      {title: 'Sassy Anns', location: {lat: 35.9800, lng: -83.9173}},
      {title: 'Alliance Brewing Co & Landing House', location: {lat: 35.9596, lng: -83.9030}},

    ]
   
    this.state = {
      locations: locations,
      query: '',
      clickedText: ''
    }
    
  };

  handleClick = (event) => {
    this.setState({
      clickedText: event.target.textContent
    })
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
            clickedText={this.state.clickedText}

          >
          </Map>
          <ListContainer
            google={this.props.google}
            locations={locations}
            onChange={(event) => this.updateQuery(event.target.value)}  
            query= {this.state.query}
            onListClick = {this.handleClick}
            />    
        </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAsOPxWLU4htpMUFxdOvFBRzmA4xVeNjbw'
})(App)


