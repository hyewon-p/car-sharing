<?php
session_start();
include('connection.php');

//define error messages
$missingdeparture = '<p><strong>Please enter your departure!</strong></p>';
$invaliddeparture = '<p><strong>Please enter a valid departure!</strong></p>';
$missingdestination = '<p><strong>Please enter your destination!</strong></p>';
$invaliddestination = '<p><strong>Please enter a valid destination!</strong></p>';
$missingprice = '<p><strong>Please choose a price per seat!</strong></p>';
$invalidprice = '<p><strong>Please choose a valid price per seat using numbers only!!</strong></p>';
$missingseatsavailable = '<p><strong>Please select the number of available seats!</strong></p>';
$invalidseatsavailable = '<p><strong>The number of available seats should contain digits only!</strong></p>';
$missingfrequency = '<p><strong>Please select a frequency!</strong></p>';
$missingdays = '<p><strong>Please select at least one weekday!</strong></p>';
$missingdate = '<p><strong>Please choose a date for your trip!</strong></p>';
$missingtime = '<p><strong>Please choose a time for your trip!</strong></p>';

//Get inputs:
$departure = $_POST["departure"];
$destination = $_POST["destination"];
$price = $_POST["price"];
$seatsavailable = $_POST["seatsavailable"];
$regular = $_POST["regular"];
$date = $_POST["date"];
$time = $_POST["time"];
$monday = $_POST["monday"];
$tuesday = $_POST["tuesday"];
$wednesday = $_POST["wednesday"];
$thursday = $_POST["thursday"];
$friday = $_POST["friday"];
$saturday = $_POST["saturday"];
$sunday = $_POST["sunday"];

//check departure
if(empty($departure)){
    $errors .= $missingdeparture;
}else{
    if(!isset($_POST["departureLatitude"]) or !isset($_POST["departureLongitude"]) ){
        $errors .= $invaliddeparture;
    }else{
        $departureLatitude = $_POST["departureLatitude"];
        $departureLongitude = $_POST["departureLongitude"];
        $departure = filter_var($departure, FILTER_SANITIZE_STRING);
    }
}

if(empty($destination)){
    $errors .= $missingdestination;
}else{
    if(!isset($_POST["destinationLatitude"]) or !isset($_POST["destinationLongitude"]) ){
        $errors .= $invaliddestination;
    }else{
        $destinationLatitude = $_POST["destinationLatitude"];
        $destinationLongitude = $_POST["destinationLongitude"];
        $destination = filter_var($destination, FILTER_SANITIZE_STRING);
    }
}

//check price
if(empty($price)){
    $errors .= $missingprice;
}elseif(preg_match('/\D/',$price)){
    $errors .= $invalidprice;
}else{
    $price = filter_var($price, FILTER_SANITIZE_STRING);
}

//check seats available
if(empty($seatsavailable)){
    $errors .= $missingseatsavailable;
}elseif(preg_match('/\D/',$seatsavailable)){
    $errors .= $invalidseatsavailable;
}else{
    $seatsavailable = filter_var($seatsavailable, FILTER_SANITIZE_STRING);
}

//check frequency
if(empty($regular)){
    $errors .= $missingfrequency;
}elseif($regular=="Y"){
    if(empty($monday) && empty($tuesday) && empty($wednesday) && empty($thursday) && empty($friday) && empty($saturday) && empty($sunday)){
        $errors .= $missingdays;
    }
    if(empty($time)){
        $errors .= $missingtime;
    }
}elseif($regular == "N"){
    if(empty($date)){
        $errors .= $missingdate;
    }
    if(empty($time)){
        $errors .= $missingtime;
    }
}

if($errors){
    $resultMessage = "<div class='alert alert-danger'>$errors</div>";
    echo $resultMessage;
}else{
    //no errors, prepare variables to the query
    $departure = mysqli_real_escape_string($link, $departure);
    $destination = mysqli_real_escape_string($link, $destination);
    $tblName = "carsharetrips";
    $user_id = $_SESSION['user_id'];
    if($regular=="Y"){
        //query for regular trip
        $sql = "INSERT INTO carsharetrips (user_id,departure, departureLongitude, departureLatitude, destination, destinationLongitude, destinationLatitude, price, seatsavailable, regular, monday, tuesday, wednesday, thursday, friday, saturday, sunday, time) VALUES ('".$_SESSION['user_id']."', '$departure','$departureLongitude','$departureLatitude','$destination','$destinationLongitude','$destinationLatitude','$price','$seatsavailable','$regular','$monday','$tuesday','$wednesday','$thursday','$friday','$saturday','$sunday','$time')";
    }elseif($regular == "N"){
        //query for one-off trip
        $sql = "INSERT INTO carsharetrips (user_id,departure, departureLongitude, departureLatitude, destination, destinationLongitude, destinationLatitude, price, seatsavailable, regular, date, time) VALUES ('".$_SESSION['user_id']."', '$departure','$departureLongitude','$departureLatitude','$destination','$destinationLongitude','$destinationLatitude','$price','$seatsavailable','$regular','$date','$time')"; 
    }
    $results = mysqli_query($link, $sql);
    if(!$results){
        echo "<div>There was an error!" . mysqli_error($link) ."</div>";
    }
}

?>