jQuery(function() {
    const arrowUp   = $('#arrow_up')
    const arrowDown = $('#arrow_down')

    function handleScroll() {
        const top        = $(window).scrollTop()

        if (top >= 300) {
            arrowUp.attr('disabled', false)
        } else {
            arrowUp.attr('disabled', true)
        }

        if (top + $(window).height() >= $(document).height() - 300) {
            arrowDown.attr('disabled', true)
        } else {
            arrowDown.attr('disabled', false)
        }
    }

    handleScroll()

    arrowUp.on('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    })

    arrowDown.on('click', function() {
        const bottom = $(document).height()

        window.scrollTo({ top: bottom, behavior: 'smooth' })
    })

    $(window).on('scroll', handleScroll)
})