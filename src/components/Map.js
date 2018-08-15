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
