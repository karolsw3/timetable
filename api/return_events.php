
<?php
    include("../config.php");

    $query = mysqli_query($a,"select * from deads");

    $events = [];

    $dates = "";
    $title = "";
    $location = "";

    while($data = mysqli_fetch_array($query)){

        $dates = $data["deadLines"];
        $title = $data["name"];
        $location = $data["town"];

        $dates = explode(";",$dates);

        for($i=0;$i<sizeof($dates);$i++){

            $year = substr($dates[$i], 6,4);
            $month = substr($dates[$i], 3,2);
            $day = substr($dates[$i], 0,2);
    
            $dates[$i] = $year."-".$month."-".$day; // Convert date to retard so retarded calendar can read it.

            if($dates[$i] !== "--"){
                $event = (object) array('date' => $dates[$i], 'title' => $title, 'location' => $location);
                array_push($events, $event);
            }
        }

    }
    
    echo json_encode($events);

?>

