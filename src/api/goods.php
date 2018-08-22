<?php
	include 'connect.php';
	$sql = "select * from goods";
	$result = $conn->query($sql);
	if($result->num_rows>0){
		while($row = $result->fetch_all(MYSQL_ASSOC)){
			echo json_encode($row,JSON_UNESCAPED_UNICODE);
			// var_dump($row);
		}
	}else{
		echo '0个结果';
	}
?>