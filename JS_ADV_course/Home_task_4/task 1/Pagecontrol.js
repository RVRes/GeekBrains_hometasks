class Pagecontrol {
    constructor($menu, $content) {
        this.$menu = $menu.clone();
        this.$content = $content.clone();
    }

    render() {
        let $result = this.$menu;
        for (let i = 0; i < this.$content.length; i++) {
            $result.push($(this.$content).get(i));
        }
        $result.find("li:first").addClass("active");
        $result.filter("div.content:first").addClass("active");
        this._init($result);
        return $result;
    };

    _init($pagecontrol) {
        $pagecontrol.filter(".menu").on('click', 'li:not(.active)', function () {
            $pagecontrol.removeClass("active");
            $pagecontrol.find("li").removeClass("active");
            $(this).addClass('active');
            $pagecontrol.filter("div.content").eq($(this).index()).addClass('active');
        });
    }
}