<?php
	include("../config.php");

	$data = json_decode(file_get_contents('php://input'), true);
	$table = $data["table"];

	$query = mysqli_query($a,"SELECT `COLUMN_NAME` FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_NAME`='$table'");

	$rows = $data["rows"];
	$data = [];

	//while($row = mysqli_fetch_array($query)){
		//array_push($rows,$row[0]);
	//}

	$query = mysqli_query($a,"select * from `$table`");

	while($row = mysqli_fetch_array($query)){
		for($i=0;$i<count($rows);$i++){
			array_push($data,$row[$rows[$i]["name"]]);
		}
	}

	$arr = array("rows" => $rows, "data" => $data);
	echo json_encode($arr);
?>


