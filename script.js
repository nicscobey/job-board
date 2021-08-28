//populate form fields
// let jobCategoriesArray = [
//     { "Accounting": "Accounting" },
//     { "Account Management & Customer Success": "Account%20Management%2FCustomer%20Success" },
//     { "Corporate": "Corporate" },
//     { "Customer Service": "Customer%20Service%20Career" },
//     { "Data Science": "Data%20Science" },
//     { "Design": "Design" },
//     { "Editor": "Editor" },
//     { "Education": "Education" },
//     { "Human Resources": "HR" },
//     { "Information Technology": "IT" },
//     { "Law": "Law" },
//     { "Marketing": "Marketing" },
//     { "Mechanic": "Mechanic" },
//     { "Mental Health": "Mental%20Health" },
//     { "Nursing": "Nurses" },
//     { "Office Administration": "Office%20Administration" },
//     { "Physical Assistant": "Physical%20Assistant" },
//     { "Product": "Product" },
//     { "Project Management": "Project%20Management" },
//     { "Public Relations": "Public%20Relations" },
//     { "Recruiting": "Recruiting" },
//     { "Retail": "Retail" },
//     { "Sales": "Sales" },
//     { "Software Engineering": "Software%20Engineer" },
//     { "User Experience": "User%20Experience" },
//     { "Videography": "Videography" },
//     { "Writing": "Writing" }
// ];

let jobCategoriesObject = {
    "Accounting": "Accounting",
    "Account Management & Customer Success": "Account%20Management%2FCustomer%20Success",
    "Corporate": "Corporate",
    "Customer Service": "Customer%20Service%20Career",
    "Data Science": "Data%20Science",
    "Design": "Design",
    "Editor": "Editor",
    "Education": "Education",
    "Human Resources": "HR",
    "Information Technology": "IT",
    "Law": "Law",
    "Marketing": "Marketing",
    "Mechanic": "Mechanic",
    "Mental Health": "Mental%20Health",
    "Nursing": "Nurses",
    "Office Administration": "Office%20Administration",
    "Physical Assistant": "Physical%20Assistant",
    "Product": "Product",
    "Project Management": "Project%20Management",
    "Public Relations": "Public%20Relations",
    "Recruiting": "Recruiting",
    "Retail": "Retail",
    "Sales": "Sales",
    "Software Engineering": "Software%20Engineer",
    "User Experience": "User%20Experience",
    "Videography": "Videography",
    "Writing": "Writing"
}

let jobCategories = Object.getOwnPropertyNames(jobCategoriesObject);

$(jobCategories).each((index) => {
    // console.log(index)
    // console.log(jobCategories[index])
});

let jobLevels = ["Entry Level", "Mid Level", "Senior Level", "Management", "Internship"];

const appendJobCategories = () => {
    // console.log("A");
    // console.log(jobCategories);
    $(jobCategories).each((job) => {
        $('.job-category-selection').append(`
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                    ${jobCategories[job]}
                </label>
            </div>
        `)
    })
}

appendJobCategories();

let apiLink = "https://www.themuse.com/api/public/jobs?location=Flexible%20%2F%20Remote&page=1";
let text = "Nursing"
apiLink += jobCategoriesObject[text];

console.log(apiLink);

const checkboxFunction = () => {
    console.log('enter checkbox function');
    for (let i = 0; i < jobCategories.length; i++) {
        console.log(i);
        console.log($('.form-check-input')[i]);
        if ($('.form-check').is(":checked")) {
            // it is checked
            // apiLink += `${ jobCategoriesObject.} `
            console.log(i, "SOMETHING IS CHECKED!")
            apiLink += jobCategoriesObject[Nursing]
        }
    }
}

// console.log(`https://www.themuse.com/api/public/jobs?******&location=Flexible%20%2F%20Remote&page=1`)

//make carousel text smaller

//if screen width 480px or higher, add .fixed-top to nav, and remove .fixed-bottom
let nav = $('.navbar');
const moveNav = () => {
    // console.log($(window).width());
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

$('form').on('submit', (event) => {
    event.preventDefault();
    console.log('submitted form')
    checkboxFunction();
})


$.ajax({
    url: `https://www.themuse.com/api/public/jobs?category=Software%20Engineer&location=Flexible%20%2F%20Remote&page=1`
}).then(
    function (data) {
        console.log(data);
        loadDataToCard(data);
    },
    function (error) {
        console.log('bad request', error);
    }
)

let loadDataToCard = (data) => {
    $(`.job-title`).html(data.results[0].name)
    $('.employer-location').html(`${data.results[0].company.name}`)
    $('.date-posted').html(data.results[0].publication_date)
    $('.job-description').html(data.results[0].contents)
}

//clicking "Add to Favorites" button
//changes img source of fav icon... perhaps with an animation of popping out and popping back in as new img
//add notification that it was added to favorites
//add that job to an array of favorited icons

let favoriteJobs = [];
$(document).on('click', (event) => {
    if ($(event.target).hasClass("empty-heart")) {
        console.log("YAY HOORAY!");
        $(event.target).attr('src', 'Images/Job Board Icons (1) copy.svg').addClass('filled-heart').removeClass('empty-heart');
    }
    else if ($(event.target).hasClass("filled-heart")) {
        console.log("WOAH!");
        $(event.target).attr('src', 'Images/Job Board Icons (1) copy 4.svg').addClass('empty-heart').removeClass('filled-heart');
    }
    // if ($(event.target).hasClass("empty-heart")) {
    //     console.log("YAY HOORAY!");
    //     console.log($(event.target));
    //     hideTarget($(event.target));
    //     showSibling($(event.target).next())
    //     // $(event.target).addClass('hidden');
    //     // $(event.target).next().removeClass('hidden');
    // }
    // else if ($(event.target).hasClass("filled-heart")) {
    //     console.log("WOAH!");
    //     $(event.target).addClass('hidden');
    //     $(event.target).prev().removeClass('hidden');
    // }
})

// const hideTarget = (heart) => {
//     console.log('remove hidden!');
//     // console.log(heart);
//     // $(heart).css({ 'display': 'none', 'width': '40px' })
//     $(heart).animate({ width: '40px' }, 50)
//     $(heart).animate({ width: '30px', 'opacity': '0', 'width': '0px' }, 50)
// }

// const showSibling = (heart) => {
//     console.log('show hidden!');
//     $(heart).animate({ width: '40px' }, 50)
//     $(heart).animate({ width: '30px', 'opacity': '100', 'width': '30px' }, 50)
//     // console.log(heart);
//     // $(heart).css({ 'display': 'block', 'width': '40px' })
//     // $(heart).delay(1000).css({ 'width': '30px' })
// }
//animate nav buttons
// when search button is clicked, scroll to top of page
// when hovering over .nav-button
// change a.white-text color to "var(--yellow-200)" (which is #ffe69b)
// change mouse cursor