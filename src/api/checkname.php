<?php
	include 'connect.php';
	$usertel = isset($_POST['usertel'])?$_POST['usertel']:null;
	$userpd = isset($_POST['userpd'])?$_POST['userpd']:null;
	$sql = "select * from user where telphone='$usertel' and password='$userpd'";
	$result = $conn->query($sql);
	if($result->num_rows>0){
		echo 'yes';
	}else{
		echo 'no';
	}
?>