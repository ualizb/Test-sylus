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

const editModal = document.getElementById('editModal');
const deleteModal = document.getElementById('deleteModal');

function tutupSemuaModal() {
    document.querySelectorAll('.modal-overlay').forEach(function (m) {
        m.classList.remove('show');
    });
}

document.getElementById('memberBody').addEventListener('click', function (e) {
    const tombol = e.target.closest('.icon-edit, .icon-delete');
    if (!tombol) return;

    const tr = tombol.closest('tr');
    const sel = tr.querySelectorAll('td');
    const id = sel[0].textContent.trim();
    const nama = tr.querySelector('.person b').textContent.trim();
    const email = sel[2].textContent.trim();
    const aktif = tr.querySelector('.status').classList.contains('status-active');

    if (tombol.classList.contains('icon-edit')) {
    document.getElementById('editId').value = id;
    document.getElementById('editSub').textContent = id + ' \u2022 ' + nama;
    document.getElementById('editNama').value = nama;
    document.getElementById('editEmail').value = email;
    document.getElementById('editPinjam').value = sel[3].textContent.trim();
    document.getElementById('editKunjungan').value = sel[4].textContent.trim();
    document.getElementById('editTerakhir').value = keTanggalInput(sel[5].textContent);
    document.getElementById('editStatus').value = aktif ? 'active' : 'inactive';
    editModal.classList.add('show');
    } else {
        document.getElementById('deleteId').value = id;
        document.getElementById('deleteSub').textContent = id + ' \u2022 ' + nama;
        deleteModal.classList.add('show');
    }
});

document.querySelectorAll('#editModal [data-close], #deleteModal [data-close]').forEach(function (t) {
    t.addEventListener('click', tutupSemuaModal);
});

[editModal, deleteModal].forEach(function (m) {
    m.addEventListener('click', function (e) {
        if (e.target === m) tutupSemuaModal();
    });
});

function keTanggalInput(teks) {
    const bulan = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', Mei: '05', Jun: '06',
                    Jul: '07', Agu: '08', Sep: '09', Okt: '10', Nov: '11', Des: '12' };
    const p = teks.trim().split(' ');
    if (p.length !== 3 || !bulan[p[1]]) return '';
    return p[2] + '-' + bulan[p[1]] + '-' + p[0].padStart(2, '0');
}