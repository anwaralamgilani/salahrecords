<?php
session_start();
include('db.php');

if (!isset($_SESSION['user_id'])) {
    header("Location: http://avas.local:10057/salahrecord/");
    exit();
}

if (isset($_POST['record_salah'])) {
    $user_id = $_SESSION['user_id'];
    $date = date('Y-m-d');
    $fajr = isset($_POST['fajr']) ? 1 : 0;
    $dhuhr = isset($_POST['dhuhr']) ? 1 : 0;
    $asr = isset($_POST['asr']) ? 1 : 0;
    $maghrib = isset($_POST['maghrib']) ? 1 : 0;
    $isha = isset($_POST['isha']) ? 1 : 0;

    $sql = "INSERT INTO salah_records (user_id, fajr, dhuhr, asr, maghrib, isha, datetime)
            VALUES ('$user_id', '$fajr', '$dhuhr', '$asr', '$maghrib', '$isha', '$date')";

    if ($conn->query($sql) === TRUE) {
        $stmt = $conn->prepare("SELECT datetime, fajr, dhuhr, asr, maghrib, isha FROM salah_records WHERE user_id = ? ORDER BY datetime DESC");
        $stmt->bind_param('i', $user_id);
        $stmt->execute();
        $result = $stmt->get_result();

        $salah_records = [];
        while ($row = $result->fetch_assoc()) {
            $salah_records[] = $row;
        }

        echo json_encode(['status' => 'success', 'message' => 'Record updated successfully!', 'records' => $salah_records]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error inserting record']);
    }
    exit();
}
?>
