<?php
	include("../config.php");
	$table = $_GET['table'];// <------------ GET USER LOGIN TO CHECK STATS

	$sql = "SHOW COLUMNS FROM $table";
	$result = mysqli_query($a,$sql);
	while($row = mysqli_fetch_array($result)){
		echo $row['Field']."<br>";
	}
	//$arr = array('lvl' => $user_lvl, 'atk' => $user_atk, 'def' => $user_def, 'hp' => $user_hp, 'exp' => $user_exp,
	//	'maxexp' => $user_maxexp, 'energy' => $user_energy,'maxenergy' => $user_maxenergy, 'silver_coins' => $user_silver_coins, 'golden_coins' => $user_golden_coins);
	//echo json_encode($arr);

?>


