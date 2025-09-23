// Логика для модального окна

// Находим все нужные элементы по их ID
const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');

// Функция для обработки валидации формы
function handleValidation(e) {
    // Проверяем, прошла ли форма встроенную валидацию браузера
    if (!form.checkValidity()) {
        e.preventDefault(); // Отменяем отправку, если есть ошибки
        
        // Показываем стандартные сообщения об ошибках
        form.reportValidity();

        // Добавляем атрибут для стилизации полей с ошибками
        [...form.elements].forEach(el => {
            if (!el.checkValidity()) {
                el.setAttribute('aria-invalid', 'true');
            } else {
                el.removeAttribute('aria-invalid');
            }
        });
    } else {
        e.preventDefault();
        // Если все хорошо, отправляем форму (закрываем окно)
        console.log('Форма успешно отправлена!');
        dlg.close('success');
        form.reset(); // Очищаем поля формы
    }
}

// Добавляем обработчик на кнопку открытия окна
if (openBtn && dlg) {
    openBtn.addEventListener('click', () => {
        dlg.showModal(); // Открываем модальное окно
    });
}

// Добавляем обработчик на кнопку закрытия окна
if (closeBtn && dlg) {
    closeBtn.addEventListener('click', () => {
        dlg.close('cancel'); // Закрываем окно
    });
}

// Добавляем обработчик на отправку формы
if (form) {
    form.addEventListener('submit', handleValidation);
}