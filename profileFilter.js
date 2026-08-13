document.addEventListener('DOMContentLoaded', function () {
    const filterContainer = document.getElementById('profile-filter');
    if (!filterContainer) {
        // O filtro não está na página atual, então não faz nada.
        return;
    }

    const buttons = filterContainer.querySelectorAll('button.nav-link');
    const filterableItems = document.querySelectorAll('[data-perfis]');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            // Atualiza o botão ativo
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-profile');

            // Filtra os itens (experiências e habilidades)
            filterableItems.forEach(item => {
                const profiles = item.getAttribute('data-perfis');
                if (filter === 'all' || (profiles && profiles.split(',').includes(filter))) {
                    item.style.display = ''; // Reverte para o display padrão do CSS
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});