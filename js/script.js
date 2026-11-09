lucide.createIcons();

const hari = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
const datapengunjung = [130, 128, 143, 135, 160, 188, 156];
const dataPeminjaman = [64, 72, 68, 80, 96, 102, 84];

const sumbuX = {
    grid: { display: false },
    border: { display: false },
    ticks: { font: { size: 9}, color: '#94a3b8' }
};

function sumbuY(max,step) {
    return {
        min: 0,
        max: max,
        grid: { color: '#e5e7eb', borderDash: [4, 4] },
        border: { display: false },
        ticks: { stepSize: step, font: { size: 9}, color: '#94a3b8' }
    };
}

new Chart(document.getElementById('pengunjungChart'), {
    type: 'line',
    data: {
        labels: hari,
        datasets: [{
            data: datapengunjung,
            borderColor: '#2563eb',
            borderwidth: 1.5,
            pointradius: 3,
            pointbackgroundColor: '#2563eb',
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: sumbuX, y: sumbuY(200, 50) }
    }
});

new Chart(document.getElementById('peminjamanChart'), {
    type: 'bar',
    data: {
        labels: hari,
        datasets: [{
            data: dataPeminjaman,
            backgroundColor: '#2563eb',
            borderwidth: 3,
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: sumbuX, y: sumbuY(120, 30) }
    }
});

new Chart(document.getElementById('donutChart'), {
    type: 'doughnut',
    data: {
        labels: ['Tersedia', 'Dipinjam', 'Perawatan/Rusak'],
        datasets: [{
            data: [9340, 2860, 280],
            backgroundColor: ['#dbeafe', '#60a5fa', '#2463eb'],
            borderwidth: 0,
        }]
    },
    options: {
        cutout: '80%',
        plugins: { legend: { display: false } }
    }
});