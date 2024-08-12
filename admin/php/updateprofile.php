<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bookndine";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get JSON data from the request
    $jsonData = file_get_contents('php://input');

    // Decode JSON data
    $updatedProfile = json_decode($jsonData, true);

    // Extract values from updatedProfile
    $userId = $updatedProfile['userId'];
    $userName = $updatedProfile['userName'];
    $userMobile = $updatedProfile['userMobile'];
    $userGender = $updatedProfile['userGender'];

    // Prepare the statement
    $stmt = $conn->prepare("UPDATE user_details SET full_name=?, mobile=?, gender=? WHERE user_id=?");

    // Check if the prepare statement was successful
    if ($stmt) {
        // Bind parameters
        $stmt->bind_param("sssi", $userName, $userMobile, $userGender, $userId);

        // Execute the statement
        if ($stmt->execute()) {
            $response = array('success' => true, 'message' => 'Profile updated successfully');
            echo json_encode($response);
        } else {
            $response = array('success' => false, 'message' => 'Error updating profile: ' . $stmt->error);
            echo json_encode($response);
        }

        // Close the statement
        $stmt->close();
    } else {
        $response = array('success' => false, 'message' => 'Error preparing SQL statement: ' . $conn->error);
        echo json_encode($response);
    }

    // Close the connection
    $conn->close();
}

?>
