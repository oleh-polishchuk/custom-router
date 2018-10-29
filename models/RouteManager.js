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
