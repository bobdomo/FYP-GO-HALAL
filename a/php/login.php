<?php
    header("Content-type:text/plain");
    header("Access-Control-Allow-Origin: *");

    session_start();

    $do = mysql_real_escape_string($_REQUEST['do']);
    
    if($do == 'login') {
        if(!isset($_SESSION['admin'])) {
            require_once('connect.php');
    
            $uname = mysql_real_escape_string($_REQUEST['uname']);
            $upword = mysql_real_escape_string($_REQUEST['pword']);
            //echo $uname." && ".$upword;
            $query = "SELECT * FROM user WHERE uname='$uname' && upword='$upword'";
            $result = mysql_query($query);
            
            if($result) {
                while($row = mysql_fetch_assoc($result)) {
                    $username = $row['username'];
                    $userID = $row['userID'];
                    $userType = $row['userType'];
                
                    //echo $username;
                    
                    $_SESSION['admin'] = $username;
                    $_SESSION['userID'] = $userID;
                    $_SESSION['userType'] = $userType;
                    
                    echo 'LOGIN';
                }
            } else {
                echo mysql_error();   
            }  
        }
        else { 
            echo "IN SESSION"; 
        }
        
    } else if($do == 'check') {
          
        if(isset($_SESSION['admin'])) {
            echo "TRUE";
        } else {
            echo 'FALSE';
        }
    } else if($do == 'getUser') {
        
        echo $_SESSION['admin'];
        
    } else if($do == 'getusertype') {
        
        echo $_SESSION['userType'];
        
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
    } else {
        //nothing
    }
    
?>