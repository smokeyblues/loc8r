var request = require('request');
var apiOptions = {
  server: "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://shrouded-citadel-66882.herokuapp.com";
}


var renderHomepage = function(req, res, responseBody) {
  res.render('locations-list', {
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Find places to work with wifi near you!'
    },
    sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
    locations: responseBody
    message: message
  });
};

/* GET 'home' page */
module.exports.homelist = function (req, res) {
  var requestOptions, path;
  path = 'api/locations';
  requestOptions = {
    url: apiOptions.server + path,
    method : "GET",
    json : {},
    qs : {
      lng : -104.984623,
      lat : 39.904589,
      maxDistance : 20
    }
  };
  request(
    requestOptions,
    function(err, response, body) {
      renderHomepage(req, res, body);
    }
  );
  // res.render('locations-list', {
  //   title: 'X-WiFightr - find a place to work with wifi',
  //   pageHeader: {
  //     title: 'X-WiFightr',
  //     strapline: 'Find places to work with wifi near you!'
  //   },
  //   sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
  //       locations: [{
  //           name: 'Starcups',
  //           address: '125 High Street, Reading, RG6 1PS',
  //           rating: 3,
  //           facilities: ['Hot drinks', 'Food', 'Premium wifi'],
  //           distance: '100m'
  //       }, {
  //           name: 'Cafe Hero',
  //           address: '125 High Street, Reading, RG6 1PS',
  //           rating: 4,
  //           facilities: ['Hot drinks', 'Food', 'Premium wifi'],
  //           distance: '200m'
  //       }, {
  //           name: 'Burger Queen',
  //           address: '125 High Street, Reading, RG6 1PS',
  //           rating: 2,
  //           facilities: ['Food', 'Premium wifi'],
  //           distance: '250m'
  //       }]
  // });
};

/* GET 'Location info' page */
module.exports.locationInfo = function (req, res) {
  res.render('location-info', { title: 'Location Info'});
};

/* GET 'Add Review' page */
module.exports.addReview = function (req, res) {
  res.render('location-review-form', { title: 'Add Review' });
};
