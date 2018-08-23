<?php
	include 'connect.php';
	// $pageQuity = isset($_GET['quity'])?$_GET['quity']:null;
	$pageQuity = 6;
	$page = isset($_POST['pagenum'])?$_POST['pagenum']:null;
	$sql = "select * from goods";
	$result = $conn->query($sql);
	//总记录数
	$total = $result->num_rows;

	//总页数
	$totalPage = ceil($total/$pageQuity);
	//第一页显示的数量
	$startPage = $page*$pageQuity;
	//返回给前端的数据
	// $arr['total'] = $total;
	$arr['pageQuity'] = $pageQuity;
	$arr['totalPage'] = $totalPage;
	$mySql = "select * from goods order by id asc limit $startPage,$pageQuity";
	$return = $conn->query($mySql);

	if($return->num_rows>0){
		// 获取结果集中所有的数据
		while($row = $return->fetch_array(MYSQL_ASSOC)){
			// var_dump($row);
			$arr['list'][]=array(
				'id' => $row['id'],
				'title' => $row['name'],
				'imgUrl' =>$row['image'],
				'commentnum'=>$row['commentnum'],
				'price'=>$row['price']
			);
			// var_dump($arr);
			
			// var_dump($row);
			}echo json_encode($arr,JSON_UNESCAPED_UNICODE);
	}else{
		echo '0个结果';
	}
?>