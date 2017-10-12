<?php
	include("../config.php");

	$data = json_decode(file_get_contents('php://input'), true);

	$id = $data["id"];
	$date = $data["date"];

	$query = mysqli_query($a, "select * from deads where id='$id'");
	$deadData = mysqli_fetch_array($query);
	$deadLinesDone = $deadData["deadLinesDone"];

	$deadLinesDone .= ";".$date;

	$query = mysqli_query($a,"UPDATE deads SET deadLinesDone='$deadLinesDone' WHERE id='$id'");

	if($a->error !== ""){
		$arr = array("type" => "error", "message" => "$a->error");
		echo json_encode($arr);
	}else{
		$arr = array("type" => "success", "message" => "Pomyślnie edytowano wpis w tabeli! -->".$id);
		echo json_encode($arr);
	}

?>


