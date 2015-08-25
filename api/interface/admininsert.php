<?php

$pname = isset($_GET['pname']) ? $_GET['pname'] : "";
$paddress = isset($_GET['paddress']) ? $_GET['paddress'] : "";
$ptel = isset($_GET['ptel']) ? $_GET['ptel'] : "";
$purl = isset($_GET['purl']) ? $_GET['purl'] : "";
$ptag = isset($_GET['ptag']) ? $_GET['ptag'] : "";
$pcriteria = isset($_GET['pcriteria']) ? $_GET['pcriteria'] : "";
$pcuisine = isset($_GET['pcuisine']) ? $_GET['pcuisine'] : "";
$pprice = isset($_GET['pprice']) ? $_GET['pprice'] : "";
$pcoord = isset($_GET['pcoord']) ? $_GET['pcoord'] : "";

// echo intval($Ratingid);
// echo $Restaurantid;
// echo $rating;
// echo $number;

// $datas = $database->update("rating", ["Rating"=>floatval($rating),"Number_user"=>intval($number) ],["Rating_id"=>intval($Ratingid)]);
$datas = $database->insert("restaurant", [
	"Restaurant_name" => $pname,
  "Restaurant_address" => $paddress,
  "Restaurant_Tel" => $ptel,
  "Restaurant_URL" => $purl,
	"Restaurant_Tag" => $ptag,
  "Restaurant_Criteria" => $pcriteria,
  "Restaurant_cusine" => $pcuisine,
  "Restaurant_price" => $pprice,
	"Restaurant_coordinate" => $pcoord
]);
// $datas = $database->select("restaurant", "*");
// var_dump($datas);
// echo "Insert";
// echo $rating;

$jsonResult = $datas;
?>
