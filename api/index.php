<?php
require_once ("supportFunction.php");
require_once ('cache.php');
require_once ("connect.php");
// register interface here
// you can close any api for maintainance by ( $interface["api-name"] = false )
$interface = array();

// $interface["update_hs"] = true; // &username=
$interface["premise"] = true;
$interface["premise_restaurant"] = true;
$interface["premise_mosque"] = true;
$interface["login"] =true;
$interface["filter"] =true;
$interface["temporary"] =true;
$interface["rating"] =true;
$interface["rating2"] =true;
$interface["newplace"] =true;
$interface["newuser"] =true;
$interface["admininsert"] =true;

/*
$interface["podcast"] = true;
$interface["utm_event"] = true;
$interface["iboard"] = true;
$interface["utm_news_latest"] = true;
$interface["scival"] = true;
$interface["news"] = true;
$interface["utm_facebook_feed"] = false;
$interface["twitter_hashtag"] = true;
$interface["profile"] = true;
$interface["email_signature"] = true;
$interface["utm_poi"] = true;
$interface["faculty_event"] = true;
*/
////////////////////////////////////
// Do not edit after this line
////////////////////////////////////

$cacheFor = array();

$cacheFor['update_hs'] = 60; // minute
/*
$cacheFor['utm_news_latest'] = 30; // minute
$cacheFor['utm_event'] = 60; // minute
$cacheFor['news'] = 60; // minute
$cacheFor['utmpoi'] = 60; // minute
$cacheFor['faculty_event'] = 300; // minute
*/


// preparing $key for cache

function parse_url_for_key()
	{
	$url = $_SERVER['QUERY_STRING'];
	$exploded_url = explode("&",$url);
	$exclude_signiture = array();
	for ($i = 0;$i < count($exploded_url);$i++)
		{
		if (startsWith($exploded_url[$i],"signature") === true)
			{
			}
		else if (startsWith($exploded_url[$i],"flush") === true)
			{
			}
		else
			{
			array_push($exclude_signiture,$exploded_url[$i]);
			}
		}
	$url = implode("&",$exclude_signiture);
	return $url;
	}


// preparing $key for cache
$key =  parse_url_for_key();
//$cache = new FileCache();

$interface_type = isset($_GET['interface']) ? sanitize($_GET['interface']) : "" ;

if ($interface_type == "")
	{
	//echo "This is the access to UTM API. Click <a href='./index.html'>here</a> to learn to use it.";
	echo "unknown";
	exit();
	}

$jsonResult = array();
$sentItRaw = false;


if(@$interface[$interface_type] === true) // interface is available
	{
		include dirname(__FILE__)."/interface/".$interface_type.".php";
	}
else if(@$interface[$interface_type] === false)
	{
	array_push($jsonResult,array('error'=>'API closed for maintenance'));
	}
else
	{
	array_push($jsonResult,array('error'=>'API not exists!'));
	}

if ($interface_type == "podcast")
	{
	header("HTTP/1.1 401 KO");
	}
else
	{
	header("HTTP/1.1 200 OK");
	}
header('Content-Type: application/json');

$json = jsonp_encode($jsonResult);
echo $json;
