<?php
session_start();
include('db.php');
if(!isset($_SESSION['user_id'])){
    header("http://avas.local:10057/salahrecord/");
}
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
    <div class="container">
        <h1>Record your Salah</h1>
        <div class="displayMessage"></div>
        <form id="salah-form" method="post">
            <input type="hidden" name="record_salah" value="1">
            <label><input type="checkbox" name="fajr"> Fajr</label><br>
            <label><input type="checkbox" name="dhuhr"> Dhuhr</label><br>
            <label><input type="checkbox" name="asr"> Asr</label><br>
            <label><input type="checkbox" name="maghrib"> Maghrib</label><br>
            <label><input type="checkbox" name="isha"> Isha</label><br>
            <button type="submit">Save</button>
        </form>
    </div>
    <div class="container">
    <button id="logout-btn">Logout</button>

        <h2>Your Salah Records</h2>
        <div id="previous-records"></div>

        <!--  -->
    </div>
</body>
</html>    
