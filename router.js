class Route {

    constructor({ path = '/', viewName = '', title = '', defaultView = false }) {
        this.path = path;
        this.viewName = viewName;
        this.title = title;
        this.defaultView = defaultView;
    }

}

class RouteManager {

    constructor() {
        this.routes = [];
    }

    addRoute(route) {
        this.routes.push(route)
    }

    getCurrentRouteOrDefault() {
        let defaultRoute = this.routes.find(route => route.defaultView);
        let currentRoute = this.routes.find(route => route.path === window.location.pathname);
        return currentRoute ? currentRoute : defaultRoute;
    }

    getRouteByUrlOrDefault(url) {
        let defaultRoute = this.routes.find(route => route.defaultView);
        let currentRoute = this.routes.find(route => route.path === url);
        return currentRoute ? currentRoute : defaultRoute;
    }

}

class State {

    constructor(routeManager) {
        this.routeManager = routeManager
    }

    update() {
        const route = this.routeManager.getCurrentRouteOrDefault();
        this.updateState(route);
    }

    updateByUrl(url) {
        const route = this.routeManager.getRouteByUrlOrDefault(url);
        this.updateState(route);
    }

    updateState(route) {
        const url = `${ route.path }${ window.location.hash || window.location.search }`;
        document.title = route.title;
        window.history.pushState({ route: route }, '', url);
        dispatchEvent(new PopStateEvent('popstate', { state: {} }));
    }

    onChange(callback) {
        $(window).on('popstate', callback);
    }

}

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

class Router {

    constructor() {
        this.routeManager = new RouteManager();
        this.state = new State(this.routeManager);
        this.attributes = {};
        this.view = new View(this.routeManager, this.attributes);
    }

    setAttributes(attributes) {
        for (let key in attributes) {
            this.attributes[key] = attributes[key];
        }
    }

    addRoutes(routes) {
        for (let route of routes) {
            this.routeManager.addRoute(new Route(route))
        }
    }

    initialize() {
        this.view.injectStyles();
        this.view.onClickNavigateTo((url) => {
            this.state.updateByUrl(url);
        });
        this.state.onChange(() => {
            this.view.update();
        });
        this.state.update();
        Router.log('Router successfully initialized');
    }

    static log(message) {
        console.log(`==> ${message}`);
    }
}
