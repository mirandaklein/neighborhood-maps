import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

export default class Map extends Component {
  constructor(props, map, state) {
    super(props);
    const {lat, lng } = this.props.initialCenter;
    this.markers = '';
    this.map =
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      },
      infowindow: '',
    }
  }

componentDidUpdate(prevProps, prevState) {
  //if (prevProps.google !== this.props.google) {
  this.updateMap();
  //}
}

componentDidMount() {
  this.loadMap(); // call loadMap function to load the google map
}

clearMarkers() {
  for (let i = 0; i < this.markers.length; i++) {
    this.markers[i].setMap(null);  
  }
}

addFilteredMarkers(){
  let filteredLocations = this.filterLocations();
  let filteredMarkers = this.markers.filter(marker => 
                          filteredLocations.find(location => marker.title === location.title))
                          
 filteredMarkers.forEach(marker => {
   marker.setMap(this.map);
   let matches = marker.title.match(filteredLocations);
   if (matches){
    marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
    this.props.infowindowOpen();

    }
 });
}



updateMap() {
  this.clearMarkers();
  this.addFilteredMarkers();
}


filterLocations() {
  let showingLocations
  if (this.props.query) {
    const match = new RegExp(escapeRegExp(this.props.query), 'i')
    showingLocations = this.props.locations.filter((location) => match.test(location.title))
  } else {
    showingLocations = this.props.locations
  }
  showingLocations.sort(sortBy('title'))
  return showingLocations
}

/*populateInfoWindow(marker, infowindow, map) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker !== marker) {
    infowindow.marker = marker;
    marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
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
                    var readMore = '<a href="https://foursquare.com/v/'+ location_data.id +'" target="_blank">Read More on Foursquare Website</a>'
                    infowindow.setContent(checkinsCount + usersCount + tipCount + verified + readMore);
                });
            }
        )
        .catch(function (err) {
            infowindow.setContent("Sorry data can't be loaded");
        });
}
this.props.callbackFromParent(this.populateInfoWindow);
}
*/


// Checks that API is available & sets up map
loadMap() {
  if (this.props && this.props.google) { // checks to make sure that props have been passed
    const { google } = this.props; // sets props equal to google
    const maps = google.maps; // sets maps to google maps props

    const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
    const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

    let { zoom } = this.props;
    const { lat, lng } = this.state.currentLocation;
    const center = new maps.LatLng(lat, lng);
    const mapConfig = Object.assign({}, {
      center: center,
      zoom: zoom
    })

    this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.

    this.markers = [];
    let locations = this.filterLocations();
    let largeInfoWindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    this.setState({
      infowindow: largeInfoWindow
    });
    

    for (let i = 0; i < locations.length; i++) {
      let position = locations[i].location;
      let title = locations[i].title;
      let lat = locations[i].location.lat;
      let lng = locations[i].location.lng;

      let marker = new google.maps.Marker({
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        map: this.map,
        id: i,
        lat: lat,
        lng : lng,

      });
      

      this.markers.push(marker);
      this.props.callbackFromParent(this.markers);
       
      
      //Info Window
      marker.addListener('click', () => {
        this.props.infowindowOpen(marker, largeInfoWindow, this.map);
      });
     
      
    

      window.google.maps.event.addListener(this.map, 'click', function () {
        largeInfoWindow.close();
        marker.setAnimation(null);
      });

      bounds.extend(marker.position);
    }

      this.map.fitBounds(bounds);

}
}

  render(){
    return ( // in our return function you must return a div with ref='map' and style.
      <div ref="map" className="map-container">
        Where u @ map
      </div>   
    )
}
}

Map.propTypes = {
    google: PropTypes.object.isRequired,
    zoom: PropTypes.number.isRequired
  }
