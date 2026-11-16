lucide.createIcons();

const modal = document.getElementById('visitorModal');
const form = document.getElementById('visitorForm');

function tutup() {
    modal.classList.remove('show');
}

document.getElementById('openAddVisitor').addEventListener('click', function () {
    form.reset();
    document.getElementById('vTanggal').valueAsDate = new Date();
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

const editModal = document.getElementById('editVisitorModal');

function keTanggalInput(teks) {
    const bulan = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', Mei: '05', Jun: '06',
                    Jul: '07', Agu: '08', Sep: '09', Okt: '10', Nov: '11', Des: '12' };
    const p = teks.trim().split(' ');
    if (p.length !== 3 || !bulan[p[1]]) return '';
    return p[2] + '-' + bulan[p[1]] + '-' + p[0].padStart(2, '0');
}

function bersihkan(teks) {
    teks = teks.trim();
    return teks === '\u2014' ? '' : teks;
}

document.getElementById('visitorBody').addEventListener('click', function (e) {
    const tombol = e.target.closest('.icon-edit');
    if (!tombol) return;

    const sel = tombol.closest('tr').querySelectorAll('td');
    const id = sel[0].textContent.trim();
    const nama = sel[2].textContent.trim();

    document.getElementById('evId').value = id;
    document.getElementById('editVisitorSub').textContent = id + ' \u2022 ' + nama;
    document.getElementById('evNpm').value = bersihkan(sel[1].textContent);
    document.getElementById('evNama').value = nama;
    document.getElementById('evTipe').value =
        sel[3].textContent.trim() === 'Tamu' ? 'guest' : 'member';
    document.getElementById('evTanggal').value = keTanggalInput(sel[4].textContent);
    document.getElementById('evMasuk').value = bersihkan(sel[5].textContent);
    document.getElementById('evKeluar').value = bersihkan(sel[6].textContent);
    document.getElementById('evTujuan').value = bersihkan(sel[7].textContent);
    document.getElementById('evStatus').value =
        sel[8].textContent.trim() === 'Tercatat' ? 'recorded' : 'unrecorded';

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

function idBerikutnya() {
    const dipakai = [];
    let depanTerbesar = 0;

    document.querySelectorAll('#visitorBody tr td:first-child').forEach(function (td) {
        const angka = parseInt(td.textContent.replace(/\D/g, ''), 10);
        dipakai.push(angka);

        const depan = Math.floor(angka / 100);   
        if (depan > depanTerbesar) depanTerbesar = depan;
    });

    const depan = depanTerbesar + 1;

    let id;
    do {
        const belakang = Math.floor(Math.random() * 100);
        id = depan * 100 + belakang;
    } while (dipakai.includes(id));

    return 'VS-' + String(id).padStart(4, '0');
}