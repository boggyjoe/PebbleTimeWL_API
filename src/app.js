var UI = require('ui');
var ajax = require('ajax');

// Create a Card with title and subtitle
var card = new UI.Card({
  title:'WL Monitor',
  subtitle:'Fetching...'
});

// Display the Card
card.show();

// Construct URL
var URL = 'http://www.wienerlinien.at/ogd_realtime/monitor?rbl=1963&sender=rbl';

// Make the request
ajax(
  {
    url: URL,
    type: 'json'
  },
  function(data) {
    // Success!
    console.log("Successfully fetched WL RBL data!");

    // Extract data
    var Bus = JSON.stringify(data.data.monitors[1].lines[0].name);
    Bus = JSON.stringify(data.data.monitors[1].lines[0].name, null, 4); // (Optional) beautiful indented output.
    
    var countdown1 = JSON.stringify(data.data.monitors[1].lines[0].departures.departure[0].departureTime.countdown);
    countdown1 = JSON.stringify(data.data.monitors[1].lines[0].departures.departure[0].departureTime.countdown, null, 4); // (Optional) beautiful indented output.
    var countdown2 = JSON.stringify(data.data.monitors[1].lines[0].departures.departure[1].departureTime.countdown);
    countdown2 = JSON.stringify(data.data.monitors[1].lines[0].departures.departure[1].departureTime.countdown, null, 4); // (Optional) beautiful indented output.
    
    // Show to user
    //card.subtitle('WL Monitor:');
    card.subtitle('Der'  + Bus + ' kommt in ' + countdown1 + 'min');
    card.body('der nächste dann in ' + countdown2 + 'min');
  },
  function(error) {
    // Failure!
    console.log('Failed fetching WL RBL data: ' + error);
  }
);
