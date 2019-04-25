<?php
    //Connection to DB
    $connection = new mysqli("localhost", "root", "", "DBCourse");
    //Check connection
    if ($connection->connect_error){
        die("Connection failed: " . $connection->connect_error);
        echo "1";
        return;
    }

    //Check if reigster or login
    if (isset($_POST["email"])) {
      // Register
      $email = $_POST["email"];
      $username = $_POST["username"];
      $password = md5($_POST["password"]);
      $sql = "INSERT INTO User(
      email, username, password, registeration_date)
      VALUES ('$email', '$username', '$password', now())";
      if ($connection->query($sql) === TRUE) {
          echo "2";
      } else {
          echo "3".$connection->error;
      }
    }

    else {
      // Login
      $username = $_POST["username"];
      $password = md5($_POST["password"]);
      $sql = "SELECT * FROM User WHERE username = '$username' ";
      $result = $connection->query($sql);
      if ($result->num_rows > 0) {
          $row = $result->fetch_assoc();
          if($row["password"] == $password){
            echo "4". $username;
          }
          else{
            echo "5";
          }
      } else {
          echo "6";
      }
    }


    $connection->close();

?>
