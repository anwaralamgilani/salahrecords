<?php
session_start();
include('db.php');

?>
<!DOCTYPE html>
<html>
<head>
    <title>Salah Recorder</title>
    <link rel="stylesheet" type="text/css" href="http://avas.local:10057/salahrecord/style.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="http://avas.local:10057/salahrecord/script.js"></script>
</head>
<body>
    <div class="tab-header">
        <div class="tab-header-item">Register</div>
        <div class="tab-header-item">Login</div>
    </div>
    <div class="tab-content">
        <div class="tab" id="register-tab">
        <div class="displayMessage"></div>

            <h1>Register</h1>
            <form id="register-form" method="post">
                <input type="hidden" name="register" value="1">
                <label>Username:</label>
                <input type="text" name="username" required>
                <label>Password:</label>
                <input type="password" name="password" required>
                <button type="submit">Register</button>
            </form>
        </div>
        <div class="tab" id="login-tab">
        <div class="displayMessage"></div>

            <h1>Login</h1>
            <form id="login-form" method="post">
                <input type="hidden" name="login" value="1">
                <label>Username:</label>
                <input type="text" name="usernameLogin" required>
                <label>Password:</label>
                <input type="password" name="passwordLogin" required>
                <button type="submit">Login</button>
            </form>
        </div>
    </div>
</body>
</html>
