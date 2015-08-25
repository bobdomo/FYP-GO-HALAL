<?php
// // header("Content-type:text/plain");
    // // header("Access-Control-Allow-Origin: *");

session_start(); // Starting Session
		$error=''; // Variable To Store Error Message
	// echo "ayam1";
	
		// echo "1";
		//if (empty($_POST['uname']) || empty($_POST['pword'])) {
		//$error = "Username or Password is invalid";
		//echo $error;
	//	}
		//else
		//{
// Define $username and $password
$username=$_REQUEST['uname'];
$password=$_REQUEST['pword'];
// Establishing Connection with Server by passing server_name, user_id and password as a parameter
$connection = mysqli_connect("localhost", "root","" , "jhalal");
// To protect MySQL injection for Security purpose
// $username = stripslashes($username);
// $password = stripslashes($password);
$username = mysqli_real_escape_string($connection,$username);
$password = mysqli_real_escape_string($connection,$password);
// Selecting Database
 //echo $username,$password;
// SQL query to fetch information of registerd users and finds user match.
$query = mysqli_query($connection,"select * from user_details where Password='$password' AND Email='$username'");
$rows = mysqli_num_rows($query);

if ($rows == 1) {
	$row = mysqli_fetch_assoc($query);
	//echo $row['Username'];
// $_SESSION['login_user']=$username; // Initializing Session
echo "LOGIN";
 //header("location: chooseRestaurant2.html"); // Redirecting To Other Page

} 

else {
$error = "Username or Password is invalid";
echo $error;
}
mysqli_close($connection); // Closing Connection


 ?>