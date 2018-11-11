"use strict";

/*3. Создать форму обратной связи с полями: Имя, Телефон, e-mail, текст, кнопка «Отправить».
** - При нажатии на кнопку «Отправить» произвести валидацию полей следующим образом:

- Имя содержит только буквы;

** - Телефон подчиняется шаблону +7(000)000-0000;**

** - E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru**

** - Текст произвольный;**
** - В случае не прохождения валидации одним из полей необходимо выделять это поле красной
рамкой и сообщать пользователю об ошибке.**
 */

class FormFeedback {
    constructor(formFB, btnSubmit, inptName, inptPhone, inptPassword, inptPasswordRepeat, inptAll, borderRedStyle) {
        this.formFB = formFB;
        this.btnSubmit = btnSubmit;
        this.inptName = inptName;
        this.inptPhone = inptPhone;
        this.inptPassword = inptPassword;
        this.inptPasswordRepeat = inptPasswordRepeat;
        this.inptAll = inptAll;
        this.borderRedStyle = borderRedStyle;
    }

    /**
     * Метод отправки данных формы
     * @param event - событие submit
     */
    sendFormData (event) {
        //Убираю обновление формы
        event.preventDefault();
        if (this.validateForm()) {
            alert('Данные успешно отправлены!');
        }
    }

    /**
     * Создаем элемент с указанием ошибки
     * @param errorText - текст ошибки
     * @returns {HTMLDivElement} - возвращаем div с текстом ошибки
     */

    createError(errorText) {
        let error = document.createElement('div');
        error.className = 'error';
        error.style.color = 'red';
        error.innerHTML = errorText;
        return error
    }

    /**
     * метод чистит все уведомления об ошибках
     */
    clearAllErrors() {
        let errors = this.formFB.querySelectorAll('.error');
        for (let i = 0; i < errors.length; i++) {
            errors[i].remove()
        }
        let that = this;
        this.inptAll.forEach(function (item) {
                item.classList.remove(that.borderRedStyle);
            }
        );
    }

    /**
     * Проверяем заполнены ли поля, возвращаем true, если провека пройдена
     */
    checkEmptyFields() {
        let result = true;
        let that = this;
        this.inptAll.forEach(function (item) {
            if (!item.value) {
                let error = that.createError('Поле не может быть пустым.');
                item.parentElement.appendChild(error);
                item.classList.add(that.borderRedStyle);
                result = false;
            }
        });
        return result;
    }

    /**
     * Проверяем совпадают ли пароли, возвращаем true, если провека пройдена
     */
    checkPasswordsMatch() {
        let result = true;
        if (this.inptPassword.value !== this.inptPasswordRepeat.value) {
            let error = this.createError('Пароли не совпадают.');
            this.inptPasswordRepeat.parentElement.appendChild(error);
            this.inptPasswordRepeat.classList.add(borderRedStyle);
            result = false;
        }
        return result;
    }

    /**
     * Проверяем длину Имени не больше 50 символов
     */
    checkNameLength() {
        let result = true;
        if (this.inptName.value.length > 50) {
            let error = this.createError('Длина имени превышена.');
            this.inptName.parentElement.appendChild(error);
            this.inptName.classList.add(borderRedStyle);
            result = false;
        }
        return result;
    }

    /**
     * Проверяем длину Пароля от 5 до 50 символов
     */
    checkPasswordLength() {
        let result = true;
        if ((this.inptPassword.value.length > 50) || (this.inptPassword.value.length < 5)) {
            let error = this.createError('Введите пароль от 5 до 50 символов.');
            this.inptPassword.parentElement.appendChild(error);
            this.inptPassword.classList.add(borderRedStyle);
            result = false;
        }
        return result;
    }

    /**
     * Проверяем телефон - 11 цифр
     */
    checkPhone() {
        let result = true;
        // увидел, что + и - проходят через isInteger - пришлось рисовать кучу условий. Некрасиво, да.
        if ((this.inptPhone.value.length !== 11) || (!Number.isInteger(+this.inptPhone.value))
            || (this.inptPhone.value.indexOf('+') !== -1) || (this.inptPhone.value.indexOf('-') !== -1)) {
            let error = this.createError('Номер указан неверно. Введите 11 цифр.');
            this.inptPhone.parentElement.appendChild(error);
            this.inptPhone.classList.add(borderRedStyle);
            result = false;
        }
        return result;
    }

    /**
     * метод валидации формы, контроллер других проверок
     * @returns {boolean} возвращает true, если все проверки пройдены успешно.
     */
    validateForm() {
        this.clearAllErrors();
        return this.checkEmptyFields() && this.checkNameLength() && this.checkPhone()
            && this.checkPasswordLength() && this.checkPasswordsMatch();
    }
}