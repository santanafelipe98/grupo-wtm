$(document).ready(function() {
    const tabs     = $('.tab')
    const tabViews = $('.tab-view')

    let activeIndex = 0

    function setCurrentTab(index) {
        tabViews.addClass('hidden')
        const currentTab = $(tabViews.get(index))

        currentTab.removeClass('hidden')
    }

    setCurrentTab(activeIndex)

    tabs.on('click', function(e) {
        e.preventDefault()

        tabs.removeClass('active')
        $(this).addClass('active')

        activeIndex = $(this).index()
        setCurrentTab(activeIndex)
    })
})


