lucide.createIcons();

const bookModal = document.getElementById('bookModal');
const editBookModal = document.getElementById('editBookModal');
const deleteModal = document.getElementById('deleteModal');
const bookForm = document.getElementById('bookForm');

function buka(modal) {
    modal.classList.add('show');
}

function tutupSemua() {
    document.querySelectorAll('.modal-overlay').forEach(function (m) {
        m.classList.remove('show');
    });
}

function setIkon(elemen, nama) {
    elemen.innerHTML = '<i data-lucide="' + nama + '"></i>';
    lucide.createIcons();
}

function ambilDataBaris(tr) {
    const sel = tr.querySelectorAll('td');
    return {
        id: sel[0].textContent.trim(),
        judul: tr.querySelector('.book-title b').textContent.trim(),
        penulis: sel[2].textContent.trim(),
        kategori: sel[3].textContent.trim(),
        stok: sel[4].textContent.trim(),
        tersedia: sel[5].textContent.trim(),
        isbn: tr.dataset.isbn || '',
        rak: tr.dataset.shelf || '',
        warna: tr.querySelector('.bar').style.background
    };
}

document.getElementById('openAddBook').addEventListener('click', function () {
    bookForm.reset();
    buka(bookModal);
});

document.getElementById('bookBody').addEventListener('click', function (e) {
    const tombol = e.target.closest('.icon-edit, .icon-delete');
    if (!tombol) return;

    const tr = tombol.closest('tr');
    const d = ambilDataBaris(tr);
    const status = tr.querySelector('.status').textContent.trim();

    if (tombol.classList.contains('icon-edit')) {
        document.getElementById('editBookId').value = d.id;
        document.getElementById('editBookSub').textContent = d.id + ' \u2022 ' + d.judul;
        document.getElementById('eJudul').value = d.judul;
        document.getElementById('ePenulis').value = d.penulis;
        document.getElementById('eKategori').value = d.kategori;
        document.getElementById('eStok').value = d.stok;
        document.getElementById('eTersedia').value = d.tersedia;
        document.getElementById('eStatus').value = status;
        buka(editBookModal);
    } else {
        document.getElementById('deleteId').value = d.id;
        document.getElementById('deleteSub').textContent = d.id + ' \u2022 ' + d.judul;
        buka(deleteModal);
    }
});

document.querySelectorAll('[data-close]').forEach(function (tombol) {
    tombol.addEventListener('click', tutupSemua);
});

document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) tutupSemua();
    });
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') tutupSemua();
});