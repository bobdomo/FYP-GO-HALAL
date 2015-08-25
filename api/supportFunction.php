<?php
function sanitize($string)
	{
	preg_match_all ("/[^0-9^a-z^_^.^\-]/", $string, $matches);
	foreach ($matches[0] as $value) 
		{
    	$string = str_replace($value, "", $string);
		}	
    $string = str_replace("eval","",$string);
    $string = str_replace("echo","",$string);
    return $string;
	}

function jsonp_encode($data)
    {
    $json = json_encode($data);
    return isset($_GET['callback']) ? "{$_GET['callback']}(".$json.")" : json_encode($data);
    }
    
function startsWith($haystack, $needle)
	{
    return $needle === "" || strpos($haystack, $needle) === 0;
	}
	
function endsWith($haystack, $needle)
	{
    return $needle === "" || substr($haystack, -strlen($needle)) === $needle;
	}


