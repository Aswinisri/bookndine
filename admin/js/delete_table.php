<?php
$hotel_id =$_GET['hotel_id'];
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bookndine";

echo "Before connection";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
echo "After connection"; // Add this line

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$delete ="DELETE FROM hotel_details where hotel_id=$hotel_id";
mysqli_query($conn,$delete);
header("Location:C:html\adminIndex.html")
?>