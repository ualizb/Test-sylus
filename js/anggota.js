lucide.createIcons();

const modal = document.getElementById('memberModal');
const tombolBuka = document.getElementById('openModal');
const tombolTutup = document.getElementById('closeModal');
const tombolBatal = document.getElementById('cancelModal');

function bukaModal() {
    modal.classList.add('show');
}

function tutupModal() {
    modal.classList.remove('show');
}

tombolBuka.addEventListener('click', bukaModal);
tombolTutup.addEventListener('click', tutupModal);
tombolBatal.addEventListener('click', tutupModal);

modal.addEventListener('click', function (e) {
    if (e.target === modal) {
        tutupModal();
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        tutupModal();
    }
});

document.querySelectorAll('.toggle-pw').forEach(function (tombol) {
    tombol.addEventListener('click', function () {
        const input = tombol.parentElement.querySelector('input');
        const sedangTersembunyi = input.type === 'password';

        input.type = sedangTersembunyi ? 'text' : 'password';
        tombol.innerHTML = '<i data-lucide="' + (sedangTersembunyi ? 'eye' : 'eye-off') + '"></i>';
        lucide.createIcons();
    });
});