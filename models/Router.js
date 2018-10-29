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
