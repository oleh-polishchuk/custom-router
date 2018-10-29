class Route {

    constructor({ path = '/', viewName = '', title = '', defaultView = false }) {
        this.path = path;
        this.viewName = viewName;
        this.title = title;
        this.defaultView = defaultView;
    }

}
