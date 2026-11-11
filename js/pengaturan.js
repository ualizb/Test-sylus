lucide.createIcons();

const modal = document.getElementById('profileModal');
const form = document.getElementById('profileForm');

function bukaModal() {
    modal.classList.add('show');
}

function tutupModal() {
    modal.classList.remove('show');
}

document.getElementById('editProfile').addEventListener('click', bukaModal);

document.querySelectorAll('[data-close]').forEach(function (tombol) {
    tombol.addEventListener('click', function () {
        form.reset();
        tampilkanSandi(false);
        tutupModal();
    });
});

// Klik area gelap menutup
modal.addEventListener('click', function (e) {
    if (e.target === modal) tutupModal();
});

// Esc menutup
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') tutupModal();
});

const kolomSandi = ['sandiLama', 'sandiBaru', 'sandiKonfirmasi'].map(function (id) {
    return document.getElementById(id);
});
const centang = document.getElementById('showPassword');

function tampilkanSandi(tampil) {
    kolomSandi.forEach(function (input) {
        input.type = tampil ? 'text' : 'password';
    });
}

centang.addEventListener('change', function () {
    tampilkanSandi(centang.checked);
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    tutupModal();
    alert('Perubahan tersimpan (contoh tampilan).');
});