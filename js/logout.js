(function () {
    const link = document.getElementById('logoutLink');
    const modal = document.getElementById('logoutModal');
    if (!link || !modal) return;

    function buka(e) {
        e.preventDefault();
        modal.classList.add('show');
    }

    function tutup() {
        modal.classList.remove('show');
    }

    link.addEventListener('click', buka);

    modal.querySelectorAll('[data-close-logout]').forEach(function (t) {
        t.addEventListener('click', tutup);
    });

    modal.addEventListener('click', function (e) {
        if (e.target === modal) tutup();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') tutup();
    });
})();