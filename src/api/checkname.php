<?php
	include 'connect.php';
	$username = isset($_GET['username'])?$_GET['username']:null;
	$sql = "select * from user where username='$username'";
	$return = $conn->query($sql);
	if($return->num_rows>0){
		echo 'no';
	}else{
		echo 'yes';
	}
?>