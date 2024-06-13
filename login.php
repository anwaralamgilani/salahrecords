<?php
include('db.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['usernameLogin'];
    $password = $_POST['passwordLogin'];
    
    // Validate inputs
    if (empty($username) || empty($password)) {
        echo "Please fill in all fields.";
        exit;
    }

    // Check the user in the database
    $sql = "SELECT id,userpass FROM users WHERE username='$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        if (password_verify($password, $row['userpass'])) {
            session_start();
            $_SESSION['user_id'] = $row['id']; 
            echo "Login successful!";
        } else {
            echo "Invalid username or password.";
        }
    } else {
        echo "Invalid username or password.";
    }

    $conn->close();
}
?>
