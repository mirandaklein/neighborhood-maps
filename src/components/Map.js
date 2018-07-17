import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';

export default class Map extends Component {
    constructor(props) {
        super(props);
    
        const {lat, lng} = this.props.initialCenter;
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


  loadMap() {
    if (this.props && this.props.google) { // checks to make sure that props have been passed
      const {google} = this.props; // sets props equal to google
      const maps = google.maps; // sets maps to google maps props

      const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below.
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

      let {intialCenter,zoom}= this.props;
      const {lat, lng} = this.state.currentLocation;
      const center= new maps.LatLng(lat,lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })


    let markers = [];

    this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.

    let locations= [
      {title: 'Barleys', location: {lat: 35.9709, lng: -83.9173}},
      {title: 'Preservation Pub', location: {lat: 35.9657, lng: -83.9196}},
      {title: 'Downtown Grill and Brewery', location: {lat: 35.9657, lng:-83.9181}},
      {title: 'Sutrees', location: {lat: 35.9660, lng: -83.9189}},
      {title: 'Urban Bar', location: {lat: 35.9707, lng: -83.9187}},
    ];


    //Markers
    for (let i = 0; i < locations.length; i++){
      let position = locations[i].location;
      let title = locations[i].title;
    let marker = new google.maps.Marker({
      position: position,
      title: title,
      map: this.map,
      id: i
    });
    markers.push(marker)
  }

    //Info Window
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
Map.defaultProps = {
    zoom: 15,
    // Knoxville, TN, by default
    initialCenter: {
      lat: 35.9691,
      lng: -83.9185
    }
}