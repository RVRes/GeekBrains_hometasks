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
    constructor(formFB, inptName, inptPhone, inptEmail, inptText, inptAll, borderRedStyle) {
        this.formFB = formFB;
        this.inptName = inptName;
        this.inptPhone = inptPhone;
        this.inptEmail = inptEmail;
        // на текст мы можем внести проверки в будущем, поэтому оставил
        this.inptText = inptText;
        this.inptAll = inptAll;
        this.borderRedStyle = borderRedStyle;
    }

    /**
     * Метод отправки данных формы
     * @param event - событие submit
     */
    sendFormData(event) {
        event.preventDefault();
        if (this._validateForm()) {
            alert('Данные успешно отправлены!');
        }
    }

    /**
     * Создаем элемент с указанием ошибки
     * @param errorText - текст ошибки
     * @returns {HTMLDivElement} - возвращаем div с текстом ошибки
     */
    _createError(errorText) {
        let error = document.createElement('div');
        error.className = 'error';
        error.style.color = 'red';
        error.innerHTML = errorText;
        return error
    }

    /**
     * метод чистит все уведомления об ошибках
     */
    _clearAllErrors() {
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
            // здесь можно добавить поле текст в исключения, если надо, но произвольный не значит пустой, оставил
            if (!item.value) {
                let error = that._createError('Поле не может быть пустым.');
                item.parentElement.appendChild(error);
                item.classList.add(that.borderRedStyle);
                result = false;
            }
        });
        return result;
    }

    /**
     * Общий метод проверки Input'ов
     */
    _checkInput(pattern, input) {
        let result = pattern.test(input.value);
        if (!result) {
            let error = this._createError('Поле заполнено неверно.');
            input.parentElement.appendChild(error);
            input.classList.add(this.borderRedStyle);
            result = false;
        }
        return result;
    }

    /**
     * Проверяем Имя
     */
    checkName() {
        const pattern = /^[A-ZА-ЯЁ]{1}[a-zа-яё]+$/;
        return this._checkInput(pattern, this.inptName);
    }

    /**
     * Проверяем телефон
     */
    checkPhone() {
        const pattern = /^\+7\(\d{3}\)\d{3}-\d{4}$/;
        return this._checkInput(pattern, this.inptPhone);
    }

    /**
     * Проверяем почту
     */
    checkEmail() {
        const pattern = /^[A-Za-z_.-]+@[A-Za-z]+\.[A-Za-z]{2,3}$/;
        return this._checkInput(pattern, this.inptEmail);
    }


    /**
     * метод валидации формы, контроллер других проверок
     * @returns {boolean} возвращает true, если все проверки пройдены успешно.
     */
    _validateForm() {
        this._clearAllErrors();
        return this.checkEmptyFields() && this.checkName() && this.checkPhone() && this.checkEmail();
    }
}