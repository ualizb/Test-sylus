(function () {
    const menu = document.querySelectorAll('.menu a');

    menu.forEach(function (link) {
        link.addEventListener('click', function () {
            menu.forEach(function (a) { a.classList.remove('pindah'); });
            link.classList.add('pindah');
        });
    });

    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            menu.forEach(function (a) { a.classList.remove('pindah'); });
        }
    });
})();