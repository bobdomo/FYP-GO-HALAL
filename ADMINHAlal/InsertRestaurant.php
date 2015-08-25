<?php
$con=mysqli_connect("localhost","root","","jhalal");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

 
if(isset($_POST['signup'])){
 
}

// escape variables for security
$Rname =  $_POST['name'];
$raddress = mysqli_real_escape_string($con, $_POST['address']);
$rcriteria = mysqli_real_escape_string($con, $_POST['criteria']);
$rurl = mysqli_real_escape_string($con, $_POST['url']);
$rtel = mysqli_real_escape_string($con, $_POST['tel']);
$rcuisine = mysqli_real_escape_string($con, $_POST['Cuisine']);
$rprice = mysqli_real_escape_string($con, $_POST['price']);
$rrating = mysqli_real_escape_string($con, $_POST['rating']);
$rcoordinate = $_POST['coordinate'];

// echo $rcoordinate;

// $rcoordinates = mysqli_real_escape_string($con, $_POST['password']);
// echo $Rname;
// echo $raddress,$rcriteria,$rurl,$rtel,$rcuisine,$rprice;

$sql="INSERT INTO restaurant (Restaurant_name , Restaurant_address, Restaurant_Tel, Restaurant_URL, Restaurant_coordinates, Restaurant_Tag, Restaurant_Criteria, Restaurant_Cusine, Restaurant_price, Restaurant_Rating)
VALUES ('$Rname', '$raddress', '$rtel', '$rurl', '$rcoordinate', '$rtag', '$rcriteria', '$rcuisine', '$rprice' , '$rrating')";

if (!mysqli_query($con,$sql)) {
  die('Error: ' . mysqli_error($con));
}
//echo "1 record added";
//echo"<>"
// session_start()
header("location:insert.html");
mysqli_close($con);
?> 