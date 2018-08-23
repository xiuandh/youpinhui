<?php
	include 'connect.php';
	$telphone = isset($_GET['telp'])?$_GET['telp']:null;
	$userpad = isset($_GET['passw'])?$_GET['passw']:null;
	$sql = "insert into user (password,telphone) values('$userpad','$telphone')";
	//运行写入数据并返回数据
	$return = $conn->query($sql);
	if($return){
		echo 'success';
	}else{
		echo 'fail';
	}
?>