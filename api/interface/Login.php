<?php
$username = isset($_GET['uname']) ? $_GET['uname'] : "";
$password = isset($_GET['pword']) ? $_GET['pword'] : "";

// $a = "cheap";

// echo $cuisine, $criteria, $price;


$datas = $database->select("user_details","*",[
							"AND"=>[
								"Email"=>$username,
								"Password"=>$password
								]
								]);
 // $a = implode("[",$datas);

 // echo $a;
 $jsonResult = $datas;


 // $jsonResult = $datas;
 ?>
