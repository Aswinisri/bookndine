<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bookndine";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo "
        <script type=\"text/javascript\">
          sessionStorage.setItem('connection_error', '" . $conn->connect_error . "');
        </script>
    ";
    die("Connection failed: " . $conn->connect_error);
}

// Initialize response array
$response = array();

// Fetch data from the HOTEL_DETAILS table based on the selected location
if (isset($_GET['location'])) {
    $selectedLocation = $_GET['location'];
    $query = "SELECT * FROM HOTEL_DETAILS WHERE location_id = (SELECT location_id FROM LOCATIONS WHERE location_name = '$selectedLocation')";

    // Execute the query
    $result = mysqli_query($conn, $query);

    // Check for errors
    if (!$result) {
        die('Error in query: ' . mysqli_error($conn));
    }

    // Fetch the data
    $hotels = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $hotels[] = $row;
    }

    // Add hotels data to the response array
    $response['hotels'] = $hotels;
} elseif (isset($_GET['hotelId'])) {
    $hotelId = $_GET['hotelId'];

    // Fetch details for the specified hotel
    $query = "SELECT * FROM SPECIAL_ITEMS WHERE hotel_id = $hotelId";
    $result = $conn->query($query);

    $specialItems = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $specialItems[] = array(
                'hotel_id' => $row['hotel_id'],
                'special_item_id' => $row['special_item_id'],
                'item_name' => $row['item_name'],
                'item_price' => $row['item_price'],
                'item_description' => $row['item_description']
            );
        }

        // Add special items data to the response array
        $response['special_items'] = $specialItems;

        // Fetch hotel details
        $query2 = "SELECT * FROM HOTEL_DETAILS WHERE hotel_id = $hotelId";
        $result2 = $conn->query($query2);

        if ($result2->num_rows > 0) {
            $hotelDetails = $result2->fetch_assoc();
            // Add hotel details data to the response array
            $response['hotel_details'] = $hotelDetails;
        } else {
            // Handle case where hotel details are not found
            $response['error'] = 'Hotel details not found.';
        }
    } else {
        // Handle case where special items are not found
        $response['error'] = 'Special items not found.';
    }
} else {
    // Handle case where location parameter is not set
    $response['error'] = 'Location parameter not set.';
}

// Close the database connection
$conn->close();

// Return the data as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
