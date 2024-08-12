window.onload = function () {
	loadMenu();
	// Retrieve selected hotel name from sessionStorage
	var hotelDetails = JSON.parse(sessionStorage.getItem('selected_hotel'));
	var selectedHotelName = hotelDetails.hotel_name;
	var selectedHotelAddress = hotelDetails.address;
	var selectedHotelCost = hotelDetails.price_per_person;
	var selectedHotelSpecials = JSON.parse(sessionStorage.getItem('selected_hotel_specials'));

	// Display the selected hotel name in the 'hotel-name' div
	var hotelNameElement = document.getElementById('hotel-name');
	var hotelAddressElement = document.getElementById('hotel-address');
	var hotelCostElement = document.getElementById('hotel-cost');
	if (selectedHotelName && selectedHotelAddress && selectedHotelCost && selectedHotelSpecials) {
		hotelNameElement.innerText = selectedHotelName;
		hotelAddressElement.innerText = 'Location: ' + selectedHotelAddress;
		hotelCostElement.innerText = 'Rs. ' + selectedHotelCost + '/ Person';
		loadSpecialItems(selectedHotelSpecials);
	} else {
		hotelNameElement.innerText = 'No hotel selected';
	}
}

function loadSpecialItems(specialDishes) {
	var specialMenuContent = '';
	if (specialDishes.length > 0) {
		specialMenuContent += '<h5 class="section-title text-center py-4 mb-4" style="font-size: xx-large; color: black; font-weight: 700;">Restaurant Specials</h5>' +
			'<div class="row g-4">';
		for (let i = 0; i < specialDishes.length; i++) {
			let food = specialDishes[i];
			specialMenuContent +=
				'<div class="col-lg-6 mt-3">' +
				'<div class="d-flex align-items-center">' +
				'<img class="flex-shrink-0 img-fluid rounded" src="../../img/menu-1.jpg" alt="" style="width: 80px;">' +
				'<div class="w-100 d-flex flex-column text-start ps-4">' +
				'<h5 class="d-flex justify-content-start border-bottom pb-2" style="font-size: larger;">' +
				'<span>' + food.item_name + ' - Rs. ' + food.item_price + '</span>' +
				'<div class="number d-flex">' +
				'<span class="minus" id="' + food.special_item_id + '" onclick="minusCount(this)"> <i class="fa fa-minus"></i> </span>' +
				'<input class="count" id="spcl-item-count-' + i + '" type="text" value="0"/>' +
				'<span class="plus" id="' + food.special_item_id + '" onclick="plusCount(this)"> <i class="fa fa-plus"></i> </span>' +
				'</div>' +
				'</h5>' +
				'<small class="fst-italic">' + food.item_description + '</small>' +
				'</div>' +
				'</div>' +
				'</div>';
		}
		specialMenuContent += '</div>' +
		'<button class="btn btn-outline-primary btn-sm" id="' + hotelDetail.hotel_id + '" type="button" onclick="removeHotel(obj)">Remove</button>' 
	}
	document.getElementById('spcl-items-tab').innerHTML = specialMenuContent;
}

function removeHotel(obj) {
	var hotelId = obj.id;
  
	// Store hotel_id in sessionStorage
	sessionStorage.setItem('hotel_id', hotelId);
  
	var xhr = new XMLHttpRequest();
  
}
function goToSpecials() {
	// window.location = '#spcl-items-tab';
	window.location = '#food-menu';
}

function minusCount(obj) {
	var input = null;
	obj.parentElement.childNodes.forEach(function (child) {
		let childId = child.id;
		if (childId.includes('spcl-item-count-')) {
			input = document.getElementById(childId);
		}
	});
	if (!input) {
		return;
	}
	var count = parseInt(input.value) - 1;
	count = count <= 0 ? 0 : count;
	input.value = count;
	input.innerHTML = count;

	var specialItemId = obj.id;
	var specialArray = JSON.parse(sessionStorage.getItem('selected_hotel_specials'));
	for (let i = 0; i < specialArray.length; i++) {
		if (specialArray[i].special_item_id == specialItemId) {
			specialArray[i].count = count;
			let price = parseFloat(specialArray[i].item_price);
			let total = sessionStorage.getItem('total_amount') && parseFloat(sessionStorage.getItem('total_amount')) > 0 ? parseFloat(sessionStorage.getItem('total_amount')) : 0.00;
			sessionStorage.setItem('total_amount', total >= 0 ? total - price : total);
		}
	}
	sessionStorage.setItem('selected_hotel_specials', JSON.stringify(specialArray));
}

function plusCount(obj) {
	var input = null;
	obj.parentElement.childNodes.forEach(function (child) {
		let childId = child.id;
		if (childId.includes('spcl-item-count-')) {
			input = document.getElementById(childId);
		}
	});
	if (!input) {
		return;
	}
	var count = parseInt(input.value) + 1;
	input.value = count;
	input.innerHTML = count;

	var specialItemId = obj.id;
	var specialArray = JSON.parse(sessionStorage.getItem('selected_hotel_specials'));
	for (let i = 0; i < specialArray.length; i++) {
		if (specialArray[i].special_item_id == specialItemId) {
			specialArray[i].count = count;
			let price = parseFloat(specialArray[i].item_price);
			let total = sessionStorage.getItem('total_amount') ? parseFloat(sessionStorage.getItem('total_amount')) : 0.00;
			sessionStorage.setItem('total_amount', total + price);
		}
	}
	sessionStorage.setItem('selected_hotel_specials', JSON.stringify(specialArray));
}

function loadMenu() {
	var vegMenuContent = '';
	var nonVegMenuContent = '';
	var dessertMenuContent = '';
	for (let i = 0; i < vegCuisines.length; i++) {
		let cuisine = vegCuisines[i];
		let foods = vegMenu[cuisine];
		vegMenuContent += '<h5 class="section-title text-center py-4" style="font-size: xx-large; color: black; font-weight: 700;">' + cuisine + '</h5>' +
			'<div class="row g-4">';
		for (let j = 0; j < foods.length; j++) {
			let food = foods[j];
			vegMenuContent +=
				'<div class="col-lg-6 mt-3">' +
				// '<div class="d-flex align-items-center">' +
				// '<img class="flex-shrink-0 img-fluid rounded" src="img/menu-1.jpg" alt="" style="width: 80px;">' +
				'<div class="w-100 d-flex flex-column text-start ps-4">' +
				'<h5 class="d-flex justify-content-center border-bottom pb-2" style="font-size: larger;">' +
				'<span>' + food.foodName + '</span>' +
				// '<span class="text-primary">' + food.cost + '</span>' +
				'</h5>' +
				// '<small class="fst-italic">' + food.desc + '</small>' +
				'</div>' +
				// '</div>' +
				'</div>';
		}
		vegMenuContent += '</div>';
	}
	for (let i = 0; i < nonVegCuisines.length; i++) {
		let cuisine = nonVegCuisines[i];
		let foods = nonVegMenu[cuisine];
		nonVegMenuContent += '<h5 class="section-title text-center py-4" style="font-size: xx-large; color: black; font-weight: 700;">' + cuisine + '</h5>' +
			'<div class="row g-4">';
		for (let j = 0; j < foods.length; j++) {
			let food = foods[j];
			nonVegMenuContent +=
				'<div class="col-lg-6 mt-3">' +
				'<div class="w-100 d-flex flex-column text-start ps-4">' +
				'<h5 class="d-flex justify-content-center border-bottom pb-2" style="font-size: larger;">' +
				'<span>' + food.foodName + '</span>' +
				'</h5>' +
				'</div>' +
				'</div>';
		}
		nonVegMenuContent += '</div>';
	}
	var desserts = vegMenu['Dessert'];
	dessertMenuContent += '<h5 class="section-title text-center py-4" style="font-size: xx-large; color: black; font-weight: 700;">Desserts</h5>' +
		'<div class="row g-4">';
	for (let j = 0; j < desserts.length; j++) {
		let dessert = desserts[j];
		dessertMenuContent +=
			'<div class="col-lg-6 mt-3">' +
			'<div class="w-100 d-flex flex-column text-start ps-4">' +
			'<h5 class="d-flex justify-content-center border-bottom pb-2" style="font-size: larger;">' +
			'<span>' + dessert.foodName + '</span>' +
			'</h5>' +
			'</div>' +
			'</div>';
	}
	dessertMenuContent += '</div>';
	document.getElementById('veg-tab').innerHTML = vegMenuContent;
	document.getElementById('dessert-tab').innerHTML = dessertMenuContent;
	document.getElementById('non-veg-tab').innerHTML = nonVegMenuContent;
}

const vegCuisines = [
	"South Indian",
	"North Indian",
	"Chinese",
	"American",
	"Italian",
];

const nonVegCuisines = [
	"South Indian",
	"North Indian",
	"Chinese",
	"American",
];

const specialDishes = [
	{
		"foodName": "Royal Tandoori Platter",
		"desc": "A grand platter featuring an assortment of tandoori delights.",
		"cost": "Pricing varies"
	},
	{
		"foodName": "Hyderabadi Dum Biryani Feast",
		"desc": "Indulge in the rich flavors of Hyderabadi cuisine with our special dum biryani feast.",
		"cost": "Pricing varies"
	}
];

const vegMenu = {
	"South Indian": [
		{
			"foodName": "Idly",
			"desc": "Steamed rice cakes, often accompanied by sambar and coconut chutney.",
			"cost": "Rs.50"
		},
		{
			"foodName": "Dosa",
			"desc": "Thin rice crepes served with coconut chutney and sambar.",
			"cost": "Rs.60"
		},
		{
			"foodName": "Uttapam",
			"desc": "Thick rice pancake topped with vegetables.",
			"cost": "Rs.55"
		},
		{
			"foodName": "Pongal",
			"desc": "Savory rice and lentil porridge, seasoned with black pepper and ghee.",
			"cost": "Rs.70"
		},
		{
			"foodName": "Vada",
			"desc": "Deep-fried lentil fritters, served with sambar and chutney.",
			"cost": "Rs.40"
		},
		{
			"foodName": "Rasam",
			"desc": "Spiced tamarind soup, typically served with rice.",
			"cost": "Rs.45"
		},
		{
			"foodName": "Coconut Rice",
			"desc": "Fragrant rice cooked with coconut and spices.",
			"cost": "Rs.55"
		},
		{
			"foodName": "Sambar",
			"desc": "Lentil soup with vegetables and tamarind, served with rice.",
			"cost": "Rs.50"
		},
		{
			"foodName": "Vegetable Biryani",
			"desc": "Fragrant rice cooked with mixed vegetables and spices.",
			"cost": "Rs.75"
		},
		{
			"foodName": "Curry Leaf Potato Fry",
			"desc": "Crispy potatoes seasoned with curry leaves and spices.",
			"cost": "Rs.60"
		}
	],
	"North Indian": [
		{
			"foodName": "Paneer Butter Masala",
			"desc": "Soft cottage cheese cubes in a rich tomato-based gravy.",
			"cost": "Rs.80"
		},
		{
			"foodName": "Aloo Gobi",
			"desc": "Potatoes and cauliflower stir-fried with spices.",
			"cost": "Rs.70"
		},
		{
			"foodName": "Palak Paneer",
			"desc": "Paneer cubes in a creamy spinach gravy.",
			"cost": "Rs.85"
		},
		{
			"foodName": "Chana Masala",
			"desc": "Chickpeas in a spicy tomato-based sauce.",
			"cost": "Rs.75"
		},
		{
			"foodName": "Dal Makhani",
			"desc": "Slow-cooked black lentils and kidney beans in a creamy tomato-based sauce.",
			"cost": "Rs.90"
		},
		{
			"foodName": "Matar Paneer",
			"desc": "Peas and paneer in a spiced tomato-based gravy.",
			"cost": "Rs.85"
		},
		{
			"foodName": "Vegetable Kofta",
			"desc": "Deep-fried vegetable balls in a rich curry sauce.",
			"cost": "Rs.80"
		},
		{
			"foodName": "Aloo Jeera",
			"desc": "Potatoes tempered with cumin seeds.",
			"cost": "Rs.55"
		},
		{
			"foodName": "Shahi Paneer",
			"desc": "Paneer cubes in a rich, creamy cashew-based gravy.",
			"cost": "Rs.95"
		},
		{
			"foodName": "Rajma",
			"desc": "Red kidney beans cooked in a thick tomato-based gravy.",
			"cost": "Rs.80"
		}
	],
	"Chinese": [
		{
			"foodName": "Vegetable Manchurian",
			"desc": "Deep-fried veggie balls in a tangy, spicy sauce.",
			"cost": "Rs.70"
		},
		{
			"foodName": "Vegetable Spring Rolls",
			"desc": "Crispy rolls filled with mixed vegetables.",
			"cost": "Rs.60"
		},
		{
			"foodName": "Chilli Paneer",
			"desc": "Paneer cubes in a spicy, tangy sauce.",
			"cost": "Rs.75"
		},
		{
			"foodName": "Vegetable Fried Rice",
			"desc": "Stir-fried rice with mixed vegetables.",
			"cost": "Rs.65"
		},
		{
			"foodName": "Vegetable Hakka Noodles",
			"desc": "Stir-fried noodles with assorted veggies.",
			"cost": "Rs.80"
		},
		{
			"foodName": "Gobi Manchurian",
			"desc": "Crispy cauliflower florets in a flavorful sauce.",
			"cost": "Rs.70"
		},
		{
			"foodName": "Schezwan Vegetables",
			"desc": "Mixed vegetables in a spicy Schezwan sauce.",
			"cost": "Rs.85"
		},
		{
			"foodName": "Vegetable Manchow Soup",
			"desc": "Spicy vegetable soup with crispy noodles.",
			"cost": "Rs.55"
		}
	],
	"American": [
		{
			"foodName": "Macaroni and Cheese",
			"desc": "Classic pasta dish with creamy cheese sauce.",
			"cost": "Rs.90"
		},
		{
			"foodName": "Vegetarian Burger",
			"desc": "Plant-based burger with assorted toppings.",
			"cost": "Rs.85"
		},
		{
			"foodName": "Caesar Salad",
			"desc": "Romaine lettuce, croutons, and Parmesan cheese with Caesar dressing.",
			"cost": "Rs.75"
		},
		{
			"foodName": "Loaded Nachos",
			"desc": "Tortilla chips topped with cheese, beans, and various toppings.",
			"cost": "Rs.80"
		},
		{
			"foodName": "Vegetarian Chili",
			"desc": "Hearty chili with beans, vegetables, and spices.",
			"cost": "Rs.85"
		},
		{
			"foodName": "Spinach and Artichoke Dip",
			"desc": "Creamy dip with spinach, artichokes, and cheese.",
			"cost": "Rs.70"
		},
		{
			"foodName": "Grilled Cheese Sandwich",
			"desc": "Toasted sandwich with melted cheese.",
			"cost": "Rs.65"
		},
		{
			"foodName": "Loaded Potato Skins",
			"desc": "Potato skins filled with cheese, bacon, and sour cream.",
			"cost": "Rs.75"
		},
		{
			"foodName": "Vegetarian Pasta Primavera",
			"desc": "Pasta with a variety of fresh, sautéed vegetables.",
			"cost": "Rs.90"
		},
		{
			"foodName": "Sweet Potato Fries",
			"desc": "Crispy sweet potato fries served with a dipping sauce.",
			"cost": "Rs.70"
		}
	],
	"Italian": [
		{
			"foodName": "Spaghetti Aglio e Olio",
			"desc": "Spaghetti with garlic, olive oil, and chili flakes.",
			"cost": "Rs.80"
		},
		{
			"foodName": "Vegetarian Lasagna",
			"desc": "Layered pasta with ricotta, marinara sauce, and vegetables.",
			"cost": "Rs.95"
		},
		{
			"foodName": "Margherita Pizza",
			"desc": "Pizza with tomato, mozzarella, and fresh basil.",
			"cost": "Rs.85"
		},
		{
			"foodName": "Risotto Primavera",
			"desc": "Creamy risotto with a mix of fresh spring vegetables.",
			"cost": "Rs.100"
		},
		{
			"foodName": "Eggplant Parmesan",
			"desc": "Breaded and baked eggplant slices with marinara and cheese.",
			"cost": "Rs.90"
		},
		{
			"foodName": "Gnocchi with Pesto",
			"desc": "Potato dumplings in a basil pesto sauce.",
			"cost": "Rs.85"
		},
		{
			"foodName": "Minestrone Soup",
			"desc": "Hearty vegetable soup with pasta and beans.",
			"cost": "Rs.75"
		},
		{
			"foodName": "Caprese Salad",
			"desc": "Tomato, mozzarella, and basil salad drizzled with balsamic glaze.",
			"cost": "Rs.80"
		},
		{
			"foodName": "Fettuccine Alfredo",
			"desc": "Creamy Alfredo sauce over fettuccine pasta.",
			"cost": "Rs.95"
		},
		{
			"foodName": "Bruschetta",
			"desc": "Toasted bread topped with diced tomatoes, garlic, and basil.",
			"cost": "Rs.70"
		}
	],
	"Dessert": [
		{
			"foodName": "Chocolate Cake",
			"desc": "Moist chocolate cake with rich chocolate frosting.",
			"cost": "Rs.60"
		},
		{
			"foodName": "Vanilla Ice Cream",
			"desc": "Classic vanilla-flavored ice cream.",
			"cost": "Rs.40"
		},
		{
			"foodName": "Fruit Tart",
			"desc": "Buttery tart filled with fresh fruits and custard.",
			"cost": "Rs.75"
		},
		{
			"foodName": "Gulab Jamun",
			"desc": "Deep-fried milk dumplings soaked in sugar syrup.",
			"cost": "Rs.50"
		},
		{
			"foodName": "Tiramisu",
			"desc": "Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cheese.",
			"cost": "Rs.90"
		},
		{
			"foodName": "Strawberry Cheesecake",
			"desc": "Cheesecake with a strawberry topping.",
			"cost": "Rs.85"
		},
		{
			"foodName": "Mango Sorbet",
			"desc": "Refreshing sorbet made with ripe mangoes.",
			"cost": "Rs.55"
		},
		{
			"foodName": "Rasgulla",
			"desc": "Soft and spongy cottage cheese balls soaked in sugar syrup.",
			"cost": "Rs.65"
		},
		{
			"foodName": "Panna Cotta",
			"desc": "Italian dessert of sweetened cream set with gelatin.",
			"cost": "Rs.80"
		},
		{
			"foodName": "Lemon Tart",
			"desc": "Tart filled with lemon-flavored custard.",
			"cost": "Rs.70"
		}
	]
};

const nonVegMenu = {
	"South Indian":
		[
			{
				"foodName": "Chicken Biryani",
				"desc": "Fragrant rice cooked with chicken and spices.",
				"cost": "Rs.120"
			},
			{
				"foodName": "Chettinad Chicken Curry",
				"desc": "Spicy chicken curry with Chettinad masala.",
				"cost": "Rs.110"
			},
			{
				"foodName": "Fish Curry",
				"desc": "Tangy and flavorful curry with fish.",
				"cost": "Rs.130"
			},
			{
				"foodName": "Andhra Chicken Fry",
				"desc": "Deep-fried chicken pieces with Andhra spices.",
				"cost": "Rs.100"
			},
			{
				"foodName": "Mutton Korma",
				"desc": "Rich and creamy mutton curry.",
				"cost": "Rs.140"
			},
			{
				"foodName": "Chicken 65",
				"desc": "Spicy and deep-fried chicken appetizer.",
				"cost": "Rs.90"
			},
			{
				"foodName": "Kerala Fish Curry",
				"desc": "Traditional fish curry with coconut and spices.",
				"cost": "Rs.120"
			},
			{
				"foodName": "Mutton Biryani",
				"desc": "Flavorful rice dish with tender mutton pieces.",
				"cost": "Rs.140"
			},
			{
				"foodName": "Hyderabadi Chicken Kebab",
				"desc": "Grilled chicken kebabs with Hyderabadi spices.",
				"cost": "Rs.110"
			},
			{
				"foodName": "Prawn Masala",
				"desc": "Prawns cooked in a spicy and aromatic masala.",
				"cost": "Rs.130"
			}
		],
	"North Indian":
		[
			{
				"foodName": "Chicken Tikka Masala",
				"desc": "Grilled chicken in a creamy tomato-based sauce.",
				"cost": "Rs.150"
			},
			{
				"foodName": "Butter Chicken",
				"desc": "Tender chicken in a rich and buttery tomato sauce.",
				"cost": "Rs.160"
			},
			{
				"foodName": "Rogan Josh",
				"desc": "Slow-cooked lamb in a flavorful curry.",
				"cost": "Rs.170"
			},
			{
				"foodName": "Keema Naan",
				"desc": "Flatbread stuffed with spiced minced meat.",
				"cost": "Rs.80"
			},
			{
				"foodName": "Fish Tandoori",
				"desc": "Marinated and grilled fish.",
				"cost": "Rs.140"
			},
			{
				"foodName": "Lamb Kofta",
				"desc": "Minced lamb meatballs in a rich curry.",
				"cost": "Rs.170"
			},
			{
				"foodName": "Chicken Korma",
				"desc": "Chicken curry with a creamy and nutty sauce.",
				"cost": "Rs.160"
			},
			{
				"foodName": "Tandoori Lamb Chops",
				"desc": "Grilled lamb chops marinated in Tandoori spices.",
				"cost": "Rs.180"
			},
			{
				"foodName": "Amritsari Fish Fry",
				"desc": "Crispy and spiced fried fish from Amritsar.",
				"cost": "Rs.150"
			},
			{
				"foodName": "Rajasthani Laal Maas",
				"desc": "Spicy Rajasthani curry with red meat.",
				"cost": "Rs.190"
			}
		],
	"American":
		[
			{
				"foodName": "BBQ Ribs",
				"desc": "Slow-cooked and grilled pork ribs with BBQ sauce.",
				"cost": "Rs.180"
			},
			{
				"foodName": "Buffalo Wings",
				"desc": "Spicy chicken wings with Buffalo sauce.",
				"cost": "Rs.160"
			},
			{
				"foodName": "Clam Chowder",
				"desc": "Creamy soup with clams, bacon, and potatoes.",
				"cost": "Rs.120"
			},
			{
				"foodName": "Lobster Roll",
				"desc": "Roll filled with lobster meat in a mayonnaise-based dressing.",
				"cost": "Rs.200"
			},
			{
				"foodName": "Steak with Mushroom Sauce",
				"desc": "Grilled steak topped with savory mushroom sauce.",
				"cost": "Rs.190"
			},
			{
				"foodName": "New York Strip Steak",
				"desc": "Grilled and juicy strip steak, a classic American dish.",
				"cost": "Rs.190"
			},
			{
				"foodName": "Southern Fried Chicken",
				"desc": "Crispy and seasoned fried chicken from the southern U.S.",
				"cost": "Rs.180"
			},
			{
				"foodName": "Cajun Shrimp and Grits",
				"desc": "Spicy Cajun-seasoned shrimp served with creamy grits.",
				"cost": "Rs.170"
			},
			{
				"foodName": "Jambalaya",
				"desc": "Creole dish with a mix of meat, rice, and vegetables.",
				"cost": "Rs.160"
			},
			{
				"foodName": "Maryland Crab Cakes",
				"desc": "Pan-fried crab cakes made with lump crab meat.",
				"cost": "Rs.200"
			}
		],
	"Chinese":
		[
			{
				"foodName": "Szechuan Chicken",
				"desc": "Spicy stir-fried chicken with Szechuan sauce.",
				"cost": "Rs.110"
			},
			{
				"foodName": "Sweet and Sour Pork",
				"desc": "Crispy pork in a sweet and tangy sauce.",
				"cost": "Rs.120"
			},
			{
				"foodName": "Beef and Broccoli",
				"desc": "Stir-fried beef with broccoli in a savory sauce.",
				"cost": "Rs.130"
			},
			{
				"foodName": "Prawn Fried Rice",
				"desc": "Stir-fried rice with prawns and vegetables.",
				"cost": "Rs.100"
			},
			{
				"foodName": "Chicken Manchurian",
				"desc": "Deep-fried chicken balls in Manchurian sauce.",
				"cost": "Rs.140"
			},
			{
				"foodName": "Kung Pao Chicken",
				"desc": "Spicy and flavorful chicken stir-fry.",
				"cost": "Rs.120"
			},
			{
				"foodName": "Peking Duck",
				"desc": "Roasted duck with hoisin sauce and pancakes.",
				"cost": "Rs.200"
			},
			{
				"foodName": "Mongolian Beef",
				"desc": "Beef stir-fry with a savory Mongolian sauce.",
				"cost": "Rs.130"
			},
			{
				"foodName": "Hot and Sour Soup with Shrimp",
				"desc": "Spicy and tangy soup with shrimp and vegetables.",
				"cost": "Rs.110"
			},
			{
				"foodName": "Sesame Crispy Chicken",
				"desc": "Crispy chicken coated in sesame seeds and sweet sauce.",
				"cost": "Rs.140"
			}
		],
	"Dessert": [
		{
			"foodName": "Chocolate Cake",
			"desc": "Moist chocolate cake with rich chocolate frosting.",
			"cost": "Rs.60"
		},
		{
			"foodName": "Vanilla Ice Cream",
			"desc": "Classic vanilla-flavored ice cream.",
			"cost": "Rs.40"
		},
		{
			"foodName": "Fruit Tart",
			"desc": "Buttery tart filled with fresh fruits and custard.",
			"cost": "Rs.75"
		},
		{
			"foodName": "Gulab Jamun",
			"desc": "Deep-fried milk dumplings soaked in sugar syrup.",
			"cost": "Rs.50"
		},
		{
			"foodName": "Tiramisu",
			"desc": "Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cheese.",
			"cost": "Rs.90"
		},
		{
			"foodName": "Strawberry Cheesecake",
			"desc": "Cheesecake with a strawberry topping.",
			"cost": "Rs.85"
		},
		{
			"foodName": "Mango Sorbet",
			"desc": "Refreshing sorbet made with ripe mangoes.",
			"cost": "Rs.55"
		},
		{
			"foodName": "Rasgulla",
			"desc": "Soft and spongy cottage cheese balls soaked in sugar syrup.",
			"cost": "Rs.65"
		},
		{
			"foodName": "Panna Cotta",
			"desc": "Italian dessert of sweetened cream set with gelatin.",
			"cost": "Rs.80"
		},
		{
			"foodName": "Lemon Tart",
			"desc": "Tart filled with lemon-flavored custard.",
			"cost": "Rs.70"
		}
	]
};