<?php 
session_start(); 
if(isset($_SESSION["admin"])) 
   echo "ada : " .$_SESSION["admin"];
else echo "x ada admin";
   //echo $_SESSION['admin'];

if(isset($_SESSION["restID"])) 
   echo "ada : " .$_SESSION["restID"];
else echo "x ada restID";
?>