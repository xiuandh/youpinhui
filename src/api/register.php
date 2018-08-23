<?php
	include 'connect.php';
	$userpd = isset($_POST['userpd'])?$_POST['userpd']:null;
	$sql = "select * from user where telphone='$userpd'";
	$result = $conn->query($sql);
	if($result->num_rows>0){
		echo 'no';
	}else{
		echo 'yes';
	}
?>