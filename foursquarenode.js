const request = require('request');

function getFoursquareData(lat, lng, query) {
    request({
        url: 'https://api.foursquare.com/v2/venues/explore',
        method: 'GET',
        qs: {
            client_id: 'CRPNQZKLQSLFOOPWSUQS3BBYIMZS01RIR22KIGNMYP2LSHI2',
            client_secret: 'HR2WRPIRAHBKOMJKAXAZ2CKNUDUZJMWDPX1A0THJSTCTYMR4',
            ll: `${lat},${lng}`,
            query: `{query}`,
            v: '20180323',
            limit: 1
        }
    }, function (err, res, body) {
        if (err) {
            console.error(err);
        } else {
            return JSON.parse(body).response.groups;
        }
    });
}

var myData = getFoursquareData("35.9709", "-83.9173", "pizza");

console.log(myData)