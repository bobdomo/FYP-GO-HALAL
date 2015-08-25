<?php
/*
update_hs API
============
this api returns the latest version of haxe studio patch.

http://api.haxestudio.com/api.php?interface=update_hs
*/
/*
$username = isset($_GET['username']) ? $_GET['username'] : "" ; 
$username = sanitize($username);

$clientid = "70430fc6973df6a443ebdb10328d0a8b67568825";
$content = file_get_contents("https://api.about.me/api/v2/json/user/view/".$username."?client_id=".$clientid);
*/

$folder = scandir("../patch/");

$patch = array();

for ($i = 0;$i < count($folder);$i++)
	{
	if (is_file("../patch/".$folder[$i]))
		{
		if ($folder[$i] == "index.html")
			{
			continue;
			}
		$version = explode("-",$folder[$i]);
		$ver = array_pop($version);
		$ver = explode(".patch",$ver);
		array_pop($ver);
		$ver = $ver[0];
		array_push($patch,array("version"=>$ver, "url" =>"http://www.haxestudio.com/patch/".$folder[$i]));
		}
	}	
$content = json_encode($patch);
$jsonResult = json_decode($content,true);
