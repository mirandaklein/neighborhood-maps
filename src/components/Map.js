import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

export default class Map extends Component {
  constructor(props) {
    super(props);

    const {lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    }
  }
componentDidUpdate(prevProps, prevState) {
  if (prevProps.google !== this.props.google) {
    this.loadMap();
  }
}

  componentDidMount() {
    this.loadMap(); // call loadMap function to load the google map
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
      zoom: zoom
    })

    let map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.

    let locations = this.props.locations;
    let largeInfoWindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    //Markers
    let markers = [];
    
    for (let i = 0; i < locations.length; i++) {
      let position = locations[i].location;
      let lat = locations[i].location.lat;
      let lng = locations[i].location.lng;
      let title = locations[i].title;
      let marker = new google.maps.Marker({
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        map: map,
        id: i
      });
      //Pushes each marker to array
      markers.push(marker);
      //Extends map boundaries
      bounds.extend(marker.position);
      //Info Window
      marker.addListener('click', function () {
        populateInfoWindow(this, largeInfoWindow);
      });

      locations.marker = marker;

      map.fitBounds(bounds);

    };
      // Info Window
  function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      infowindow.setContent('<div>' + marker.title + '</div>');
      infowindow.open(map, marker);
      
      
      

      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function () {
        infowindow.marker = null;
       });
     }
    }
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
