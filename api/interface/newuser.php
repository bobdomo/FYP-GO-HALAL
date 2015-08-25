<?php

$uname = isset($_GET['uname']) ? $_GET['uname'] : "";
$umail = isset($_GET['umail']) ? $_GET['umail'] : "";
$upword = isset($_GET['upword']) ? $_GET['upword'] : "";

// echo intval($Ratingid);
// echo $Restaurantid;
// echo $rating;
// echo $number;

// $datas = $database->update("rating", ["Rating"=>floatval($rating),"Number_user"=>intval($number) ],["Rating_id"=>intval($Ratingid)]);
$datas = $database->insert("user_details", [
	"Username" => $uname,
  "Email" => $umail,
  "Password" => $upword
]);
// $datas = $database->select("restaurant", "*");
// var_dump($datas);
// echo "Insert";
// echo $rating;

$jsonResult = $datas;
?>
