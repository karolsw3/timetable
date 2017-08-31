<?php
	include("../config.php");

	$data = json_decode(file_get_contents('php://input'), true);
	$table = $data["table"];
	$id = $data["id"];

	$entries_values = "";

	foreach($data as $key => $val)
	{
		if($key !== "table" && $key !== "id"){
			$entries_values .= $key."='".$val."', ";
		}
	}

	$entries_values = rtrim($entries_values,", ");

	$query = mysqli_query($a,"UPDATE $table SET ".$entries_values." WHERE id='$id'");

	if($a->error !== ""){
		$arr = array("type" => "error", "message" => "$a->error");
		echo json_encode($arr);
	}else{
		$arr = array("type" => "success", "message" => "Pomyślnie edytowano wpis w tabeli!");
		echo json_encode($arr);
	}

?>


