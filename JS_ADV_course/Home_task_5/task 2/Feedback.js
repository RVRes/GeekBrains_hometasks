class Feedback {
    constructor(source, container = '#feedback') {
        this.source = source;
        this.container = container;
        this._init(this.source);
    }
    _init(source){
        fetch(source)
            .then(result => result.json())
            .then(data => {
                for(let comment of data.comments){
                    this.addComment(comment.author, comment.text, comment.approved);
                }
            })
    }
    addComment(author, comment, approved){
        let $wrapper = $('<div/>', {
            class: 'comment',
        });
        $wrapper.append($(`<p>${author}</p>`));
        $wrapper.append($(`<p>${comment}</p>`));
        $wrapper.append($(`<button class="removeCommentBtn">Удалить</button>`));
        if(!approved){
            $wrapper.append($(`<button class="approveCommentBtn">Одобрить</button>`));
            $wrapper.addClass('not-approved');
        }
        $(this.container).append($wrapper);
    }
    approveComment(e){
        $(e).parent()
            .removeClass('not-approved')
            .find('.approveCommentBtn')
            .remove();
    }
    removeComment(e){
        $(e).parent().remove();
    }
}