<?php

$id = isset($_GET['id']) ? $_GET['id'] : "";

$datas = $database->select("rating", "*",["Restaurant_id"=>$id]);
$jsonResult = $datas;
