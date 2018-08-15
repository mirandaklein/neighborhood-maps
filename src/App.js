import React, { Component } from 'react';
import './App.css';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './components/Map.js';
import ListContainer from './components/ListContainer.js';



class App extends Component {
  constructor(){
    super();
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
      marker: []
    }
    
  };

  populateInfoWindow(marker, infowindow, map) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;
      marker.setAnimation(this.google.maps.Animation.BOUNCE);
      setTimeout(function () {
        marker.setAnimation(null);
      }, 1520);
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(map, marker);
      getMarkerInfo(marker);

      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function () {
            infowindow.marker = null;
            if (infowindow.marker !== marker) {
              marker.setAnimation(null);
            }
      });
    }

      function getMarkerInfo(marker) {
        var self = this;
        var clientId = "CRPNQZKLQSLFOOPWSUQS3BBYIMZS01RIR22KIGNMYP2LSHI2";
        var clientSecret = "HR2WRPIRAHBKOMJKAXAZ2CKNUDUZJMWDPX1A0THJSTCTYMR4";
        var url = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20130815&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";
        fetch(url)
          .then(
            function (response) {
              if (response.status !== 200) {
                self.state.infowindow.setContent("Sorry data can't be loaded");
                return;
              }

              // Examine the text in the response
              response.json().then(function (data) {
                var location_data = data.response.venues[0];
                var verified = '<b>Verified Location: </b>' + (location_data.verified ? 'Yes' : 'No') + '<br>';
                var checkinsCount = '<b>Number of CheckIn: </b>' + location_data.stats.checkinsCount + '<br>';
                var usersCount = '<b>Number of Users: </b>' + location_data.stats.usersCount + '<br>';
                var tipCount = '<b>Number of Tips: </b>' + location_data.stats.tipCount + '<br>';
                var readMore = '<a href="https://foursquare.com/v/' + location_data.id + '" target="_blank">Read More on Foursquare Website</a>'
                infowindow.setContent(checkinsCount + usersCount + tipCount + verified + readMore);
              });
            })
          .catch(function (err) {
            infowindow.setContent("Sorry data can't be loaded");
          });
      }
  }



myCallback = (dataFromChild) => {
  this.setState({ marker : dataFromChild })
  console.log(this.state.marker);
}


 
onClick = () =>{
  this.populateInfoWindow();
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
            onChange={(event) => this.updateQuery(event.target.value)}
            callbackFromParent = {this.myCallback}
            infowindowOpen = {this.populateInfoWindow}
          >
          </Map>
          <ListContainer
            locations={locations}
            onChange={(event) => this.updateQuery(event.target.value)}  
            query= {this.state.query} 
            onClick={(event) => this.onClick(event.target.value)}

            />    
        </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAsOPxWLU4htpMUFxdOvFBRzmA4xVeNjbw'
})(App)


