import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

export default class ListContainer extends Component{
    //filterLocations filters through locations to get location title and coordinates
    filterLocations() {
        let showingLocations
        if (this.props.query){
            const match= new RegExp(escapeRegExp(this.props.query), 'i')
            showingLocations = this.props.locations.filter((location) => match.test(location.title))
        } else {
            showingLocations = this.props.locations
        }
        showingLocations.sort(sortBy('title'))
        return showingLocations
        
    }

    render(){
        return(
            <div className="list-container">
                <h1>KNOXVILLE BARS</h1>
                    <form>
                         <input 
                            type="text" 
                            className="myInput"  
                            placeholder="Search.."
                            value={this.props.query}
                            onChange={this.props.onChange.bind(this)}
                            aria-labelledby="textbox" 
                            contentEditable="true"
                            />
                     </form>
                     <ul className='locations-list'>
                            {this.filterLocations().map((location)=> (
                         <li 
                            role='button' 
                            key={location.title} 
                            className='locations-list-item' 
                            tabIndex='0'
                         >
                        <p>{location.title}</p>
                        </li>
                    ))}
                </ul>
             </div>
        )
    }
}