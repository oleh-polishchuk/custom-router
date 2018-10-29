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
