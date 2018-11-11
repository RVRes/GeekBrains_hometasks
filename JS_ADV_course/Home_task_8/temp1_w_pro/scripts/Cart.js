class Cart {
    constructor(source, container = '#cart') {
        this.container = container;
        this.source = source;
        this.countGoods = 0;
        this.amount = 0;
        this.basketItems = [];
        this._init(this.source);
    }

    _render() {
        let $cartItemsDiv = $('<div/>', {
            class: 'cart-items-wrap'
        });

        let $cartMiniCost = $(`<div class="cart-mini-cost">
                                <p>TOTAL</p>
                                <p class="sum-price">${this.amount}</p>
                             </div>`);

        let $cartMiniBtn = $('<div/>', {
            class: 'cart-mini-btn'
        });
        let $btnCheckout = $('<a/>', {
            class: 'btn-checkout',
            href: 'checkout.html',
            text: 'Checkout'
        });
        let $btnGoToCart = $('<a/>', {
            class: 'btn-go-to-cart',
            href: 'shoping-cart.html',
            text: 'Go to cart'
        });

        $cartItemsDiv.appendTo($(this.container));
        $cartMiniCost.appendTo($(this.container));
        $btnCheckout.appendTo($cartMiniBtn);
        $btnGoToCart.appendTo($cartMiniBtn);
        $cartMiniBtn.appendTo($(this.container));
    }

    _init(source) {
        this._render();
        fetch(source)
            .then(result => result.json())
            .then(data => {
                for (let product of data.contents) {
                    this.basketItems.push(product);
                    this._renderItem(product);
                }
                this.countGoods = data.countGoods;
                this.amount = data.amount;
                this._renderSum()
            });
        $(this.container).on('click', '.delete-product', e => {
            this.remove($(e.target).data('product'));
        });
    }

    _renderItem(product) {
        let $container = $('<div/>', {
            class: 'cart-mini-item',
            'data-product': product.id
        });
        $container.append($(`<div class="img"><img src="${product.img}" alt="img"></div>`));
        $container.append($(`<div class="box">
                                <h3>${product.title}</h3>
                                <p class="color-accent">
                                    <span class="product-quantity">${product.quantity}
                                    </span> x $<span>${product.price}</span>
                                </p>
                             </div>`));
        $container.append($(`<button data-product="${product.id}" class="delete-product" type="button">
                                <i data-product="${product.id}" class="fa fa-times-circle" aria-hidden="true"></i>
                             </button>`));

        $container.appendTo($('.cart-items-wrap'));
    }

    _renderSum() {
        $('.sum-amount').text(this.countGoods);
        $('.sum-price').text(`$${this.amount}`);
    }

    addProduct(element) {
        let productId = +$(element).data('id');
        let find = this.basketItems.find(product => product.id === productId);
        if (find) {
            find.quantity++;
            this.countGoods++;
            this.amount += find.price;
            this._updateCart(find);
        } else {
            let product = {
                id: productId,
                price: +$(element).data('price'),
                title: $(element).data('title'),
                img: $(element).data('img'),
                quantity: 1
            };
            this.basketItems.push(product);
            this.countGoods += product.quantity;
            this.amount += product.price;
            this._renderItem(product);
        }
        this._renderSum();
    }

    _updateCart(product) {
        let $container = $(`div[data-product="${product.id}"]`);
        $container.find('.product-quantity').text(product.quantity);
        $container.find('.product-price').text(`$${product.quantity * product.price}`);
    }

    remove(idProduct) {
        let find = this.basketItems.find(e => e.id === idProduct);
        if (find) {
            this.countGoods--;
            this.amount -= find.price;
            if (find.quantity === 1) {
                this.basketItems.splice(this.basketItems.indexOf(find), 1);
                $(`div[data-product="${find.id}"]`).remove();
                $(`article[data-product="${find.id}"]`).remove();
            } else {
                this.basketItems[this.basketItems.indexOf(find)]['quantity']--;
                this._updateCart(find);
            }
            this._renderSum();
        }
    }
}