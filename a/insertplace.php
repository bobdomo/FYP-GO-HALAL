<?php
$con=mysqli_connect("localhost","root","","jhalal");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

 
if(isset($_POST['signup'])){
 
}


$primename = mysqli_real_escape_string($con, $_POST['name']);
// $type = mysqli_real_escape_string($con, $_POST['type']);
$address = mysqli_real_escape_string($con, $_POST['address']);
$tel = mysqli_real_escape_string($con, $_POST['tel']);
$url = mysqli_real_escape_string($con, $_POST['url']);
$tag = mysqli_real_escape_string($con, $_POST['tag']);
$criteria = mysqli_real_escape_string($con, $_POST['criteria']);
$cuisine = mysqli_real_escape_string($con, $_POST['cuisine']);
$price = mysqli_real_escape_string($con, $_POST['price']);
// $coordinate = $_POST['coordinate'];

// echo $primename;
// echo coordinate;
// echo $cuisine;
// echo cusine;
// ECHO $coordinate;

// //echo $type;
// $mosque = "Mosque";
// // echo $mosque;
// // echo $type;

// if($type == "Mosque" || "mosque" ){
	// echo "success";
// }
// else {
	// echo "ayam";
// }

// // escape variables for security
// $Username = mysqli_real_escape_string($con, $_POST['name']);
// $Email = mysqli_real_escape_string($con, $_POST['mail']);
// $Password = mysqli_real_escape_string($con, $_POST['password']);


$sql="INSERT INTO temporary (name , address, tel, url, tag, criteria, cuisine, price, coordinate)
VALUES ('$primename', '$address', '$tel', '$url', '$tag', '$criteria', '$cuisine', '$price', '$coordinate')";

if (!mysqli_query($con,$sql)) {
  die('Error: ' . mysqli_error($con));
}
//echo "1 record added";
//echo"<>"
header("location:chooseRestaurant2.html");
mysqli_close($con);
?> 