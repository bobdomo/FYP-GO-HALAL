<?php
    // header("Content-type:text/plain");
    // header("Access-Control-Allow-Origin: *");

    $con = mysqli_connect("localhost","root","","jhalal");
        if(mysqli_connect_errno($con))
        {
            echo "Failed to connect to Database: " . mysqli_connect_error($con);
        }

    $menuID = mysqli_real_escape_string($con, $_REQUEST["menuID"]);

    $query = "DELETE FROM temporary WHERE id='$menuID'";
    $result = mysqli_query($con, $query);

    if($result)
    {
        echo "DELETED";
    }
    else
    {
        echo mysqli_error($con);
    }
?>
