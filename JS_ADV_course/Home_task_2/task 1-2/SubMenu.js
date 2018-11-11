class SubMenu extends Menu {
    constructor(href, subMenuItemclass, title, subMenulinkclass, id, className, items){
        super(id, className, items);
        this.href = href;
        this.title = title;
        this.subMenuItemclass = subMenuItemclass;
        this.subMenuLinkclass = subMenulinkclass;
    }
    render(){
        return `<li class="${this.subMenuItemclass}"><a href="${this.href}"  
                    class="${this.subMenuLinkclass}">${this.title}</a>${super.render()}</li>`;
    }
}