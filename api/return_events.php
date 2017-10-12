
<?php
    include("../config.php");

    $query = mysqli_query($a,"select * from deads");

    $events = [];

    $dates = "";
    $title = "";
    $location = "";

    while($data = mysqli_fetch_array($query)){

        $id = $data["id"];
        $dates = $data["deadLines"];
        $title = $data["name"];
        $location = $data["town"];
        $done = $data["deadLinesDone"];

        $isEventDone = false;

        $dates = explode(";",$dates);

        for($i=0;$i<sizeof($dates);$i++){

            $year = substr($dates[$i], 6,4);
            $month = substr($dates[$i], 3,2);
            $day = substr($dates[$i], 0,2);           

            $dates[$i] = $year."-".$month."-".$day; // Convert date to retard so retarded calendar can read it.

            if(strpos($done,$dates[$i])){ // Check if event is already done
                $isEventDone = true;
            }else{
                $isEventDone = false;
            } 

            if($dates[$i] !== "--"){
                $event = (object) array('id' => $id, 'date' => $dates[$i], 'title' => $title, 'location' => $location, 'isEventDone' => $isEventDone);
                array_push($events, $event);
            }
        }

    }
    
    echo json_encode($events);

?>

