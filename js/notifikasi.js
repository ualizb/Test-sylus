const bellBtn = document.getElementById('bellBtn');
const notifPanel = document.getElementById('notifPanel');
const notifCount = document.getElementById('notifCount');
const bellDot = document.getElementById('bellDot');
const markAll = document.getElementById('markAll');
const notif = document.querySelector('.notif');

function perbaruiJumlah() {
    const jumlah = notifPanel.querySelectorAll('.notif-item.unread').length;
    notifCount.textContent = jumlah + ' belum dibaca';
    bellDot.classList.toggle('hide', jumlah === 0);
}

bellBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    notifPanel.classList.toggle('show');
});

document.addEventListener('click', function (e) {
    if (!notif.contains(e.target)) {
        notifPanel.classList.remove('show');
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') notifPanel.classList.remove('show');
});

markAll.addEventListener('click', function () {
    notifPanel.querySelectorAll('.notif-item.unread').forEach(function (item) {
        item.classList.remove('unread');
    });
    perbaruiJumlah();
});

notifPanel.querySelectorAll('.notif-item').forEach(function (item) {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        item.classList.remove('unread');
        perbaruiJumlah();
    });
});

perbaruiJumlah();