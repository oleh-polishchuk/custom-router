(function ($) {
    $(document).ready(function () {
        console.log('==> Document is ready!');

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
    })
})(jQuery);
