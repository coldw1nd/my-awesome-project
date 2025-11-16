document.addEventListener('DOMContentLoaded', function() {
    const projectPage = document.querySelector('.projects-page');

    if (projectPage) {
        const modalOverlay = document.getElementById('project-modal');
        const modalContent = modalOverlay ? modalOverlay.querySelector('.modal-content') : null;
        const closeModalBtn = modalOverlay ? modalOverlay.querySelector('.close-button') : null;
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const projectCards = document.querySelectorAll('.project-card');

        let previousActiveElement = null;

        function openModal(title) {
            previousActiveElement = document.activeElement;
            if (modalTitle) modalTitle.textContent = title;
            if (modalDescription) modalDescription.textContent = `Тут будет подробное описание проекта "${title}"`;
            modalOverlay.style.display = 'block';
            document.querySelectorAll('body > *:not(#project-modal)').forEach(el => el.setAttribute('aria-hidden', 'true'));
            modalContent.focus();
            document.addEventListener('keydown', handleEscape);
        }

        function closeModal() {
            modalOverlay.style.display = 'none';
            document.querySelectorAll('[aria-hidden="true"]').forEach(el => el.removeAttribute('aria-hidden'));
            if (previousActiveElement) previousActiveElement.focus();
            document.removeEventListener('keydown', handleEscape);
        }

        function handleEscape(e) {
            if (e.key === 'Escape') closeModal();
        }

        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const titleEl = card.querySelector('h3');
                const title = titleEl ? titleEl.textContent.trim() : 'Проект';
                openModal(title);
            });
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });

        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });

        modalContent.addEventListener('keydown', function(e) {
            if (e.key !== 'Tab') return;
            const focusable = modalContent.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault(); last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault(); first.focus();
            }
        });

        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                filterButtons.forEach(btn => {
                    btn.classList.remove('active-filter');
                    btn.setAttribute('aria-pressed', 'false');
                });
                this.classList.add('active-filter');
                this.setAttribute('aria-pressed', 'true');

                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filterValue === 'all' || filterValue === cardCategory) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const status = document.getElementById('form-status');

        function setError(id, message) {
            const input = document.getElementById(id);
            const error = document.getElementById(`${id}-error`);
            input.setAttribute('aria-invalid', 'true');
            error.textContent = message;
            error.classList.remove('visually-hidden');
        }

        function clearError(id) {
            const input = document.getElementById(id);
            const error = document.getElementById(`${id}-error`);
            input.removeAttribute('aria-invalid');
            error.textContent = '';
            error.classList.add('visually-hidden');
        }

        function validateEmail(value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let valid = true;

            const nameValue = document.getElementById('name').value.trim();
            const emailValue = document.getElementById('email').value.trim();
            const messageValue = document.getElementById('message').value.trim();

            clearError('name');
            clearError('email');
            clearError('message');

            if (!nameValue) { setError('name', 'Введите имя'); valid = false; }
            if (!emailValue) { setError('email', 'Введите email'); valid = false; }
            else if (!validateEmail(emailValue)) { setError('email', 'Введите корректный email'); valid = false; }
            if (!messageValue) { setError('message', 'Введите сообщение'); valid = false; }

            if (!valid) return;

            status.textContent = 'Сообщение отправлено. Спасибо!';
            status.classList.remove('visually-hidden');
            contactForm.reset();

            setTimeout(() => {
                status.textContent = '';
                status.classList.add('visually-hidden');
            }, 3000);
        });
    }
});