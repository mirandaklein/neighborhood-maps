import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

export default class Map extends Component {
  constructor(props, map, state, ignoreFirstUpdate) {
    super(props);
    const {lat, lng } = this.props.initialCenter;
    this.markers = []
    this.map =
    this.ignoreFirstUpdate = true
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      },
      infowindow: '',
    }
  }

componentDidUpdate(prevProps, prevState) {
  if (!this.ignoreFirstUpdate){
    this.updateMap();
   } else {
       this.ignoreFirstUpdate = false
   }
  
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
   let moreMatches = this.props.clickedText.match(marker.title);
   if (matches || moreMatches){
    this.populateInfoWindow(marker, this.state.infowindow, this.map);
    marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
    } else {
      marker.setAnimation(null);
    }
 });
}

updateMap() {
  this.clearMarkers();
  this.addFilteredMarkers();
}

 
filterLocations() {
  let showingLocations
  if (this.props.query || this.props.onListClick) {
    const match = new RegExp(escapeRegExp(this.props.query), 'i')
    showingLocations = this.props.locations.filter((location) => match.test(location.title))
  } else {
    showingLocations = this.props.locations
  }
  showingLocations.sort(sortBy('title'))
  return showingLocations
}

populateInfoWindow(marker, infowindow, map) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker !== marker) {
    infowindow.marker = marker;
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
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
                    // var name = location_data.name;
                     var location_data = data.response.venues[0];
                     var name = location_data.name + '<br>';
                     var address = location_data.location.address + '<br>';
                     var verified = '<b>Verified Location: </b>' + (location_data.verified ? 'Yes' : 'No') + '<br>';
                     var checkinsCount = '<b>Number of CheckIn: </b>' + location_data.stats.checkinsCount + '<br>';
                     var usersCount = '<b>Number of Users: </b>' + location_data.stats.usersCount + '<br>';
                     var tipCount = '<b>Number of Tips: </b>' + location_data.stats.tipCount + '<br>';
                     var readMore = '<a href="https://foursquare.com/v/'+ location_data.id +'" target="_blank">Read More on Foursquare Website</a>'
                     infowindow.setContent(name + address + checkinsCount + usersCount + tipCount + verified + readMore);
                 });
             }
         )
         .catch(function (err) {
                infowindow.setContent("Foursquare API has failed to load");
            });
 }

}

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
      zoom: zoom,
      styles: [
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f7f1df"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#d0e3b4"
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.medical",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#fbd3da"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#bde6ab"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffe15f"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#efd151"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "black"
                }
            ]
        },
        {
            "featureType": "transit.station.airport",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#cfb2db"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#a2daf2"
                }
            ]
        }
    ]
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

      //Info Window
      marker.addListener('click', () => {
        this.populateInfoWindow(marker, largeInfoWindow, this.map);
      });

      window.google.maps.event.addListener(this.map, 'click', function () {
        largeInfoWindow.close();
        marker.setAnimation(null);
      });

      bounds.extend(marker.position);
    }

    this.map.fitBounds(bounds);
    
      // Info Window
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