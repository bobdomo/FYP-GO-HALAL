<?php



$cuisine = isset($_GET['cuisine']) ? $_GET['cuisine'] : "";
$criteria = isset($_GET['criteria']) ? $_GET['criteria'] : "";
$price = isset($_GET['price']) ? $_GET['price'] : "";
// $a = "cheap";

// echo $cuisine, $criteria, $price;

if ( $cuisine != "" | $criteria != "" | $price != "")
{ 
// echo "ayam";

$datas = $database->select("restaurant","*",[
							"AND"=>[
								"Restaurant_cusine[~]"=>$cuisine, 
								"Restaurant_price[~]"=>$price,
								"Restaurant_Criteria[~]"=>$criteria
								]
								]);
 // $a = implode("[",$datas);
 
 // echo $a;
 $jsonResult = $datas;
 
 
 // $jsonResult = $datas;
}
else{
	//echo "kambing";
$datas = $database->select("restaurant", "*");
$jsonResult = $datas; 
};