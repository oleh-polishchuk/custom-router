class Router {

    constructor(routes) {
        this.navigateToAttribute = 'navigate-to';
        this.viewNameAttribute = 'view-name';

        this.routes = routes || [];
    }

    init() {
        this.injectStyles();
        this.onUserNavigate(url => {
            this.updateState(url);
        });
        this.onStateChange(() => {
            this.updateView();
        });
        this.updateView();
        Router.log('Router successfully initialized');
    }

    onUserNavigate(cb) {
        const it = this;
        $(`[${it.navigateToAttribute}]`).click(function () {
            const path = $(this).attr(`${it.navigateToAttribute}`);
            cb(path);
        });
    }

    onStateChange(cb) {
        $(window).on('popstate', cb);
    }

    updateState(url) {
        document.title = this.getTitleByUrl(url);
        window.history.pushState({}, '', url);
        dispatchEvent(new PopStateEvent('popstate', { state: {} }));
    }

    getTitleByUrl(url) {
        let route = this.routes.find(route => route.path === url);
        return route && route.title;
    }

    updateView() {
        const url = this.getCurrentPath();
        const viewName = this.getViewNameByUrlOrDefault(url);

        this.hideContent();
        this.showContentByViewName(viewName);
    }

    getCurrentPath() {
        return window.location.pathname;
    }

    hideContent() {
        $(`[${this.viewNameAttribute}]`).each((index, item) => {
            $(item).removeClass('show');
        });
    }

    showContentByViewName(selector) {
        $(`[${this.viewNameAttribute}="${selector}"]`).each((index, item) => {
            let $section = $(item);
            if (!$section.hasClass('show')) {
                $section.addClass('show');
            }
        })
    }

    getViewNameByUrlOrDefault(url) {
        let viewName = this.getViewNameByUrl(url);
        if (viewName) {
            return viewName;
        } else {
            return this.getDefaultViewName();
        }
    }

    getViewNameByUrl(l) {
        let route = this.routes.find(route => route.path === l);
        return route && route.viewName;
    }

    getDefaultViewName() {
        let route = this.routes.find(route => route.defaultView);
        return route && route.viewName;
    }

    injectStyles() {
        const styleElem = document.createElement("style");
        styleElem.appendChild(document.createTextNode(`
            [${this.viewNameAttribute}] {
                display: none;
            }

            [${this.viewNameAttribute}].show { 
                display: block; 
            }
        `));

        document.getElementsByTagName("body")[ 0 ].appendChild(styleElem);
    }

    static log(message) {
        console.log(`==> ${message}`);
    }
}
