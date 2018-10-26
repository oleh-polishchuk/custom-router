class Router {

    constructor(routes) {
        this.selectorAttribute = 'data-selector';
        this.linkAttribute = 'data-link';
        this.linkForSelectorAttribute = 'data-link-for-selector';

        this.routes = routes || [];
    }

    init() {
        let defaultLink = this.getDefaultLink();
        let currentLink = this.getCurrentLink();

        if (currentLink && this.isLinkDefined(currentLink)) {
            this.hideContent();
            this.showContentByLink(currentLink);
        } else if (defaultLink) {
            this.updateState(defaultLink);
            this.hideContent();
            this.showContentByLink(defaultLink);
        }

        this.initNavigationEventListener();
        Router.injectStyles();
        Router.log('Router successfully initialized');
    }

    addRoute(route) {
        this.routes.push(route);
    }

    addRoutes(routes) {
        routes.forEach(route => {
            this.addRoute(route);
        });
    }

    initNavigationEventListener() {
        let $links = $(`[${this.linkAttribute}]`);
        $links.each((index, $link) => {
            $($link).click(() => {
                let link = $($link).attr(`${this.linkAttribute}`);
                let linkForSelector = $($link).attr(`${this.linkForSelectorAttribute}`);

                this.updateState(link);
                this.hideContent();
                if (linkForSelector) {
                    this.showContentBySelector(linkForSelector);
                } else if (this.isLinkDefined(link)) {
                    this.showContentByLink(link);
                } else {
                    let defaultLink = this.getDefaultLink();
                    this.updateState(defaultLink);
                    this.showContentByLink(defaultLink)
                }
            });
        })
    }

    showContentByLink(link) {
        const selector = this.getSelectorByLink(link);
        $(`[${this.selectorAttribute}="${selector}"]`).each((index, item) => {
            let $section = $(item);
            if (!$section.hasClass('show')) {
                $section.addClass('show');
            }
        })
    }

    showContentBySelector(selector) {
        $(`[${this.selectorAttribute}="${selector}"]`).each((index, item) => {
            let $section = $(item);
            if (!$section.hasClass('show')) {
                $section.addClass('show');
            }
        })
    }

    hideContent() {
        $(`[${this.selectorAttribute}]`).each((index, item) => {
            $(item).removeClass('show');
        });
    }

    getCurrentLink() {
        return window.location.pathname;
    }

    updateState(url) {
        window.history.pushState({}, 'title', url);
    }

    getDefaultLink() {
        let defaultRoute = this.routes.find(route => route.defaultUrl);
        return defaultRoute && defaultRoute.url;
    }

    isLinkDefined(l) {
        return this.routes.find(route => route.url === l);
    }

    getSelectorByLink(l) {
        let route = this.routes.find(route => route.url === l);
        return route.selector;
    }

    static injectStyles() {
        let styleElem = document.createElement("style");
        styleElem.appendChild(document.createTextNode(`
            .show { 
                display: block; 
            }
        `));

        document.getElementsByTagName("body")[ 0 ].appendChild(styleElem);
    }

    static log(message) {
        console.log(`==> ${message}`);
    }
}
