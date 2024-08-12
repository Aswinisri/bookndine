document.addEventListener('DOMContentLoaded', function () {
    var userName = sessionStorage.getItem('user_name');
    var userRole = sessionStorage.getItem('user_role');
    var gender = sessionStorage.getItem('gender');
    
    document.getElementById('welcome-user').innerText = 'Welcome ' + userName;
    document.getElementById('hotel-name').innerText = 'Hotel Name: ' + sessionStorage.getItem('selected_hotel').hotel_id;
    
    // Load hotels based on the selected location
    var selectedLocation = sessionStorage.getItem('location');
    if (selectedLocation) {
      loadHotelsForLocation(selectedLocation);
    }
    document.getElementById('addHotel').innerText = 'Restaurent Registration in ' + sessionStorage.getItem('selectedLocation');
  });