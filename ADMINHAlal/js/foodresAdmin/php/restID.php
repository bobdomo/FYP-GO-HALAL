<?php
     $con = mysqli_connect("localhost","root","","test00");
        if(mysqli_connect_errno())
        {
            echo "Failed to connect to Database: " . mysqli_connect_error();
        }

    if($_REQUEST['do'] == "set") {
        
        $_SESSION['restID'] = $_REQUEST['restID'];
        
        echo "RESTID SET";
    }
    else {
        
        echo $_SESSION['restID'];
    }
?>