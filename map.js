let map;
let directionsDisplay;

//initialize: draw map in the #googleMap div
function initMap() {}
$(() => {
  initMap = function () {
    //create a DirectionsRenderer Object which will be used to display the route
    directionsDisplay = new google.maps.DirectionsRenderer();
    //create map
    map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);
    //bind the DirectionsRenderer to the map
    directionsDisplay.setMap(map);
  };
  //set map options
  const myLatLng = { lat: 51.5, lng: -0.12 };
  const mapOptions = {
    center: myLatLng,
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  };

  //create autocomplete objects
  const input1 = document.getElementById("departure");
  const input2 = document.getElementById("destination");
  const options = {
    types: ["(cities)"],
  };

  const autocomplete1 = new google.maps.places.Autocomplete(input1, options);
  const autocomplete2 = new google.maps.places.Autocomplete(input2, options);

  //create a DirectionsService object to use the route method
  const directionsService = new google.maps.DirectionsService();

  //onload:
  google.maps.event.addDomListener(window, "load", initMap);

  //calculate the route when selecting Autocomplete
  //   autocomplete1.addListener("place_changed", calcRoute);
  google.maps.event.addListener(autocomplete1, "place_changed", calcRoute);

  google.maps.event.addListener(autocomplete2, "place_changed", calcRoute);

  //calculate route
  function calcRoute() {
    const start = $("#departure").val();
    const end = $("#destination").val();
    const request = {
      origin: start,
      destination: end,
      travelMode: google.maps.DirectionsTravelMode.DRIVING,
    };
    if (start && end) {
      // console.log(start, end);
      directionsService.route(request, function (res, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(res);
        }
      });
    } else {
      initMap();
    }
  }
});
