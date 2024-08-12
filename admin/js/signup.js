window.onload = function () {
	var isSignedup = sessionStorage.getItem('signup');
	if (isSignedup === true || isSignedup === "true") {
		alert('Signup Success !');
		sessionStorage.setItem('signup', false);
	}
}

// function formValidation() {
// 	var userName = document.getElementById('username').value;
// 	var email = document.getElementById('email').value;
// 	var mobile = document.getElementById('mobile').value;
// 	var gender = document.getElementById('gender').value;
// 	var pass = document.getElementById('password').value;
// 	var confPass = document.getElementById('confirm_password').value;
// }

document.addEventListener('DOMContentLoaded', function () {
	var forms = document.querySelectorAll('.requires-validation');
	forms.forEach(function (form) {
		form.addEventListener('submit', function (event) {
			if (!form.checkValidity()) {
				event.preventDefault();
				event.stopPropagation();
			}
			form.classList.add('was-validated');
		}, false);
	});
});

function goBack() {
	window.location.replace('login.html');
}