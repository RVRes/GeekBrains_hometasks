/**
 * Created by user on 23.10.2018.
 */
"use strict";

let gallery = {
    init: function () {
        this.el = document.getElementById('myGallery');
        this.index = 0;
        this.image = null;
        this.load();
    },
    load: function () {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'images.json', true);
        xhr.send(null);
        let that = this;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    that.items = JSON.parse(xhr.responseText);
                    that.render();
                }
            }
        }
    },
    render: function () {
        for (let i = 0; i < this.items.length; i++) {
            let a = document.createElement('a');
            a.href = this.items[i].full;
            let img = document.createElement('img');
            img.src = this.items[i].preview;
            img.height = 100;
            document.getElementById('myGallery').appendChild(a).appendChild(img);
        }
    }

};