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
$Username = mysqli_real_escape_string($con, $_POST['name']);
$Email = mysqli_real_escape_string($con, $_POST['mail']);
$Password = mysqli_real_escape_string($con, $_POST['password']);


$sql="INSERT INTO user_details (Username , Password, Email)
VALUES ('$Username', '$Password', '$Email')";

if (!mysqli_query($con,$sql)) {
  die('Error: ' . mysqli_error($con));
}
//echo "1 record added";
//echo"<>"
//session_start()
//header("location:login.php");
mysqli_close($con);
?> 