# Custom Router

Simple router for landing page. [_>>> Demo_](http://custom-router.s3-website.eu-central-1.amazonaws.com/)

# How to use?

1. Update your nginx config:

```
server {
    listen      3030;
    server_name localhost;
    root        /Users/user-name/path-to-dir-with-index-html-file;
    index       index.html index.htm;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

2. Define your **view** with attribute `view-name=""`, for ex.:

```
<section class="section" view-name="DashboardView"><h1>Dashboard section</h1></section>
```

and your **link to the view** with attribute `navigate-to=""`, for ex.:

```
<a href="javascript:void(0)" navigate-to="/dashboard">Dashboard</a>
```

3. And finally configure your router:

```
<script src="https://s3.eu-central-1.amazonaws.com/custom-router/router.min.js"></script>
<script>
    const router = new Router([
        {
            path: '/',
            viewName: 'HomeView',
            title: 'Title',
            defaultView: true,
        },
        {
            path: '/dashboard',
            viewName: 'DashboardView',
            title: 'Dashboard',
        },
        {
            path: '/invoices',
            viewName: 'InvoicesView',
            title: 'Invoices',
        },
        {
            path: '/about',
            viewName: 'AboutView',
            title: 'About',
        },
    ]);

    router.init();
</script>
```

## Nginx

### for MacOS

Show current nginx configuration:

    nginx -V

Restart nginx server:

    sudo brew services restart nginx
