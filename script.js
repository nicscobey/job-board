//make carousel text smaller

//if screen width 480px or higher, add .fixed-top to nav, and remove .fixed-bottom

let nav = $('.navbar');
const moveNav = () => {
    console.log($(window).width());
    if ($(window).width() > 479) {
        nav.addClass('fixed-top').removeClass('fixed-bottom');
    }
    else {
        nav.removeClass('fixed-top').addClass('fixed-bottom');
    }
}
moveNav();

$(window).resize(() => {
    moveNav();
})

//when submit button is pushed,
//clear form elements
//call API
//add cards to #jobs

//clicking "Add to Favorites" button
//changes img source of fav icon... perhaps with an animation of popping out and popping back in as new img
//add notification that it was added to favorites
//add that job to an array of favorited icons

let favoriteJobs = [];

//animate nav buttons
//when search button is clicked, scroll to top of page
//when hovering over .nav-button
//change a.white-text color to "var(--yellow-200)" (which is #ffe69b)
//change mouse cursor