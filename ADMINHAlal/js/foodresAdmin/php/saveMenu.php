<?php
    header("Content-type:text/plain");
    header("Access-Control-Allow-Origin: *");

    $con = mysqli_connect("localhost","root","","test00");
        if(mysqli_connect_errno($con))
        {
            echo "Failed to connect to Database: " . mysqli_connect_error($con);
        }

    $json_str = $_REQUEST["json"];
    $menu = json_decode($json_str, true);
    
    if($menu != null)
    {
        $menuID = mysqli_real_escape_string($con, $menu['menuID']);
        $menuName = mysqli_real_escape_string($con, $menu['menuName']);
        $menuPrice= mysqli_real_escape_string($con, $menu['menuPrice']);
        $menuPax = mysqli_real_escape_string($con, $menu['menuPax']);
        $menuDetails = mysqli_real_escape_string($con, $menu['menuDetails']);
               
        $query = "UPDATE menu SET menuName='$menuName', menuPrice='$menuPrice', menuPax='$menuPax', menuDetails='$menuDetails' WHERE menuID='$menuID'";
            $result = mysqli_query($con, $query);
        
        if($result)
        {
            $row = mysqli_fetch_assoc($result);           
            

            if($result)
            {
                echo "SAVED";                
            }
            else
            {
                echo mysqli_error($con);
            }
        }
        else
        {
            echo mysqli_error($con);
        }
    }

?>