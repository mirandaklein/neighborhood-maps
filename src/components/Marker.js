import React, { Component } from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

export default class Marker extends React.Component {
    componentDidUpdate(prevProps){
        if ((this.props.map !== prevProps.map) ||
        (this.props.position !== prevProps.position)) {
          this.renderMarker();
      }
    }
    renderMarker() {
      let {
        map, google, position, initialCenter
      } = this.props;
  
      let pos = position || initialCenter;
      position = new google.maps.LatLng(lat, lng);
      
      const pref = {
        map: map,
        position: position
      };
      this.marker = new google.maps.Marker(pref);
  }

    render() {
      return null;
    }
  }
  Marker.propTypes = {
    position: React.object.isRequired,
    map: React.object.isRequired
  }