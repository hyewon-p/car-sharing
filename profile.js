// Ajax call to updateusername.php
$("#updateusernameform").submit(function (event) {
  //prevent default php processing
  event.preventDefault();
  //collect user inputs
  var datatopost = $(this).serializeArray();
  //    console.log(datatopost);
  //send them to updateusername.php using AJAX
  $.ajax({
    url: "updateusername.php",
    type: "POST",
    data: datatopost,
    success: function (data) {
      if (data) {
        $("#updateusernamemessage").html(data);
      } else {
        location.reload();
      }
    },
    error: function () {
      $("#updateusernamemessage").html(
        "<div class='alert alert-danger'>There was an error with the Ajax Call. Please try again later.</div>"
      );
    },
  });
});

// Ajax call to updatepassword.php
$("#updatepasswordform").submit(function (event) {
  //prevent default php processing
  event.preventDefault();
  //collect user inputs
  var datatopost = $(this).serializeArray();
  //    console.log(datatopost);
  //send them to updateusername.php using AJAX
  $.ajax({
    url: "updatepassword.php",
    type: "POST",
    data: datatopost,
    success: function (data) {
      if (data) {
        $("#updatepasswordmessage").html(data);
      }
    },
    error: function () {
      $("#updatepasswordmessage").html(
        "<div class='alert alert-danger'>There was an error with the Ajax Call. Please try again later.</div>"
      );
    },
  });
});

// Ajax call to updateemail.php
$("#updateemailform").submit(function (event) {
  //prevent default php processing
  event.preventDefault();
  //collect user inputs
  var datatopost = $(this).serializeArray();
  //    console.log(datatopost);
  //send them to updateusername.php using AJAX
  $.ajax({
    url: "updateemail.php",
    type: "POST",
    data: datatopost,
    success: function (data) {
      if (data) {
        $("#updateemailmessage").html(data);
      }
    },
    error: function () {
      $("#updateemailmessage").html(
        "<div class='alert alert-danger'>There was an error with the Ajax Call. Please try again later.</div>"
      );
    },
  });
});

//update picture preview
let file;
let imageType;
let imageSize;
let wrongType;
$("#picture").change(function () {
  file = this.files[0];
  console.log(file);
  imageType = file.type;
  imageSize = file.size;
  //check image type
  const acceptableTypes = ["image/jpeg", "image/png", "image/jpg"];
  wrongType = $.inArray(imageType, acceptableTypes) == -1;
  if (wrongType) {
    $("#updatepicturemessage").html(
      "<div class='alert alert-danger'>Only jpeg, png and jpg images are accepted!</div>"
    );
    return false;
  }

  //chect image size
  if (imageSize > 3 * 1024 * 1024) {
    $("#updatepicturemessage").html(
      "<div class='alert alert-danger'>Please upload an image less than 3Mo!</div>"
    );
    return false;
  }

  //The FileReader object will be used to convert out image to a binary string
  const reader = new FileReader();
  //callback
  reader.onload = updatePreview;
  //start the read operation=>convert content into data url which is passed to the callback
  reader.readAsDataURL(file);
});

function updatePreview(event) {
  console.log(event);
  $("#preview2").attr("src", event.target.result);
}

//update picture
$("#updatepictureform").submit(function (event) {
  event.preventDefault();
  //file missing
  if (!file) {
    $("#updatepicturemessage").html(
      "<div class='alert alert-danger'>Please upload a picture!</div>"
    );
    return false;
  }

  //wrong type
  if (wrongType) {
    $("#updatepicturemessage").html(
      "<div class='alert alert-danger'>Only jpeg, png and jpg images are accepted!</div>"
    );
    return false;
  }

  //file too big
  if (imageSize > 3 * 1024 * 1024) {
    $("#updatepicturemessage").html(
      "<div class='alert alert-danger'>Please upload an image less than 3Mo!</div>"
    );
    return false;
  }
  // const test = new FormData(this);

  //send Ajax Call to file updatepicture.php
  $.ajax({
    url: "updatepicture.php",
    type: "POST",
    data: new FormData(this),
    contentType: false,
    cache: false,
    processData: false,
    success: function (data) {
      if (data) {
        $("#updateusernamemessage").html();
      } else {
        location.reload();
      }
    },
    error: function () {
      $("#updateusernamemessage").html(
        "<div class='alert alert-danger'>There was an error with the Ajax Call. Please try again later.</div>"
      );
    },
  });
});
