//create a geocoder object to use geocode
$(() => {
  const geocoder = new google.maps.Geocoder();
  getTrips();

  $(function () {
    //fix map
    $("#addTripModal").on("shown.bs.modal", function () {
      google.maps.event.trigger(map, "resize");
    });
  });

  //hide all date-time chackbox inputs
  $(".regular").hide();
  $(".one-off").hide();

  const myRadio = $('input[name="regular"]');
  myRadio.click(function () {
    if ($(this).is(":checked")) {
      if ($(this).val() == "Y") {
        $(".one-off").hide();
        $(".regular").show();
      } else {
        $(".regular").hide();
        $(".one-off").show();
      }
    }
  });

  $(".regular2").hide();
  $(".one-off2").hide();
  const myRadio2 = $('input[name="regular2"]');
  myRadio2.click(function () {
    if ($(this).is(":checked")) {
      if ($(this).val() == "Y") {
        $(".one-off2").hide();
        $(".regular2").show();
      } else {
        $(".regular2").hide();
        $(".one-off2").show();
      }
    }
  });

  //calendar
  $('input[name="date"],input[name="date2"]').datepicker({
    numberOfMonths: 1,
    showAnim: "fadeIn",
    dateFormat: "D d M, yy",
    minDate: +1,
    maxDate: "+12M",
    showWeek: true,
  });

  let data;
  let departureLongitude;
  let departureLatitude;
  //click on create trip button
  $("#addtripform").submit(function (event) {
    event.preventDefault();
    data = $(this).serializeArray();
    getAddTripDepartureCoordinates();
  });

  function getAddTripDepartureCoordinates() {
    geocoder.geocode(
      {
        address: document.getElementById("departure").value,
      },
      function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          departureLongitude = results[0].geometry.location.lng();
          departureLatitude = results[0].geometry.location.lat();
          data.push({ name: "departureLongitude", value: departureLongitude });
          data.push({ name: "departureLatitude", value: departureLatitude });
          getAddTripDestinationCoordinates();
        } else {
          getAddTripDestinationCoordinates();
        }
      }
    );
  }
  let destinationLongitude;
  let destinationLatitude;
  function getAddTripDestinationCoordinates() {
    geocoder.geocode(
      {
        address: document.getElementById("destination").value,
      },
      function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          destinationLongitude = results[0].geometry.location.lng();
          destinationLatitude = results[0].geometry.location.lat();
          data.push({
            name: "destinationLongitude",
            value: destinationLongitude,
          });
          data.push({
            name: "destinationLatitude",
            value: destinationLatitude,
          });
          submitAddTripRequest();
        } else {
          submitAddTripRequest();
        }
      }
    );
  }

  //send ajax call to addtrips.php
  function submitAddTripRequest() {
    console.log(data);
    $.ajax({
      url: "addtrips.php",
      type: "POST",
      data: data,
      success: function (rdata) {
        console.log(rdata);
        if (rdata) {
          $("#addtripmessage").html(rdata);
        } else {
          //hide modal
          $("#addtripModal").modal("hide");
          //reset form
          $("addtripform").reset();
          //load trips
          getTrips();
        }
      },
      error: function () {
        $("#addtripmessage").html(
          "<div class='alert alert-danger'>There was an error with the Ajax Call. Please try again later.</div>"
        );
      },
    });
  }

  function getTrips() {
    $.ajax({
      url: "gettrips.php",
      success: function (rdata) {
        console.log(rdata);
        if (rdata) {
          $("#myTrips").html(rdata);
        } else {
        }
      },
      error: function () {
        $("#myTrips").html(
          "<div class='alert alert-danger'>There was an error with the Ajax Call. Please try again later.</div>"
        );
      },
    });
  }
});
