 <?php
// header("Content-type:text/plain");
    // header("Access-Control-Allow-Origin: *");

$con=mysqli_connect("localhost","root","","jhalal");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

session_start();
        if(!isset($_SESSION['admin'])) {
            
			 $uname  = mysqli_real_escape_string($con,$_REQUEST['username']);
			$pword  = mysqli_real_escape_string($con,$_REQUEST['password']);

			$query = "SELECT * FROM admin WHERE username='uname' && password='pword'";
			$result = mysqli_query($con,$query);
			// echo 'ayam';
			
			 
        if($result)
        {
            $row = mysqli_fetch_assoc($result);
            
            session_start();
            //$_SESSION['adminID'] = $row['adminID'];
            $_SESSION['username'] = $row['username'];
           // $_SESSION['adminType'] = $row['adminType'];
            
            header("location:index.html");
        }
        else
        {
            header("location:login.html");
        }
        
        mysqli_close($con);
    }
?>