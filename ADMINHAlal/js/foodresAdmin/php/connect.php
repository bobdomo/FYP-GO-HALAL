<?php
    
    $db_host = "localhost";
	$db_username = "root";
	$db_password = "";
	$db_name = "Test00";
	
	mysql_connect("$db_host","$db_username", "$db_password") or die("Connection Failed!");
	mysql_select_db("$db_name") or die("Database Selection Failed!");

?>