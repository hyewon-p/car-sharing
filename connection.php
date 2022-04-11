<?php
$link = mysqli_connect("localhost", "stude232_newUser", "Yv6VCCDoDA", "stude232_carshareDatabase");
if(mysqli_connect_error()){
    die('ERROR: Unable to connect:' . mysqli_connect_error()); 
    echo "<script>window.alert('Hi!')</script>";
}
    ?>