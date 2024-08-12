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