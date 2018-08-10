import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

export default class ListContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            'locations': []
        }

    }
   

  

    render(){
        let showingLocations
        if (this.props.query){
            const match= new RegExp(escapeRegExp(this.props.query), 'i')
            showingLocations = this.props.locations.filter((location) => match.test(location.title))
        } else {
            showingLocations = this.props.locations
        }
        showingLocations.sort(sortBy('title'))
        console.log(showingLocations);

        return(
            <div className="list-container">
                <h1>KNOXVILLE BARS</h1>
                    <form>
                         <input 
                            type="text" 
                            className="myInput"  
                            placeholder="Search.."
                            value={this.props.query}
                            onChange={this.props.onChange}
                            />
                     </form>
                <ul className='locations-list'>
                    {showingLocations.map((location)=> (
                        <li key={location.title} className='locations-list-item'>
                        <p>{location.title}</p>
                        </li>
                    ))}
                </ul>
             </div>
        )
    }
}