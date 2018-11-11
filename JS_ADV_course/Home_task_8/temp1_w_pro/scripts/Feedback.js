class Feedback {
    constructor(source, container = '.feedback') {
        this.source = source;
        this.container = container;
        this.feedbackItems = [];
        this._init(this.source);
    }

    create(form) {
        if (!this._validForm(form)) {
            return;
        }
        let data = {};
        data['id_comment'] = this._newId();
        form.find('input, textarea').each((i, e) => {
            data[e.name] = $(e).val();
        });
        this.feedbackItems.push(data);
        this._renderItem(data);
        form.find('input, textarea').each((i, e) => {
            e.value = '';
        });
        this._closeFormAdd();
    }

    approve(elem) {
        $('.feedback__moderator').filter(`[data-id="${$(elem).data('id')}"]`).remove();
    }


    remove(elem) {
        let id_comment = $(elem).data('id');
        let find = this.feedbackItems.find(feedback => feedback.id_comment === id_comment);
        if (find) {
            this.feedbackItems.splice(this.feedbackItems.indexOf(find), 1);
            $('.feedback__item').filter(`[data-id="${id_comment}"]`).remove();
        }

    }

    _init(source) {
        fetch(source)
            .then(res => res.json())
            .then(data => {
                for (let feedback of data) {
                    this.feedbackItems.push(feedback);
                    this._renderItem(feedback);
                }
            });
        this._renderAddZon();
        this._renderFormAdd();

        $(this.container).on('click', '.btn-remove', e => {
            this.remove(e.target);
        });
        $(this.container).on('click', '.btn-add', e => {
            this.approve(e.target);
        });
    }

    _renderItem(element) {
        let $container = $('<div/>', {
            class: 'feedback__item',
            'data-id': element.id_comment
        });
        $container.append($(`<p class="feedback__author">${element.user_name}</p>`));
        $container.append($(`<p class="feedback__review-text">${element.feedback}</p>`));

        let $moderator = $('<div/>', {
            class: 'feedback__moderator',
            'data-id': element.id_comment
        });
        $moderator.append($(`<i data-id = "${element.id_comment}" class="btn-add feedback__moderator-item fas fa-check"></i>`));
        $moderator.append($(`<i data-id = "${element.id_comment}" class="btn-remove fas fa-times feedback__moderator-item"></i>`));

        $container.append($moderator);

        $container.appendTo($(this.container));
    }

    _renderAddZon() {
        let $container = ($(`<div class="feedback__item_add"><i class="fas fa-plus"></i></div>`));
        $(this.container).append($container);

        $('.feedback__item_add').on('click', () => {
            $('.feedback__box-form-add').show(300);
        });

    }

    //на сколько я знаю id присваиается в БД
    //так что пока просто будем использовать счетчик
    _newId() {
        if (this.feedbackItems.length !== 0) {
            return this.feedbackItems[this.feedbackItems.length - 1]['id_comment'] + 1;
        }
        return 1;
    }

    _validForm(form) {
        let res = true;
        form.find('input, textarea').each((i, e) => {
            if ($(e).val().length === 0) {
                e.placeholder = 'поле не может быть пустым';
                res = false;
            }
        });
        return res;
    }

    _renderFormAdd() {
        let $container = ($(`
            <div class="feedback__box-form-add">
                <form class="feedback__form-add">
                    <div class="close-form">
                        <i id="close-form-btn" class="fa fa-times-circle" aria-hidden="true"></i>
                    </div>
                    <input class="feedback__form-name" required name="user_name" type="text" placeholder="имя">
                    <textarea class="feedback__form-text" required name="feedback" placeholder="отзыв"></textarea>
                    <button class="feedback__form-btn" type="submit">Отправить</button>
                </form>
            </div>
                            `));
        $(this.container).append($container);

        $('.feedback__form-btn').on('click', e => {
            e.preventDefault();
            this.create($('.feedback__form-add'));
        });

        this._closeFormAdd();
    }

    _closeFormAdd() {
        $('#close-form-btn').on('click', () => {
            $('.feedback__box-form-add').hide(300);
        });
        $('.feedback__box-form-add').hide(300);
    }
}