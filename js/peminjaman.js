lucide.createIcons();

const modal = document.getElementById('loanModal');
const form = document.getElementById('loanForm');

function tutup() {
    modal.classList.remove('show');
}

function isoTanggal(tgl) {
    return tgl.toISOString().slice(0, 10);
}

document.getElementById('openAddLoan').addEventListener('click', function () {
    form.reset();

    const hariIni = new Date();
    const tempo = new Date();
    tempo.setDate(tempo.getDate() + 14);

    document.getElementById('lPinjam').value = isoTanggal(hariIni);
    document.getElementById('lTempo').value = isoTanggal(tempo);

    modal.classList.add('show');
});

modal.querySelectorAll('[data-close]').forEach(function (t) {
    t.addEventListener('click', tutup);
});

modal.addEventListener('click', function (e) {
    if (e.target === modal) tutup();
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') tutup();
});

const editModal = document.getElementById('editLoanModal');

// "05 Okt 2026" -> "2026-10-05"
function keTanggalInput(teks) {
    const bulan = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', Mei: '05', Jun: '06',
                    Jul: '07', Agu: '08', Sep: '09', Okt: '10', Nov: '11', Des: '12' };
    const p = teks.trim().split(' ');
    if (p.length !== 3 || !bulan[p[1]]) return '';
    return p[2] + '-' + bulan[p[1]] + '-' + p[0].padStart(2, '0');
}

document.getElementById('loanBody').addEventListener('click', function (e) {
    const tombol = e.target.closest('.icon-edit');
    if (!tombol) return;

    const sel = tombol.closest('tr').querySelectorAll('td');
    const id = sel[0].textContent.trim();
    const nama = sel[1].textContent.trim().replace(/^[A-Z]{2}/, '');
    const status = sel[6].textContent.trim();

    document.getElementById('elId').value = id;
    document.getElementById('editLoanSub').textContent = id + ' \u2022 ' + nama;
    document.getElementById('elPeminjam').value = nama;
    document.getElementById('elBuku').value = sel[2].textContent.trim();
    document.getElementById('elPinjam').value = keTanggalInput(sel[3].textContent);
    document.getElementById('elTempo').value = keTanggalInput(sel[4].textContent);
    document.getElementById('elKembali').value = keTanggalInput(sel[5].textContent);
    document.getElementById('elStatus').value =
        status === 'Dikembalikan' ? 'returned' :
        status === 'Terlambat' ? 'overdue' : 'borrowed';

    editModal.classList.add('show');
});

editModal.querySelectorAll('[data-close]').forEach(function (t) {
    t.addEventListener('click', function () {
        editModal.classList.remove('show');
    });
});

editModal.addEventListener('click', function (e) {
    if (e.target === editModal) editModal.classList.remove('show');
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') editModal.classList.remove('show');
});