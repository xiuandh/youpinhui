<?php
	include 'connect.php';
	$username = isset($_GET['username'])?$_GET['username']:null;
	$telphone = isset($_GET['telphone'])?$_GET['telphone']:null;
	$userpad = isset($_GET['userpad'])?$_GET['userpad']:null;
	$sql = "insert into user (username,password.telphone) values('$username','userpad','$telphone')";
	//运行写入数据并返回数据
	$return = $conn->query($sql);
	if($return){
		echo 'success';
	}else{
		echo 'fail';
	}
?>