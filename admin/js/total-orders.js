window.onload = function () {
	loadOrderHistory();
}

function loadOrderHistory() {
	var historyContent = '';
	for (let i = 0; i < sampleHistory.length; i++) {
		let order = sampleHistory[i];
		historyContent += 
			'<div class="bg-white card mb-4 order-list shadow-sm">' +
			'<div class="gold-members p-4">' +
			'<div class="media">' +
			'<div class="media-body">' +
			'<h6 class="text-primary mb-2">' + order.hotel_name + '</h6>' +
			'<p class="text-gray mb-3"><i class="icofont-list"></i> ORDER ID: #' + order.order_id + ' <i class="icofont-clock-time ml-2"></i></p>' +
			'<p class="text-gray mb-1"><i class="icofont-location-arrow"></i>No of Persons Booked: ' + order.booking_count + '</p>' +
			'<p class="text-gray mb-1"><i class="icofont-location-arrow"></i>' + order.recipient + ' - ' + order.recipient_num + '</p>' +
			'<p class="text-gray">Specials: ' + order.specials + '</p>' +
			'<hr>' +
			'<div class="float-right d-inline-flex">' +
			//'<a class="btn btn-sm btn-primary" href="#"><i class="icofont-refresh"></i> ACCEPT</a>' +
			//'<a class="btn btn-sm btn-outline-primary ms-3" href="#"><i class="icofont-headphone-alt"></i>CANCEL</a>' +
			'<h5 style="position: absolute; left: 10%; margin-top: 0.5rem;">Total Paid: ' + order.total + '</h5>'+
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>' +
			'</div>';
	}
	document.getElementById('order-history').innerHTML = historyContent;
}

var sampleHistory = [
	{
		"order_id": "25102589748",
		"hotel_name": "Barbeque Nation",
		"recipient": "John",
		"recipient_num": "8765678475",
		"specials": "Special dish x 1, Special dish x 2",
		"booking_count": 3,
		"total": 1500
	},
	{
		"order_id": "25102589748",
		"hotel_name": "Barbeque Nation",
		"recipient": "John",
		"recipient_num": "8765678475",
		"specials": "Special dish x 1, Special dish x 2",
		"booking_count": 3,
		"total": 1500
	},
	{
		"order_id": "25102589748",
		"hotel_name": "Barbeque Nation",
		"recipient": "John",
		"recipient_num": "8765678475",
		"specials": "Special dish x 1, Special dish x 2",
		"booking_count": 3,
		"total": 1500
	},
	{
		"order_id": "25102589748",
		"hotel_name": "Barbeque Nation",
		"recipient": "John",
		"recipient_num": "8765678475",
		"specials": "Special dish x 1, Special dish x 2",
		"booking_count": 3,
		"total": 1500
	},
	{
		"order_id": "25102589748",
		"hotel_name": "Barbeque Nation",
		"recipient": "John",
		"recipient_num": "8765678475",
		"specials": "Special dish x 1, Special dish x 2",
		"booking_count": 3,
		"total": 1500
	},
	{
		"order_id": "25102589748",
		"hotel_name": "Barbeque Nation",
		"recipient": "John",
		"recipient_num": "8765678475",
		"specials": "Special dish x 1, Special dish x 2",
		"booking_count": 3,
		"total": 1500
	}
];