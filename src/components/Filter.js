import React, { Component } from 'react';

class Filter extends Component{
    handleChange (event) {
        this.props.updateSearch(event.target.value);
      }
      
      render () {
        return (
          <input type="text" placeholder="Find a student" className="input-search" onChange={this.handleChange.bind(this)} value={this.props.searchText} />
        )
      }
    }

export default Filter;