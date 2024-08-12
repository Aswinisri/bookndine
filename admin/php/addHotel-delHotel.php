<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bookndine";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_POST['hotel_id'])) {
    $hotel_id = $_POST['hotel_id'];

    // Perform your delete operation using $hotel_id
    $stmt = $conn->prepare("DELETE FROM HOTEL_DETAILS WHERE hotel_id = ?");
    $stmt->bind_param("i", $hotel_id);

    if ($stmt->execute()) {
        echo json_encode(array("success" => true, "message" => "Hotel successfully removed"));
    } else {
        echo json_encode(array("error" => "Error executing delete query: " . $conn->error));
    }

    $stmt->close();
} else {
    echo json_encode(array("error" => "Hotel ID not provided"));
}

$conn->close();
?>
