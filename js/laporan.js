lucide.createIcons();

const hari = ['29 Sep', '30 Sep', '01 Okt', '02 Okt', '03 Okt', '04 Okt', '05 Okt'];

const sumbuX = {
    grid: { display: false },
    border: { display: false },
    ticks: { font: { size: 9 }, color: '#94a3b8' }
};

function sumbuY(max, step) {
    return {
        min: 0,
        max: max,
        grid: { color: '#f1f5f9' },
        border: { display: false },
        ticks: { stepSize: step, font: { size: 9 }, color: '#94a3b8' }
    };
}

const angkaBatang = {
    id: 'angkaBatang',
    afterDatasetsDraw(chart) {
        const ctx = chart.ctx;
        ctx.save();
        ctx.font = '9px Arial';
        ctx.fillStyle = '#64748b';
        ctx.textAlign = 'center';
        chart.getDatasetMeta(0).data.forEach(function (bar, i) {
            ctx.fillText(chart.data.datasets[0].data[i], bar.x, bar.y - 5);
        });
        ctx.restore();
    }
};

const opsiDasar = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
};

new Chart(document.getElementById('trenPinjam'), {
    type: 'bar',
    data: {
        labels: hari,
        datasets: [{ data: [64, 72, 68, 80, 96, 102, 84], backgroundColor: '#2563eb', borderRadius: 3 }]
    },
    options: { ...opsiDasar, scales: { x: sumbuX, y: sumbuY(120, 30) } },
    plugins: [angkaBatang]
});

new Chart(document.getElementById('trenKunjungan'), {
    type: 'line',
    data: {
        labels: hari,
        datasets: [{
            data: [130, 128, 143, 135, 160, 188, 156],
            borderColor: '#2563eb',
            borderWidth: 1.5,
            pointRadius: 3,
            pointBackgroundColor: '#2563eb'
        }]
    },
    options: { ...opsiDasar, scales: { x: sumbuX, y: sumbuY(200, 50) } }
});

new Chart(document.getElementById('trenKembali'), {
    type: 'bar',
    data: {
        labels: hari,
        datasets: [{ data: [48, 54, 58, 62, 66, 74, 62], backgroundColor: '#93c5fd', borderRadius: 3 }]
    },
    options: { ...opsiDasar, scales: { x: sumbuX, y: { ...sumbuY(90, 30), display: false } } },
    plugins: [angkaBatang]
});