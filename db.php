<?php
    $servername = "localhost";    $username = "root";    $password = "root";    $dbname = "local";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
?>