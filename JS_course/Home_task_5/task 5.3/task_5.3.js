"use strict";

/*Урок 5, задание 3:
 Создать форму в html со следующими полями:
 * Имя - текстовое поле
 * Телефон - текстовое поле
 * Пароль - поле типа password
 * Повтор пароля - поле типа password
 * Кнопка отправить форму

 Необходимо реализовать валидацию этой формы по следующим правилам:
 * Имя - должно содержать как минимум 1 символ, не более 50 символов.
 * Телефон - должно содержать 11 цифр, не больше, не меньше.
 * Пароль - минимум 5 символов, максимум 50
 * Повтор пароля - значение должно совпадать с полем пароль.
 * Кнопка отправить форму - при нажатии на кнопку форма должна провериться, при
 прохождении проверки, форма отправляется, если проверка не была пройдена, то:
 - Каждое поле, которое не прошло проверку должно выделяться красным цветом.
 - Под каждым полем, что не прошло проверку, должна писаться подсказка по какой
 причине проверка провалилась.
 Можете пользоваться стилями бутстрапа, если лень самим писать.
 Пользоваться аттрибутами HTML5 запрещено, необходимо проверки реализовать с
 помощью javascript.
 */

/*
 Правильное решение видится в направлении полиморфизма: берем класс формы (или типовой объект), на его
 основе создаем свою форму, куда добавляем методов валидации, подсветки и отображения ошибок. Пользуемся.
 Но знаний JS не хватает, чтобы сделать так за вменяемое время, поэтому буду делать на основе того, что
 есть в 5 уроке. Подскажите, как реализовать идею, описанную выше? И насколько она здесь правильна?
 */

/*
 Проверок для реальной валидации недостаточно - в реальной жизни, здесь было бы и убирание лишних
 пробелов. И на то, какие символы вводит пользователей. И делалось бы, скорей всего, готовыми модулями.
 */

/*
 В данной реализации, ошибки показываются по очереди, а не все сразу. Мне не понравилось, когда под
 каждым инпутом появлялось куча дивов с ошибками. Можно и все сразу показывать, для этого
 в validateForm() сначала запустить все проверки, а потом вернуть результат.
 */


//ограничиваем область поиска нужной нам форме, дальше будем работать с ней, а не с документом
const form = document.querySelector('.my-form');
const btnSubmit = form.querySelector('.btn-primary');
//и сразу же уперся в то, что поиск по имени элемента не работает внутри элемента (form)
const inptName = document.getElementsByName('name')[0];
const inptPhone = document.getElementsByName('phone')[0];
const inptPassword = document.getElementsByName('password')[0];
const inptPasswordRepeat = document.getElementsByName('password_repeat')[0];
const inptAll = form.querySelectorAll('.form-control'); //массив со всеми нашими инпутами
const borderRedStyle = 'border-red';

//добавил событие на отправку формы
form.addEventListener('submit', sendFormData);


/**
 * Функция отправки данных формы
 * @param event - событие submit
 */
function sendFormData(event) {
    //Убираю обновление формы, для этого притащил в функцию событие submit и запретил обновление
    //Иначе обновляет страницу и стирает console.log
    event.preventDefault();
    if (validateForm()) {
        alert('Данные успешно отправлены!');
    }
}

/**
 * Создаем элемент с указанием ошибки
 * @param errorText - текст ошибки
 * @returns {HTMLDivElement} - возвращаем div с текстом ошибки
 */
function createError(errorText) {
    let error = document.createElement('div');
    error.className = 'error';
    error.style.color = 'red';
    error.innerHTML = errorText;
    return error
}

/**
 * Функция чистит все уведомления об ошибках
 */
function clearAllErrors() {
    let errors = form.querySelectorAll('.error');
    //здесь хотел перебирать for in, но тк я элементы удаляю - цикл падал с ошибкой
    for (let i = 0; i < errors.length; i++) {
        errors[i].remove()
    }
    inptAll.forEach(function (item) {
            item.classList.remove(borderRedStyle);
        }
    );
}

/**
 * Проверяем заполнены ли поля, возвращаем true, если провека пройдена
 */
function checkEmptyFields() {
    let result = true;
    inptAll.forEach(function (item) {
        if (!item.value) {
            let error = createError('Поле не может быть пустым.');
            item.parentElement.appendChild(error);
            item.classList.add(borderRedStyle);
            result = false;
        }
    });
    return result;
}

/**
 * Проверяем совпадают ли пароли, возвращаем true, если провека пройдена
 */
function checkPasswordsMatch() {
    let result = true;
    if (inptPassword.value !== inptPasswordRepeat.value) {
        let error = createError('Пароли не совпадают.');
        inptPasswordRepeat.parentElement.appendChild(error);
        inptPasswordRepeat.classList.add(borderRedStyle);
        result = false;
    }
    return result;
}

/**
 * Проверяем длину Имени не больше 50 символов
 */
function checkNameLength() {
    let result = true;
    if (inptName.value.length > 50) {
        let error = createError('Длина имени превышена.');
        inptName.parentElement.appendChild(error);
        inptName.classList.add(borderRedStyle);
        result = false;
    }
    return result;
}

/**
 * Проверяем длину Пароля от 5 до 50 символов
 */
function checkPasswordLength() {
    let result = true;
    if ((inptPassword.value.length > 50) || (inptPassword.value.length < 5)) {
        let error = createError('Введите пароль от 5 до 50 символов.');
        inptPassword.parentElement.appendChild(error);
        inptPassword.classList.add(borderRedStyle);
        result = false;
    }
    return result;
}

/**
 * Проверяем телефон - 11 цифр
 */
function checkPhone() {
    let result = true;
    // увидел, что + и - проходят через isInteger - пришлось рисовать кучу условий. Некрасиво, да.
    if ((inptPhone.value.length !== 11) || (!Number.isInteger(+inptPhone.value))
        || (inptPhone.value.indexOf('+') !== -1) || (inptPhone.value.indexOf('-') !== -1)) {
        let error = createError('Номер указан неверно. Введите 11 цифр.');
        inptPhone.parentElement.appendChild(error);
        inptPhone.classList.add(borderRedStyle);
        result = false;
    }
    return result;
}

/**
 * Функция валидации формы, контроллер других проверок
 * @returns {boolean} возвращает true, если все проверки пройдены успешно.
 */
function validateForm() {
    clearAllErrors();
    // такой порядок проверки выставлен намеренно
    return checkEmptyFields() && checkNameLength() && checkPhone()
        && checkPasswordLength() && checkPasswordsMatch();
}
