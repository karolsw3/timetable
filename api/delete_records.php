<?php
	include("../config.php");

	$data = json_decode(file_get_contents('php://input'), true);
	$table = $data["table"];

	$id = $data["id"];

	$query = "delete from `$table` where id='$id'";

	$message = "";
	if (mysqli_query($a,$query) === true) {
		$message = "Record deleted successfully";
	} else {
		$message = "Error deleting record: " . mysqli_error($a);
	}

	echo json_encode($message);
?>


