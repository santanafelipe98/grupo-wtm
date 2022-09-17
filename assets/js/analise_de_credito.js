$(document).ready(function () {
    $('.person-type-card').click(function() {
        const target = $($(this).data('target'))

        $('.queries').each(function(i, el) {
            $(el).addClass('hidden')
        })

        target.removeClass('hidden')
    })
})