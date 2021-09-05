//LOAD DATA TO PAGE
let jobCategoriesObject = {
    "Accounting": "Accounting",
    "Account Management": "Account%20Management%2FCustomer%20Success",
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

let lastPage = 0;

let showingFavorites = false;

const appendJobCategories = () => {
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
    linkAdd = `&page=${page}`;
    // linkAdd = `&page=0`;
    for (let i = 0; i < jobCategories.length; i++) {
        //appends job categories to API URL
        if ($('.job-category')[i].checked == true) {
            linkAdd += "&category=" + jobCategoriesObject[jobCategories[i]];
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
        url: `${url}`
    }).then(
        function (data) {
            createJobCards(data);
            checkCurrentPage(data.page, data.page_count)
        },
        function (error) {
            console.log('bad request', error);
        }
    )
}


$('form').on('submit', (event) => {
    event.preventDefault();
    changePage(0)
})

//do the following once a page # button is clicked
const changePage = (targetPage) => {
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


    visibleJobs = [];

    data.results.forEach((job) => {
        visibleJobs.push(job);

        let modifiedDateFormat = convertDateFormat(job.publication_date);


        let heartClass = "empty-heart";
        let heartImgRef = "Images/PurpleTransHeart.svg";

        for (let i = 0; i < favoriteJobs.results.length; i++) {
            if (favoriteJobs.results[i].id == job.id) {
                heartClass = "filled-heart";
                heartImgRef = "Images/PurpleFilledHeart.svg";
            }
        }

        //NEED A FUNCTION HERE THAT CHECKS IF A JOB WITH ID MATCHES JOBS THAT ARE BEING ADDED HERE. IF THERE IS A MATCH, THE NEW JOB SHOULD BE CREATED WITH THE FILLED HEART

        let innerText = `
            <div id="job-card-${job.id}" class="card border-secondary mb-3">
                <div class="card-header">
                    <div class="header-top-row header-row">
                        <div class="header title-employer-names">
                            <h5 class="job-title">${job.name}</h5>
                            <h6 class="employer-location card-subtitle mb-2">${job.company.name}</h6>
                            <h7 class="date-posted card-subtitle mb-2 italics">Posted ${modifiedDateFormat}</h7>
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

//TO DO //////////

//  CREATE README
//  CONSIDER OAUTH
//  STORE FAVORITES LOCALLY


const checkCurrentPage = (currentPage, totalPages) => {
    //account for starting page being 0;
    currentPage++;

    $('#page-display').html(`Page ${currentPage} of ${totalPages}`);

    if (totalPages === 0) {
        $('#page-display').remove();
        $('#jobs').html("Sorry - No jobs found! Try another search.")
    }
    if (currentPage > 1 && currentPage < totalPages) {
        createPreviousButton("Previous Page", "previous-page", currentPage)
        createNextButton("Next Page", "next-page", currentPage)
    }
    else if (currentPage === 1 && totalPages > 1) {
        createNextButton("Next Page", "next-page", currentPage)
    }
    else if (currentPage === totalPages && totalPages > 1) {
        createPreviousButton("Previous Page", "previous-page", currentPage)
    }
}


//I JUST ADDED SO CURRENT PAGE IS SENT HERE. HOW CAN I USE THAT SO THAT THE NEXT/PREVIOUS BUTTONS HAVE ACCESS TO A PAGE NUMBER SO THEY KNOW WHAT PAGE TO SEND WHEN CALLING THE NEW PAGE FUNCTION?
const createPageNavButtons = (buttonText, newClass, currentPage) => {
    let newPageNav =
        `<li class="page-item"><a class="page-link ${newClass}" href="#">${buttonText}</a></li>`;

    $('.pagination').append(newPageNav);
}

const createNextButton = (buttonText, newClass, currentPage) => {
    let newPageNav =
        `<li class="page-item"><a class="page-link ${newClass}" href="#">${buttonText}</a></li>`;

    $('.pagination').append(newPageNav);
}

const createPreviousButton = (buttonText, newClass, currentPage) => {
    let newPageNav =
        `<li class="page-item"><a class="page-link ${newClass}" href="#">${buttonText}</a></li>`;

    $('.pagination').prepend(newPageNav);
}


//if screen width 480px or higher, add .fixed-top to nav, and remove .fixed-bottom
let nav = $('.navbar');
const moveNav = () => {
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

// const menuFunctions = () => {

// }


const addToFavorites = (jobID) => {
    $('#toast-position').append(`
            <div id="addliveToast${jobID}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-body">
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                <p id="toast-text">Added to Favorites!</p>
            </div>
        </div>`);


    let toastLiveExample = $(`#addliveToast${jobID}`);

    let toast = new bootstrap.Toast(toastLiveExample);

    toast.show();

    for (let i = 0; i < visibleJobs.length; i++) {
        if (visibleJobs[i].id == jobID) {
            favoriteJobs.results.push(visibleJobs[i]);
        }
    }

}

const removeFromFavorites = (jobID) => {

    $('#toast-position').append(`
            <div id="removeliveToast${jobID}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-body">
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                <p id="toast-text">Removed from Favorites!</p>
            </div>
        </div>`);


    let toastLiveExample = $(`#removeliveToast${jobID}`);

    let toast = new bootstrap.Toast(toastLiveExample);

    toast.show();

    for (let i = 0; i < favoriteJobs.results.length; i++) {
        if (favoriteJobs.results[i].id == jobID) {
            //remove element from favorites array
            favoriteJobs.results.splice(i, 1);
            i--;
        }
    }

    if (showingFavorites) {
        for (let i = 0; i < visibleJobs.length; i++) {
            if (visibleJobs[i].id == jobID) {
                //remove element from DOM
                $(`#job-card-${jobID}`).fadeOut();
                return;
            }
        }
    }
}

const showFavorites = () => {
    $('#searchForm').css('display', 'none');

    //add new menu button for return to results
    //will also need to get rid of the button when the return button is clicked
    $('#return-button').removeClass('hidden');

    createJobCards(favoriteJobs);
}

const returnToSearch = (data) => {
    showingFavorites = false;
    changePage(lastPage);
    $('#return-button').addClass('hidden');
}

const openSearchForm = () => {
    $('#searchForm').css('display', 'block')
    $('#jobs').html("")
    $('#return-button').addClass('hidden');
    $('.pagination').html("");
    $('#page-display').html("");
}

$(document).on('click', (event) => {
    if ($(event.target).hasClass("empty-heart")) {
        $(event.target).attr('src', "Images/PurpleFilledHeart.svg").addClass('filled-heart').removeClass('empty-heart');

        let jobID = $(event.target).attr('id');
        addToFavorites(jobID);
    }
    else if ($(event.target).hasClass("filled-heart")) {
        $(event.target).attr('src', 'Images/PurpleTransHeart.svg').addClass('empty-heart').removeClass('filled-heart');

        let jobID = $(event.target).attr('id');
        removeFromFavorites(jobID);
    }
    else if ($(event.target).hasClass('next-page')) {
        changePage(livePage + 1);
    }
    else if ($(event.target).hasClass('previous-page')) {
        changePage(livePage - 1);
    }
    // else if ($(event.target) == $('#nav-menu-img')) {
    //     console.log('nav-menu-img')
    // }
    // else if ($(event.target).attr('id') === 'nav-menu-img' || $(event.target).attr('id') === 'nav-menu-link') {
    //     console.log("MENU LINK")
    // }
    else if ($(event.target).attr('id') === 'nav-favorites-img' || $(event.target).attr('id') === 'nav-favorites-link') {
        showingFavorites = true;
        showFavorites();
    }
    else if ($(event.target).attr('id') === 'nav-search-img' || $(event.target).attr('id') === 'nav-search-link') {
        showingFavorites = false;
        openSearchForm();
    }
    else if ($(event.target).attr('id') === 'nav-return-img' || $(event.target).attr('id') === 'nav-return-link') {
        showingFavorites = false;
        returnToSearch(lastPage);
    }
})

$(document).on('mouseover', (event) => {
    if ($(event.target).attr('id') === 'nav-menu-img' || $(event.target).attr('id') === 'nav-menu-link') {
        $('#nav-menu-link').css('color', '#64cbce');
    }
    else if ($(event.target).attr('id') === 'nav-favorites-img' || $(event.target).attr('id') === 'nav-favorites-link') {
        $('#nav-favorites-link').css('color', '#64cbce');
        $('#nav-favorites-img').attr('src', 'Images/BlueHeart.svg')
    }
    else if ($(event.target).attr('id') === 'nav-search-img' || $(event.target).attr('id') === 'nav-search-link') {
        $('#nav-search-link').css('color', '#64cbce');
        $('#nav-search-img').attr('src', 'Images/BlueMagGlass.svg')
    }
    else if ($(event.target).attr('id') === 'nav-return-img' || $(event.target).attr('id') === 'nav-return-link') {
        $('#nav-return-link').css('color', '#64cbce');
        $('#nav-return-img').attr('src', 'Images/BlueReturnToSearch.svg')
    }
})

$(document).on('mouseout', (event) => {
    if ($(event.target).attr('id') === 'nav-menu-img' || $(event.target).attr('id') === 'nav-menu-link') {
        $('#nav-menu-link').css('color', 'white')
    }
    else if ($(event.target).attr('id') === 'nav-favorites-img' || $(event.target).attr('id') === 'nav-favorites-link') {
        $('#nav-favorites-link').css('color', 'white');
        $('#nav-favorites-img').attr('src', 'Images/WhiteFilledHeart.svg')
    }
    else if ($(event.target).attr('id') === 'nav-search-img' || $(event.target).attr('id') === 'nav-search-link') {
        $('#nav-search-link').css('color', 'white');
        $('#nav-search-img').attr('src', 'Images/WhiteMagGlass.svg')
    }
    else if ($(event.target).attr('id') === 'nav-return-img' || $(event.target).attr('id') === 'nav-return-link') {
        $('#nav-return-link').css('color', 'white');
        $('#nav-return-img').attr('src', 'Images/WhiteReturnArrow.svg')
    }
})