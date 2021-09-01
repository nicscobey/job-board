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

let visibleJobs = [];

let livePage;

let lastPage = 1;

const appendJobCategories = () => {
    // console.log("A");
    // console.log(jobCategories);
    $(jobCategories).each((job) => {
        $('.job-category-selection').append(`
            <div class="form-check form-check-inline">
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
            <div class="form-check form-check-inline">
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

const loadJobs = (page) => {
    console.log('enter checkbox function');
    linkAdd = `&page=${page}`;
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
    for (let i = 0; i < jobLevels.length; i++) {
        if ($('.experience-level')[i].checked == true) {
            // console.log(jobLevels[i]);
            linkAdd += "&level=" + jobLevelsObject[jobLevels[i]];
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
            // console.log(data);
            createJobCards(data);
            checkCurrentPage(data.page, data.page_count)
            // lastPage = data;
        },
        function (error) {
            console.log('bad request', error);
        }
    )
}


$('form').on('submit', (event) => {
    event.preventDefault();
    //add a note about search results about total search results found. add note to nav about what page we're on of total pages
    changePage(1)
})

//do the following once a page # button is clicked
const changePage = (targetPage) => {

    //do something to get the page #


    // $('#jobs').html("")
    // $('.pagination').html("");
    $('#searchForm').css('display', 'none');
    livePage = targetPage;
    lastPage = targetPage;
    let apiLink = "https://www.themuse.com/api/public/jobs?location=Flexible%20%2F%20Remote";
    let linkAdd = loadJobs(targetPage);
    apiLink += linkAdd;
    pullData(apiLink);
}

const convertDateFormat = (currentDate) => {
    let date = new Date(currentDate);
    return date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear();
}

const createJobCards = (data) => {
    $('#jobs').html("")
    $('.pagination').html("");
    $('#page-display').html("");
    // console.log('visible jobs is')
    // console.log(visibleJobs);


    visibleJobs = [];

    console.log(data)


    data.results.forEach((job) => {
        visibleJobs.push(job);

        let modifiedDateFormat = convertDateFormat(job.publication_date);


        let heartClass = "empty-heart";
        let heartImgRef = "Images/Job Board Icons (1) copy 4.svg";

        for (let i = 0; i < favoriteJobs.results.length; i++) {
            if (favoriteJobs.results[i].id == job.id) {
                heartClass = "filled-heart";
                heartImgRef = "Images/Job Board Icons (1) copy.svg";
            }
        }

        //NEED A FUNCTION HERE THAT CHECKS IF A JOB WITH ID MATCHES JOBS THAT ARE BEING ADDED HERE. IF THERE IS A MATCH, THE NEW JOB SHOULD BE CREATED WITH THE FILLED HEART

        let innerText = `
            <div id="job-card-${job.id}" class="card border-secondary mb-3">
                <div class="card-header">
                    <div class="header-top-row header-row">
                        <div class="header title-employer-names">
                            <h5 class="job-title">${job.name}</h5>
                            <h6 class="employer-location card-subtitle mb-2 text-muted">${job.company.name}</h6>
                            <h7 class="date-posted card-subtitle mb-2 text-muted italics">Posted ${modifiedDateFormat}</h7>
                        </div>
                        <img id="${job.id}" class="nav-icon heart ${heartClass}" src="${heartImgRef}" width=30px>
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


//SET PAGINATION
//NEW PAGINATION ATTEMPT (USING JUST NEXT AND LAST PAGE BUTTONS)



//TO DO //////////

//  CREATE README
//  CONSIDER OAUTH
//  STORE FAVORITES LOCALLY
//  NOTIFICATION (TOAST WHEN ADDED TO FAVORITE)


const checkCurrentPage = (currentPage, totalPages) => {

    $('#page-display').html(`Page ${currentPage} of ${totalPages}`);

    if (totalPages === 0) {
        $('#page-display').remove();
        $('#jobs').html("Sorry - No jobs found! Try another search.")
    }
    if (currentPage > 1 && currentPage < totalPages) {
        console.log("you're on a middle page! need a next and a last page button")
        createPreviousButton("Previous Page", "previous-page", currentPage)
        createNextButton("Next Page", "next-page", currentPage)
    }
    else if (currentPage === 1 && totalPages > 1) {
        console.log("you're on page 1! Only need Next Page button")
        // createPageNavButtons("Next Page", "next-page", currentPage);
        createNextButton("Next Page", "next-page", currentPage)
    }
    else if (currentPage === totalPages) {
        console.log("you're on the last page! Only need last Page button")
        // createPageNavButtons("Previous Page", "previous-page", currentPage);
        createPreviousButton("Previous Page", "previous-page", currentPage)
    }
    else {
        console.log("you're on the one and only page -- no buttons needed!")
    }
}


//I JUST ADDED SO CURRENT PAGE IS SENT HERE. HOW CAN I USE THAT SO THAT THE NEXT/PREVIOUS BUTTONS HAVE ACCESS TO A PAGE NUMBER SO THEY KNOW WHAT PAGE TO SEND WHEN CALLING THE NEW PAGE FUNCTION?
const createPageNavButtons = (buttonText, newClass, currentPage) => {
    // console.log(newClass)
    let newPageNav =
        `<li class="page-item"><a class="page-link ${newClass}" href="#">${buttonText}</a></li>`;

    $('.pagination').append(newPageNav);
}

const createNextButton = (buttonText, newClass, currentPage) => {
    console.log(newClass)
    let newPageNav =
        `<li class="page-item"><a class="page-link ${newClass}" href="#">${buttonText}</a></li>`;

    $('.pagination').append(newPageNav);
}

const createPreviousButton = (buttonText, newClass, currentPage) => {
    console.log(newClass)
    let newPageNav =
        `<li class="page-item"><a class="page-link ${newClass}" href="#">${buttonText}</a></li>`;

    $('.pagination').prepend(newPageNav);
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

let favoriteJobs = { results: [] };

const menuFunctions = () => {

}


const addToFavorites = (jobID) => {
    console.log('add to favorites');
    // console.log($('.toast-container').html());
    $('#toast-position').append(`
            <div id="addliveToast${jobID}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-body">
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                <p id="toast-text">Added to Favorites!</p>
            </div>
        </div>`);


    let toastLiveExample = $(`#addliveToast${jobID}`);
    // $('#toast-text').html(`Added to Favorites!`)

    let toast = new bootstrap.Toast(toastLiveExample);

    toast.show();

    for (let i = 0; i < visibleJobs.length; i++) {
        // console.log(visibleJobs[i].id)
        if (visibleJobs[i].id == jobID) {
            favoriteJobs.results.push(visibleJobs[i]);
        }
    }

    console.log('favoriteJobs is')
    console.log(favoriteJobs);
}

const removeFromFavorites = (jobID) => {
    console.log('remove from favorites');
    console.log(jobID)

    console.log(visibleJobs);

    $('#toast-position').append(`
            <div id="removeliveToast${jobID}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-body">
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                <p id="toast-text">Removed from Favorites!</p>
            </div>
        </div>`);


    let toastLiveExample = $(`#removeliveToast${jobID}`);
    // $('#toast-text').html(`Added to Favorites!`)

    let toast = new bootstrap.Toast(toastLiveExample);

    toast.show();

    for (let i = 0; i < visibleJobs.length; i++) {
        if (visibleJobs[i].id == jobID) {
            console.log('here we go');
            console.log(favoriteJobs);
            console.log(i);
            favoriteJobs.results.splice(i, 1);
            console.log('favoriteJobs is')
            console.log(favoriteJobs);


            //remove element from DOM
            $(`#job-card-${jobID}`).fadeOut();
            // $(`#job-card-${jobID}`).remove();
            return;
        }
    }

}

const showFavorites = () => {
    console.log('show favorites');
    console.log(favoriteJobs)

    // lastPage = visibleJobs;
    console.log('lastPage:');
    console.log(lastPage);

    //add new menu button for return to results
    //will also need to get rid of the button when the return button is clicked

    $('#return-button').removeClass('hidden');


    //     $('.navbar').prepend(`<div id="return-button" class="nav-button container-fluid" href="#">
    // <img id="nav-return-img" class="nav-icon" src="Images/Job Board Icons (1) copy 6.svg" width=40px>
    // <a id="nav-return-link" class="nav-link container-fluid white-text no-underline">Back to Results</a>
    // </div>`);

    createJobCards(favoriteJobs);
}

const returnToSearch = (data) => {
    console.log('return to search');
    console.log(lastPage)
    changePage(lastPage);
    $('#return-button').addClass('hidden');
}

const openSearchForm = () => {
    console.log('open search form');
    $('#searchForm').css('display', 'block')
    $('#jobs').html("")
    $('#return-button').addClass('hidden');
    $('.pagination').html("");
    $('#page-display').html("");
}

$(document).on('click', (event) => {
    if ($(event.target).hasClass("empty-heart")) {
        console.log("YAY HOORAY!");
        $(event.target).attr('src', 'Images/Job Board Icons (1) copy.svg').addClass('filled-heart').removeClass('empty-heart');
        // console.log(heart.indexOf(event.target));

        let jobID = $(event.target).attr('id');
        addToFavorites(jobID);
    }
    else if ($(event.target).hasClass("filled-heart")) {
        console.log("WOAH!");
        $(event.target).attr('src', 'Images/Job Board Icons (1) copy 4.svg').addClass('empty-heart').removeClass('filled-heart');

        let jobID = $(event.target).attr('id');
        removeFromFavorites(jobID);
    }
    else if ($(event.target).hasClass('next-page')) {
        console.log('next page, please!')
        changePage(livePage + 1);
    }
    else if ($(event.target).hasClass('previous-page')) {
        console.log('previous page, please!')
        changePage(livePage - 1);
    }
    else if ($(event.target) == $('#nav-menu-img')) {
        console.log('nav-menu-img')
        console.log("IT WORKED!")
    }
    else if ($(event.target).attr('id') === 'nav-menu-img' || $(event.target).attr('id') === 'nav-menu-link') {
        console.log("MENU LINK")
    }
    else if ($(event.target).attr('id') === 'nav-favorites-img' || $(event.target).attr('id') === 'nav-favorites-link') {
        console.log("FAVORITES LINK")
        showFavorites();
    }
    else if ($(event.target).attr('id') === 'nav-search-img' || $(event.target).attr('id') === 'nav-search-link') {
        console.log("SEARCH LINK")
        openSearchForm();
    }
    else if ($(event.target).attr('id') === 'nav-return-img' || $(event.target).attr('id') === 'nav-return-link') {
        console.log("RETURN LINK");
        returnToSearch(lastPage);
        // openSearchForm();
    }
})

$(document).on('mouseover', (event) => {
    if ($(event.target).attr('id') === 'nav-menu-img' || $(event.target).attr('id') === 'nav-menu-link') {
        $('#nav-menu-link').css('color', 'var(--yellow-200)')
    }
    else if ($(event.target).attr('id') === 'nav-favorites-img' || $(event.target).attr('id') === 'nav-favorites-link') {
        $('#nav-favorites-link').css('color', 'var(--yellow-200)')
    }
    else if ($(event.target).attr('id') === 'nav-search-img' || $(event.target).attr('id') === 'nav-search-link') {
        $('#nav-search-link').css('color', 'var(--yellow-200)')
    }
    else if ($(event.target).attr('id') === 'nav-return-img' || $(event.target).attr('id') === 'nav-return-link') {
        $('#nav-return-link').css('color', 'var(--yellow-200)')
    }
})

$(document).on('mouseout', (event) => {
    if ($(event.target).attr('id') === 'nav-menu-img' || $(event.target).attr('id') === 'nav-menu-link') {
        $('#nav-menu-link').css('color', 'white')
    }
    else if ($(event.target).attr('id') === 'nav-favorites-img' || $(event.target).attr('id') === 'nav-favorites-link') {
        $('#nav-favorites-link').css('color', 'white')
    }
    else if ($(event.target).attr('id') === 'nav-search-img' || $(event.target).attr('id') === 'nav-search-link') {
        $('#nav-search-link').css('color', 'white')
    }
    else if ($(event.target).attr('id') === 'nav-return-img' || $(event.target).attr('id') === 'nav-return-link') {
        $('#nav-return-link').css('color', 'white')
    }
})

        //use this to change color of text when hovering over the img or the link
        // $('.#nav-menu-link').css('color', 'var(--yellow-200)')



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