new Splide('#header_slide', {
    type: 'loop',
    width: '100vw',
    height: 'calc(100vh - 100px)',
    pagination: true,
    perPage: 1,
    autoplay: true,
    speed: 3000
}).mount();

new Splide('#clientes_slider', {
    type: 'loop',
    pagination: false,
    perPage: 7,
    breakpoints: {
        992: {
            perPage: 5
        },
        768: {
            perPage: 4
        },
        560: {
            perPage: 3
        }
    },
    autoplay: true,
    speed: 3000,
    arrows: false
}).mount();