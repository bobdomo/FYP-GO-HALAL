<?php
    header("Content-type:text/plain");
    header("Access-Control-Allow-Origin: *");

    $con = mysqli_connect("localhost","root","","test00");
        if(mysqli_connect_errno($con))
        {
            echo "Failed to connect to Database: " . mysqli_connect_error($con);
        }

        $rEmail = htmlspecialchars($_REQUEST['rEmail']);
        $rPassword = htmlspecialchars($_REQUEST['rPassword']);
        $rName= htmlspecialchars($_REQUEST['rName']);
        $rRadio = htmlspecialchars($_REQUEST['rRadio']);
        $rAddress = htmlspecialchars($_REQUEST['rAddress']);
        
        
        $queryUser = "INSERT INTO user(userType, uname, upword) VALUES ('1','$rEmail', '$rPassword')";
        $queryRest = "INSERT INTO restaurant(restName, restType, restAddress) VALUES ('$rName', '$rRadio', '$rAddress')";
        
        $result1 = mysqli_query($con, $queryUser);
        $result2 = mysqli_query($con, $queryRest);
        
        /*if($result1 && result2)
        {
            echo SAVED;
        }
        else
        {
            echo mysqli_error($con);
        }
    }*/

    
?>