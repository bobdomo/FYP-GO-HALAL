<?php
    header("Content-type:text/plain");
    header("Access-Control-Allow-Origin: *");

    session_start();

    $con = mysqli_connect("localhost","root","","test00");
        if(mysqli_connect_errno())
        {
            echo "Failed to connect to Database: " . mysqli_connect_error();
        }	

    $do = mysqli_real_escape_string($con, $_REQUEST['do']);
    
    if($do == 'login') {
        if(!isset($_SESSION['admin'])) {
                
            $uname = mysqli_real_escape_string($con, $_REQUEST['uname']);
            $upword = mysqli_real_escape_string($con, $_REQUEST['pword']);
            //echo $uname." && ".$upword;
            $query = "SELECT * FROM user WHERE uname='$uname' && upword='$upword'";
            $result = mysqli_query($con, $query);
            
            if($result) {
                while($row = mysqli_fetch_assoc($result)) {
                    $username = $row['username'];
                    $userID = $row['userID'];
                    $userType = $row['userType'];
                
                    //echo $username;
                    if($userType == "1"){
                    $_SESSION['admin'] = $username;
                    $_SESSION['userID'] = $userID;
                    //echo $_SESSION['admin'].$_SESSION['userID'].$userType;
                    echo 'LOGIN';
                    }
                    else{
                        echo 'XLOGIN';
                    }
                    
                }
            } else {
                echo mysqli_error($con);   
            }  
        }
        else {
            echo "IN SESSION";
        }
    }

    else if($do == 'check') {
          
        if(isset($_SESSION['admin'])) {
            echo "TRUE";
        } else {
            echo 'FALSE';
        }
    }

    else if($do == 'getUser') {
        
        echo $_SESSION['admin'];
    }

    else if($do == 'getUserID') {
        
        echo $_SESSION['userID'];
        
    }

    else if($do == 'logout') {
        
        if(isset($_SESSION['admin'])) {
            unset($_SESSION['admin']);
            session_destroy();
               
            if(!isset($_SESSION['admin'])) {
                echo 'LOGOUT';
            } else {
                echo 'FAILED';
            }
        }
    } 

    else {
        //nothing
    }
    
?>