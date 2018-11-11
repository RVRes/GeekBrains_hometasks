class DetailCart extends Cart {

    _render() {
        let $cont = $('<section/>', {
            class: 'product-details content'
        });
        let $headProductDtails = $(`<div class="head-product-details">
                                        <h3 class="flex-4 text-start">Product Details</h3>
                                        <h3 class="flex-1">unite Price</h3>
                                        <h3 class="flex-1">Quantity</h3>
                                        <h3 class="flex-1">shipping</h3>
                                        <h3 class="flex-1">Subtotal</h3>
                                        <h3 class="flex-1">ACTION</h3>
                                    </div>`);

        let $boxProductDetails = $('<div/>', {
            class: 'box-product-details'
        });

        let $boxBtn = $(`<div class="box-btn">
                         <button>cLEAR SHOPPING CART</button>
                         <button>cONTINUE sHOPPING</button>
                     </div>`);

        $cont.append($headProductDtails);
        $cont.append($boxProductDetails);
        $cont.append($boxBtn);
        $cont.appendTo($(this.container));
    }

    _renderItem(product) {
        let $container = $(`<article class="product-details-item" data-product="${product.id}">
                            <a href="product.html" class="flex-4 product-cart-mini">
                                <div class="img-product-mini">
                                    <img src="${product.img}" alt="img">
                                </div>
                                <div class="characteristics">
                                    <h3>${product.title}</h3>
                                    <p>Color: <span>${product.color}</span></p>
                                    <p>Size: <span>${product.size}</span></p>
                                </div>
                            </a>
                            <div class="flex-1">$${product.price}</div>
                            <div class="flex-1">
                                <form class="quantity">
                                    <input  class="quantity"
                                        data-id="${product.id}"
                                        type="number" 
                                        min="1" step="1" 
                                        value="${product.quantity}">
                                </form>
                            </div>
                            <div class="flex-1">${product.shipping}</div>
                            <div class="flex-1 product-sum" data-id="${product.id}">
                                $${product.price * product.quantity}
                            </div>
                            <div class="flex-1">
                                <form>
                                    <button data-product="${product.id}" class="delete-product" type="button">
                                        <i data-product="${product.id}" class="fa fa-times-circle" aria-hidden="true"></i>
                                    </button>
                                </form>
                            </div>
                        </article>`);

        $container.appendTo($('.box-product-details'));

        this._processingQuantity();
    }

    _processingQuantity(){
        $('input.quantity').on('keydown', (e) => {
             return e.keyCode === 38 || e.keyCode === 40;
        });
        $('input.quantity').on('input', (e) => {
            this._productUpdate($(e.target).data('id'), e.target.value);
        });
    }

    _productUpdate(productId, quantity){
        let find = this.basketItems.find(product => product.id === productId);
        if (find) {
            if (find.quantity < quantity) {
                find.quantity++;
                this.countGoods++;
                this.amount += find.price;
            } else {
                find.quantity--;
                this.countGoods--;
                this.amount -= find.price;
            }
            this._updateCart(find);
            $('.product-sum').filter(`[data-id="${productId}"]`).text(`$${find.price*find.quantity}`);
            this._renderSum();
        }

    }


    remove(idProduct) {
        let find = this.basketItems.find(e => e.id === idProduct);
        if (find) {
            console.log(find);
            this.countGoods -= find.quantity;
            this.amount -= (find.price * find.quantity);

            this.basketItems.splice(this.basketItems.indexOf(find), 1);
            $(`div[data-product="${find.id}"]`).remove();
            $(`article[data-product="${find.id}"]`).remove();
            this._renderSum();
        }
    }

}