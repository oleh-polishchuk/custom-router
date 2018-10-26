# Custom Router

Simple router for landing page. [_Demo_](https://s3.eu-central-1.amazonaws.com/custom-router/demo/index.html)

# How to use?

Update your nginx config:

```
server {
    listen      3030;
    server_name localhost;
    root        /Users/olehpolishchuk/workspace/custom-router;
    index       index.html index.htm;

    location / {
        try_files $uri $uri/ /index.html;
    }

}
```

And just add this before the `</head>` tag:

```
<script src="https://s3.eu-central-1.amazonaws.com/custom-router/router.min.js"></script>
<script>
    const router = new Router([
        {
            url: '/section-1',
            selector: '/custom-section-1',
        },
        {
            url: '/section-2',
            selector: '/section-2',
            defaultUrl: true,
        },
        {
            url: '/section-3',
            selector: '/section-3',
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
