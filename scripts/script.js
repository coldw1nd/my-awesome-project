document.addEventListener('DOMContentLoaded', function() {

    // Логика для страницы Проектов
    const projectPage = document.querySelector('.projects-page');
    // Проверяем, что мы находимся на странице проектов, чтобы скрипт не ломался на других страницах
    if (projectPage) {
        // ЛОГИКА МОДАЛЬНОГО ОКНА
        const modal = document.getElementById('project-modal');
        const projectCards = document.querySelectorAll('.project-card');
        const closeModal = document.querySelector('.close-button');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');

        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.querySelector('h3').textContent;
                modalTitle.textContent = title;
                modalDescription.textContent = `Тут будет подробное описание проекта "${title}"`;
                modal.style.display = 'block';
            });
        });

        closeModal.onclick = () => { modal.style.display = 'none'; }
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
        
        // ЛОГИКА ФИЛЬТРАЦИИ ПРОЕКТОВ
        const filterButtons = document.querySelectorAll('.filter-btn');

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');

                filterButtons.forEach(btn => btn.classList.remove('active-filter'));
                this.classList.add('active-filter');

                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (filterValue === 'all' || filterValue === cardCategory) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
        
        // По умолчанию делаем кнопку "Все" активной при загрузке страницы
        document.querySelector('.filter-btn[data-filter="all"]').classList.add('active-filter');
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Форма отправлена');
            contactForm.reset();
        });
    }
});