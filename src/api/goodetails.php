<?php
	include 'connect.php';
	$id = isset($_POST['id'])?$_POST['id']:null;
	// var_dump($id);
	$sql ="select * from goods where id='$id'";
	$result = $conn->query($sql);
	// var_dump($result);
	if($result->num_rows>0){
		while($row = $result->fetch_all(MYSQL_ASSOC)){
			echo json_encode($row,JSON_UNESCAPED_UNICODE);
		}
	}else{
		echo 'fail';
	}
?>