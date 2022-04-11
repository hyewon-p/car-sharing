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
