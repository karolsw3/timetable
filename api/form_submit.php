<?php
	include("../config.php");

	$data = json_decode(file_get_contents('php://input'), true);
	$table = $data["table"];

	$entries = "";
	$values = "";

	foreach($data as $key => $val)
	{
		if($key !== "table"){
			$entries .= "`".$key."`,";
			$values .= "'".$val."',";
		}
	}

	$entries = rtrim($entries,", ");
	$values = rtrim($values,", ");

	$query = mysqli_query($a,"insert into $table (".$entries.") values (".$values.")");

	if($a->error !== ""){
		$arr = array("type" => "error", "message" => "$a->error");
		echo json_encode($arr);
	}else{
		$arr = array("type" => "success", "message" => "Nowy rekord do tabeli $table został pomyślnie dodany!");
		echo json_encode($arr);
	}

?>


