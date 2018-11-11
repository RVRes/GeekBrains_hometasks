class MenuItem {
    constructor(href, classItem, title, classLink){
        this.href = href;
        this.title = title;
        this.classLink=classLink;
        this.classItem=classItem;
    }
    render(){
        return `<li class="${this.classItem}"><a href="${this.href}"  
                class="${this.classLink}">${this.title}</a></li>`;
    }
}