# Neighborhood Map React

A single-page web application, built using React's framework, that displays a Google Map of an area and various points of interest. Users can search all included landmarks and, when selected, additional information about a landmark is presented from the FourSquare APIs.
___
#### Features
* Click on any marker to get information from Foursquare API on given location
* Use filter list to filter locations and subsequential markers
* Click on the map to close infowindows
___
## Running project Online
Open the online demo at https://mirandaklein.github.io/neighborhood-maps/

___
## Running project in Development Mode

1. Visit https://github.com/mirandaklein/neighborhood-maps
2. Clone repository
3. Open terminal and cd into repository 
4. Install node modules with the command `npm install`
5. Use the command `npm run start` to launch the application
    - Application will automatically open in new web page. If it does not automatically open, navigate to http://localhost:3000/ in browser

*NOTE: The service worker for this project will only cache the site in production mode.*


___
## Running project in Production Mode
1. cd to the working directory
2. Run the command `npm run build` to build production ready optimized code.
3. Run the command `npm run deploy` to deploy to gh-pages branch
4. View the online demo at https://mirandaklein.github.io/neighborhood-maps/
___
## Dependencies

There are no known dependencies at this time.
