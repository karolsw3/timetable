<?php
	include("../config.php");

	$data = json_decode(file_get_contents('php://input'), true);
	$table = $data["table"];
	$ID = $data["ID"];

	$query = mysqli_query($a,"select * from `$table` where id='$ID'");

	$data = mysqli_fetch_array($query);

	$count = $query->field_count;

	$data["count"] = $count;

	echo json_encode($data);

?>


