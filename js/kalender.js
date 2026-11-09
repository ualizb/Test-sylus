const picker = document.querySelector('.date-picker');
const tombolTanggal = document.getElementById('dateBtn');
const kalender = document.getElementById('calendar');
const judulBulan = document.getElementById('calTitle');
const gridTanggal = document.getElementById('calGrid');
const labelTanggal = document.getElementById('dateLabel');

const namaBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                   'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const bulanPendek = ['JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN',
                     'JUL', 'AGU', 'SEP', 'OKT', 'NOV', 'DES'];

const hariIni = new Date();
let terpilih = new Date(2026, 10, 1);
let sementara = new Date(terpilih);
let tahunTampil = terpilih.getFullYear();
let bulanTampil = terpilih.getMonth();

function samaHari(a, b) {
    return a.getFullYear() === b.getFullYear() &&
           a.getMonth() === b.getMonth() &&
           a.getDate() === b.getDate();
}

function formatLabel(tgl) {
    const hari = String(tgl.getDate()).padStart(2, '0');
    return hari + ' ' + bulanPendek[tgl.getMonth()] + ' ' + tgl.getFullYear();
}

function gambarKalender() {
    judulBulan.textContent = namaBulan[bulanTampil] + ' ' + tahunTampil;
    gridTanggal.innerHTML = '';
    const geser = new Date(tahunTampil, bulanTampil, 1).getDay();

    for (let i = 0; i < 42; i++) {
        const tgl = new Date(tahunTampil, bulanTampil, 1 - geser + i);

        const tombol = document.createElement('button');
        tombol.type = 'button';
        tombol.className = 'cal-day';
        tombol.textContent = tgl.getDate();

        if (tgl.getMonth() !== bulanTampil) tombol.classList.add('other');
        if (samaHari(tgl, hariIni)) tombol.classList.add('today');
        if (samaHari(tgl, sementara)) tombol.classList.add('selected');

        tombol.addEventListener('click', function () {
            pilihTanggal(tgl);
        });

        gridTanggal.appendChild(tombol);
    }
}

function pilihTanggal(tgl) {
    sementara = new Date(tgl);
    tahunTampil = tgl.getFullYear();
    bulanTampil = tgl.getMonth();
    gambarKalender();
}

function bukaKalender() {
    sementara = new Date(terpilih);
    tahunTampil = terpilih.getFullYear();
    bulanTampil = terpilih.getMonth();
    gambarKalender();
    kalender.classList.add('show');
}

function tutupKalender() {
    kalender.classList.remove('show');
}

tombolTanggal.addEventListener('click', function () {
    if (kalender.classList.contains('show')) {
        tutupKalender();
    } else {
        bukaKalender();
    }
});

document.addEventListener('click', function (e) {
    if (!picker.contains(e.target)) tutupKalender();
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') tutupKalender();
});

document.getElementById('calPrev').addEventListener('click', function () {
    bulanTampil--;
    if (bulanTampil < 0) {
        bulanTampil = 11;
        tahunTampil--;
    }
    gambarKalender();
});

document.getElementById('calNext').addEventListener('click', function () {
    bulanTampil++;
    if (bulanTampil > 11) {
        bulanTampil = 0;
        tahunTampil++;
    }
    gambarKalender();
});

document.querySelectorAll('[data-quick]').forEach(function (chip) {
    chip.addEventListener('click', function () {
        const tgl = new Date();

        if (chip.dataset.quick === 'yesterday') {
            tgl.setDate(tgl.getDate() - 1);
        }
        if (chip.dataset.quick === 'week') {
            const hari = tgl.getDay() === 0 ? 6 : tgl.getDay() - 1;
            tgl.setDate(tgl.getDate() - hari);
        }

        document.querySelectorAll('[data-quick]').forEach(function (c) {
            c.classList.remove('active');
        });
        chip.classList.add('active');

        pilihTanggal(tgl);
    });
});

document.getElementById('calApply').addEventListener('click', function () {
    terpilih = new Date(sementara);
    labelTanggal.textContent = formatLabel(terpilih);
    tutupKalender();
});