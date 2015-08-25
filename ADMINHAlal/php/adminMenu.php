<?php
    // header("Content-type:text/plain");
    // header("Access-Control-Allow-Origin: *");
    session_start();
     $con = mysqli_connect("localhost","root","","jhalal");
        if(mysqli_connect_errno())
        {
            echo "Failed to connect to Database: " . mysqli_connect_error();
        }


            $query = "SELECT * FROM restaurant";


    $result = mysqli_query($con, $query);
    $total_row = mysqli_num_rows($result);

    if($result)
    {
        $json_str = "[";

        $num_row = 1;

        while($row = mysqli_fetch_assoc($result))
        {
            // $Restaurant_id = $row['Restaurant_id'];
            // $Restaurant_address = $row['Restaurant_address'];
            // $Restaurant_address = $row['Restaurant_address'];
            // $Restaurant_tel = $row['Restaurant_tel'];
            // $menuDetails = $row['menuDetails'];
      $Restaurant_id = $row['Restaurant_id'];
			$Restaurant_Name = $row['Restaurant_name'];
			$Restaurant_address = $row['Restaurant_address'];
			$Restaurant_tel = $row['Restaurant_Tel'];
			$Restaurant_url = $row['Restaurant_URL'];
			$Restaurant_coordinate = $row['Restaurant_coordinates'];
			$Restaurant_tag = $row['Restaurant_Tag'];
			$Restaurant_criteria = $row['Restaurant_Criteria'];
			$Restaurant_cusine = $row['Restaurant_Cusine'];
			$Restaurant_price = $row['Restaurant_price'];



            $json_str .= "{\"Restaurant_id\":\"$Restaurant_id\",\"Restaurant_Name\":\"$Restaurant_Name\",\"Restaurant_address\":\"$Restaurant_address\",\"Restaurant_tel\":\"$Restaurant_tel\",\"Restaurant_URL\":\"$Restaurant_url\",\"Restaurant_coordinate\":\"$Restaurant_coordinate\",\"Restaurant_tag\":\"$Restaurant_tag\",\"Restaurant_criteria\":\"$Restaurant_criteria\",\"Restaurant_cusine\":\"$Restaurant_cusine\",\"Restaurant_price\":\"$Restaurant_price\"}";

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
