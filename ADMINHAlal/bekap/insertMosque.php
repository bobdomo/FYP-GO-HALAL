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
$Mname =  $_POST['mname'];
$Murl = mysqli_real_escape_string($con, $_POST['murl']);
$Mtag = mysqli_real_escape_string($con, $_POST['mtag']);
$Maddress = mysqli_real_escape_string($con, $_POST['maddress']);
$Mcoordinate = $_POST['mcoordinate'];

 echo $Mcoordinate,$Mname, $Murl, $Mtag, $Maddress;

// $rcoordinates = mysqli_real_escape_string($con, $_POST['password']);
// echo $Rname;
// echo $raddress,$rcriteria,$rurl,$rtel,$rcuisine,$rprice;

$sql="INSERT INTO mosque (Mosque_name , Mosque_address, Mosque_URL, Mosque_coordinate, Mosque_Tag)
VALUES ('$Mname', '$Maddress', '$Murl', '$Mcoordinate', '$Mtag')";

if (!mysqli_query($con,$sql)) {
  die('Error: ' . mysqli_error($con));
}
//echo "1 record added";
//echo"<>"
// session_start()
header("location:insert.html");
mysqli_close($con);
?> 