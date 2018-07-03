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

      let {initialCenter, zoom}= this.props;
      const {lat, lng} = this.state.currentLocation;
      const center= new maps.LatLng(lat,lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })

    this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.
    }
  }

 
  render() {
    const style = { // MUST specify dimensions of the Google map or it will not work. Also works best when style is specified inside the render function and created as an object
      width: '75%', // 90vw basically means take up 90% of the width screen. px also works.
      height: '100%', // 75vh similarly will take up roughly 75% of the height of the screen. px also works.
      float: 'right'
    }

    return ( // in our return function you must return a div with ref='map' and style.
      <div ref="map" className="map-container" style={style}>
        Where u @ map
      </div>
    )
  }
};
Map.propTypes = {
    google: PropTypes.object.isRequired,
    zoom: PropTypes.number.isRequired,
    initialCenter: PropTypes.object.isRequired
  }
Map.defaultProps = {
    zoom: 15,
    // San Francisco, by default
    initialCenter: {
      lat: 35.9606,
      lng: -83.9207
    }
  }