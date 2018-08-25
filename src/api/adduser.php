<?php
	include 'connect.php';
	$telphone = isset($_POST['telp'])?$_POST['telp']:null;
	$userpad = isset($_POST['passw'])?$_POST['passw']:null;
	$sql = "insert into user (password,telphone) values('$userpad','$telphone')";
	//运行写入数据并返回数据
	$return = $conn->query($sql);
	if($return){
		echo 'success';
	}else{
		echo 'fail';
	}
?>