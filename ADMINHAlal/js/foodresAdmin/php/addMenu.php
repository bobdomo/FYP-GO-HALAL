<?php
    header("Content-type:text/plain");
    header("Access-Control-Allow-Origin: *");

    $con = mysqli_connect("localhost","root","","test00");
        if(mysqli_connect_errno($con))
        {
            echo "Failed to connect to Database: " . mysqli_connect_error($con);
        }

    $userID = htmlspecialchars($_REQUEST["userID"]);
    $menuName = htmlspecialchars($_REQUEST["menuName"]);
    $menuPrice = htmlspecialchars($_REQUEST["menuPrice"]);
    $menuPax = htmlspecialchars($_REQUEST["menuPax"]);
    $menuDetails = htmlspecialchars($_REQUEST["menuDetails"]);

    $query = "INSERT INTO menu(userID, menuName, menuPrice, menuPax, menuDetails) VALUES ('$userID', '$menuName', '$menuPrice', '$menuPax', '$menuDetails')";
    $result = mysqli_query($con, $query);

    if($result)
    {
        echo SAVED;
    }
    else
    {
        echo mysqli_error($con);
    }
?>