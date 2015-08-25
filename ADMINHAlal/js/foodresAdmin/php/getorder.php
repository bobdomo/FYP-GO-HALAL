<?php
    header("Content-type:text/plain");
    header("Access-Control-Allow-Origin: *");

    require_once("connect.php");

     $con = mysqli_connect("localhost","root","","test00");
        if(mysqli_connect_errno())
        {
            echo "Failed to connect to Database: " . mysqli_connect_error();
        }

    $query = "SELECT * FROM customerOrder";
    $result = mysqli_query($con, $query);
    $total_row = mysqli_num_rows($result);

    if($result)
    {
        $json_str = "[";
        
        $num_row = 1;
        
        while($row = mysqli_fetch_assoc($result))
        {
            $orderID = $row['orderID'];
            $orderDate = $row['orderDate'];
            $customerName = $row['customerName'];
            $orderName = $row['orderName'];
            $totalPrice = $row['totalPrice'];
            
            $json_str .= "
            {
                \"orderID\":\"$orderID\",
                \"orderDate\":\"$orderDate\",
                \"customerName\":\"$customerName\",
                \"orderName\":\"$orderName\",              
                \"totalPrice\":\"$totalPrice\"
            }";
            
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
        echo mysqli_error($con,);   
    }
?>