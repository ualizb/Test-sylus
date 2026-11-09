lucide.createIcons();

const bookModal = document.getElementById('bookModal');
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

    setIkon(document.getElementById('bookModalIcon'), 'book-plus');
    document.getElementById('bookModalTitle').textContent = 'Tambah Buku';
    document.getElementById('bookModalDesc').textContent =
        'Masukkan judul baru. Perubahan katalog hanya berlaku setelah disimpan.';
    document.getElementById('bookModalHint').textContent =
        'Golongan baru otomatis ditandai Tersedia.';
    document.getElementById('bookSubmit').innerHTML =
        '<i data-lucide="plus"></i> Simpan Buku';

    lucide.createIcons();
    buka(bookModal);
});

document.getElementById('bookBody').addEventListener('click', function (e) {
    const tombol = e.target.closest('.icon-edit, .icon-delete');
    if (!tombol) return;

    const d = ambilDataBaris(tombol.closest('tr'));

    if (tombol.classList.contains('icon-edit')) {
        document.getElementById('judul').value = d.judul;
        document.getElementById('penulis').value = d.penulis;
        document.getElementById('isbn').value = d.isbn;
        document.getElementById('jumlah').value = d.stok;
        document.getElementById('rak').value = d.rak;

        const kategori = document.getElementById('kategori');
        Array.from(kategori.options).forEach(function (o) {
            if (o.text === d.kategori) kategori.value = o.value;
        });

        setIkon(document.getElementById('bookModalIcon'), 'pencil');
        document.getElementById('bookModalTitle').textContent = 'Ubah Buku';
        document.getElementById('bookModalDesc').textContent =
            'Perbarui judul ini. Perubahan katalog hanya berlaku setelah disimpan.';
        document.getElementById('bookModalHint').textContent =
            d.id + ' \u2022 ' + d.tersedia + ' dari ' + d.stok + ' eksemplar tersedia saat ini.';
        document.getElementById('bookSubmit').innerHTML =
            '<i data-lucide="check"></i> Simpan perubahan';

        lucide.createIcons();
        buka(bookModal);
    } else {
        document.getElementById('deleteId').value = d.id;
        document.getElementById('deleteName').textContent = d.judul;
        document.getElementById('deleteMeta').textContent =
            d.penulis + ' \u2022 ' + d.kategori + ' \u2022 ' + d.id;
        document.getElementById('deleteBar').style.background = d.warna;

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