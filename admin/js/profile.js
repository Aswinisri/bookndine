window.onload = function () {

}

function showEditPage() {
  document.getElementById('profile-page').classList.add('d-none');
  document.getElementById('edit-page').classList.remove('d-none');
}

function showProfilePage() {
  document.getElementById('edit-page').classList.add('d-none');
  document.getElementById('profile-page').classList.remove('d-none');
}