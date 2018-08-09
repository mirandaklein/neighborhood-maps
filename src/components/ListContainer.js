import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

export default class ListContainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            'query': '',
            'locations': []
        }

    }
   

    updateQuery = (query) => {
        this.setState({ query: query })
    }


    render(){
        let showingLocations
        if (this.state.query){
            const match= new RegExp(escapeRegExp(this.state.query), 'i')
            showingLocations = this.props.locations.filter((location) => match.test(location.title))
        } else {
            showingLocations = this.props.locations
        }
        showingLocations.sort(sortBy('title'))
        console.log(showingLocations);

        return(
            <div className="list-container">
                <h1>Knoxville Bars</h1>
                    <form>
                         <input 
                            type="text" 
                            className="myInput"  
                            placeholder="Search.."
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                            />
                     </form>
                <ul className='list-locations'>
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