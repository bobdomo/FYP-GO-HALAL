<?php

$Ratingid = isset($_GET['id']) ? $_GET['id'] : "";
$Restaurantid = isset($_GET['Rid']) ? $_GET['Rid'] : "";
$rating = isset($_GET['rating']) ? $_GET['rating'] : "";
$number = isset($_GET['num']) ? $_GET['num'] : "";

// echo intval($Ratingid);
// echo $Restaurantid;
// echo $rating;
// echo $number;

$datas = $database->update("rating", ["Rating"=>floatval($rating),"Number_user"=>intval($number) ],["Rating_id"=>intval($Ratingid)]);
// $datas = $database->select("restaurant", "*");
// var_dump($datas);
// echo "Insert";
// echo $rating;

$jsonResult = $datas;
?>
