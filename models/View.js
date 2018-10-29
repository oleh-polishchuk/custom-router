class View {

    constructor(routeManager, attributes) {
        this.routeManager = routeManager;
        this.attributes = attributes;
    }

    update() {
        const route = this.routeManager.getCurrentRouteOrDefault();

        this._hideContent();
        this._showContentByViewName(route.viewName);
    }

    onClickNavigateTo(cb) {
        const it = this;
        $(`[${it.attributes.navigateTo}]`).click(function (event) {
            event.preventDefault();
            const path = $(this).attr(`${it.attributes.navigateTo}`);
            cb(path);
        });
    }

    _hideContent() {
        $(`[${this.attributes.viewName}]`).each((index, item) => {
            $(item).removeClass('show');
        });
    }

    _showContentByViewName(selector) {
        $(`[${this.attributes.viewName}="${selector}"]`).each((index, item) => {
            let $section = $(item);
            if (!$section.hasClass('show')) {
                $section.addClass('show');
            }
        })
    }

    injectStyles() {
        const styleElem = document.createElement("style");
        styleElem.appendChild(document.createTextNode(`
            [${this.attributes.viewName}] {
                display: none;
            }

            [${this.attributes.viewName}].show { 
                display: block; 
            }
        `));
        document.getElementsByTagName("body")[ 0 ].appendChild(styleElem);
    }

}
