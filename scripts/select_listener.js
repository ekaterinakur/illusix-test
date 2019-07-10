select.addEventListener('change', (e) => {
    if (e.target.value !== 'Дата') {
        for (let i = 0; i < tablesContainer.children.length; i++) {
            tablesContainer.children[i].id !== e.target.value
                ? tablesContainer.children[i].classList.add('d-none')
                : tablesContainer.children[i].classList.remove('d-none');
        };
    } else {
        for (let i = 0; i < tablesContainer.children.length; i++) {
            tablesContainer.children[i].classList.remove('d-none');
        }
    }
});
