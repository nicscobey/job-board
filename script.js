//ORDER OF OPERATIONS
//submit button is pushed
//checkbox function (appends to API link)
//go to a function that calls API and loads data to cards (there's a loadDataToCard function that exists already)


//LOAD DATA TO PAGE
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

let jobLevelsObject = {
    "Internship": "Internship",
    "Entry Level": "Entry%20Level",
    "Mid Level": "Mid%20Level",
    "Senior Level": "Senior%20Level",
    "Management": "management"
}

let jobLevels = Object.getOwnPropertyNames(jobLevelsObject);

const appendJobCategories = () => {
    // console.log("A");
    // console.log(jobCategories);
    $(jobCategories).each((job) => {
        $('.job-category-selection').append(`
            <div class="form-check">
                <input class="form-check-input job-category" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                    ${jobCategories[job]}
                </label>
            </div>
        `)
    })
}

appendJobCategories();

const appendExperienceLevels = () => {
    // console.log("A");
    // console.log(jobCategories);
    $(jobLevels).each((level) => {
        $('.experience-levels').append(`
            <div class="form-check">
                <input class="form-check-input experience-level" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                    ${jobLevels[level]}
                </label>
            </div>
        `)
    })
}

appendExperienceLevels();

//when submit button is pushed,
//clear form elements
//call API
//add cards to #jobs

const loadJobs = () => {
    console.log('enter checkbox function');
    linkAdd = "";
    for (let i = 0; i < jobCategories.length; i++) {
        // console.log(i);
        // console.log($('.form-check-input')[i]);

        //appends job categories to API URL
        if ($('.job-category')[i].checked == true) {
            // it is checked
            // apiLink += `${ jobCategoriesObject.} `
            console.log(i, "JOB CATEGORY IS CHECKED!")
            // console.log(jobCategoriesObject[jobCategories[i]])
            linkAdd += "&category=" + jobCategoriesObject[jobCategories[i]];
            console.log(linkAdd);
        }

    }
    //appends experience levels to API URL
    console.log('jobLevels length:', jobLevels.length);
    for (let i = 0; i < jobLevels.length; i++) {
        if ($('.experience-level')[i].checked == true) {
            console.log(i, "EXPERIENCE LEVEL IS CHECKED");
            // console.log(jobLevels[i]);
            linkAdd += "&level=" + jobLevelsObject[jobLevels[i]];
            console.log(linkAdd);
        }
    }

    return linkAdd;
}


const pullData = (url) => {
    $.ajax({
        // url: `https://www.themuse.com/api/public/jobs?category=Software%20Engineer&location=Flexible%20%2F%20Remote&page=1`
        url: `${url}`
    }).then(
        function (data) {
            console.log(data);
            // loadDataToCard(data);
            createJobCards(data);
        },
        function (error) {
            console.log('bad request', error);
        }
    )
}


$('form').on('submit', (event) => {
    event.preventDefault();
    $('#jobs').html("")
    console.log('submitted form')
    let apiLink = "https://www.themuse.com/api/public/jobs?location=Flexible%20%2F%20Remote&page=1";
    console.log(apiLink);
    let linkAdd = loadJobs();
    apiLink += linkAdd;
    console.log(apiLink);
    pullData(apiLink);
})



const createJobCards = (data) => {
    data.results.forEach((job) => {
        let innerText = `
            <div id="job-card-${job.id}" class="card border-secondary mb-3">
                <div class="card-header">
                    <div class="header-top-row header-row">
                        <div class="header title-employer-names">
                            <h5 class="job-title">${job.name}</h5>
                            <h6 class="employer-location card-subtitle mb-2 text-muted">${job.company.name}</h6>
                            <h7 class="date-posted card-subtitle mb-2 text-muted italics">Posted on ${job.publication_date}</h7>
                        </div>
                        <img class="nav-icon heart empty-heart" src="Images/Job Board Icons (1) copy 4.svg" width=30px>
                    </div>
                    <div class="header-bottom-row header-row card-links">
                        <button class="btn white-btn card-link" data-bs-toggle="collapse" href="#jobDescription${job.id}"
                            role="button" aria-expanded="false" aria-controls="collapseExample">
                            Learn More
                        </button>
                        <a class="btn purple-btn card-link" target = "_blank" href="${job.refs.landing_page}">
                            Apply Now
                        </a>
                    </div>
                </div>
                <div class="collapse" id="jobDescription${job.id}">
                    <div class="card-body text-secondary">
                        <p class="job-description card-text">${job.contents}</p>
                    </div>
                </div>
            </div>`

        $('#jobs').append(innerText);
    })
}


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