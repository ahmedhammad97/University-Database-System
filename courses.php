<?php
    //Connection to DB
    $connection = new mysqli("localhost", "root", "", "DBCourse");
    //Check connection
    if ($connection->connect_error){
        die("Connection failed: " . $connection->connect_error);
        echo "1";
        return;
    }

    $dept = $_POST["dept"];
    $name = $_POST["name"];
    $sql = "SELECT * FROM Course WHERE department_id = '$dept' ";
    $result = $connection->query($sql);
    $rows = [];
    while($row = mysqli_fetch_array($result))
    {
        $rows[] = $row;
    }
    echo json_encode($rows);

    $sql = "UPDATE User SET department_id = '$dept' WHERE username = '$name' ";
    $result = $connection->query($sql);


    $connection->close();

?>
