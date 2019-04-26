<?php
    //Connection to DB
    $connection = new mysqli("localhost", "root", "", "DBCourse");
    //Check connection
    if ($connection->connect_error){
        die("Connection failed: " . $connection->connect_error);
        echo "1";
        return;
    }

    $sql = "SELECT name, dept_id FROM Department";
    $result = $connection->query($sql);
    $rows = [];
    while($row = mysqli_fetch_array($result))
    {
        $rows[] = $row;
    }
    echo json_encode($rows);


    $connection->close();

?>
