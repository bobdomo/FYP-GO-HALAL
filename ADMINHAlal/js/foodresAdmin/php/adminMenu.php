<?php
    header("Content-type:text/plain");
    header("Access-Control-Allow-Origin: *");    
    session_start();
     $con = mysqli_connect("localhost","root","","test00");
        if(mysqli_connect_errno())
        {
            echo "Failed to connect to Database: " . mysqli_connect_error();
        }

    if(isset($_SESSION["userID"])){
            $currUserID = $_SESSION["userID"];
            $query = "SELECT * FROM menu WHERE userID = '$currUserID'";
    }
       
    $result = mysqli_query($con, $query);
    $total_row = mysqli_num_rows($result);

    if($result)
    {
        $json_str = "[";
        
        $num_row = 1;
        
        while($row = mysqli_fetch_assoc($result))
        {
            $menuID = $row['menuID'];
            $menuName = $row['menuName'];
            $menuPrice = $row['menuPrice'];
            $menuPax = $row['menuPax'];
            $menuDetails = $row['menuDetails'];
            
            $json_str .= "{\"menuID\":\"$menuID\",\"menuName\":\"$menuName\",\"menuPrice\":\"$menuPrice\",\"menuPax\":\"$menuPax\",\"menuDetails\":\"$menuDetails\"}";
            
            if($num_row != $total_row)
            {
                $json_str .= ",";   
            }
            
            $num_row++;
        }
        
        $json_str .= "]";
        
        echo $json_str;
    
    }
    else
    {
        echo mysqli_error($con);   
    }
?>