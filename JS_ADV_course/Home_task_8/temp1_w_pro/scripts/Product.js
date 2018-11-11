class Product {
    constructor(id, title, price, img = 'https://placehold.it/261x279', container = '#products') {
        this.id = id;
        this.price = price;
        this.title = title;
        this.img = img;
        this.container = container;
        this._render(this.container);
    }

    _render(container) {
        let $wrapper = $('<article/>', {
            class: 'product-item'
        });
        let $link = $('<a/>', {
            href: 'single-page.html'
        });
        let $boxImg = $('<div/>', {
            class: 'img-product'
        });
        let $img = $('<img>', {
            src: this.img,
            alt: 'product'
        });
        let $productDescription = $('<div/>', {
            class: 'product-description'
        });
        let $productName = $('<h3/>', {
            class: 'product-name',
            text: this.title
        });
        let $productPrice = $('<p/>', {
            class: 'product-price',
            text: `$${this.price}`
        });
        let $boxBtn = $('<div/>', {
            class: 'flex-center',
        });
        let $btnAddToCart = $('<button/>', {
            class: 'button-add-to-cart',
            text: 'Add to Cart',
            type: 'button',
            'data-id': this.id,
            'data-title': this.title,
            'data-img': this.img,
            'data-price': this.price
        });

        $wrapper.append($link);
        $link.append($boxImg);
        $boxImg.append($img);
        $link.append($productDescription);
        $productDescription.append($productName);
        $productDescription.append($productPrice);
        $wrapper.append($boxBtn);
        $boxBtn.append($btnAddToCart);

        $(container).append($wrapper);
    }
}