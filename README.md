# Remote Job Board

This application is a search tool built with Bootstrap. Calling a job search API from The Muse, the application features the following:
* mobile-first design
* an informational carousel,
* a form to filter results, 
* functioning page navigation buttons, 
* Toasts" (a Bootstrap notification function), 
* and the ability to mark and see only favorite jobs.

Throughout the development and design, close attention was paid to the user experience, as seen through the visual design and UI, balance of text with visuals and icons, accessibility, hover states, alerts, and subtle animations. 

## Technologies Used
***
* HTML
* CSS
* JavaScript
* jQuery
* Bootstrap
* Google Fonts
* API from [The Muse](https://www.themuse.com/developers/api/v2)

## Getting Started
***
[Click here](https://nicscobey.github.io/job-board/) to use the app. For full functionality, explore using multiple filters and select add/remove some jobs to/from the Favorites list. 

## Challenges & Future Work
***
Challenges that had to be addressed fell under two major categories:
1. Front-end-centric development: My initial attention to this project is strictly focused on the front end of the program, which limited the ability to create user accounts, allow personal settings to be modified, and had a strong influence on the way favorites had to be stored within JavaScript
1. API Limitations: 
    * The API automatically limits 20 search results per ATPI call, which created the need for pagination and the ability to repeatedly make API calls based on the desired page
    * The API results are limited for some categories, making this application less than ideal for some career industries and users

Based on these challenges, there are two major improvements that could be implements in the future: 
1. Creating a back-end that allows users account creation, personalized settings, and storing favorites
1. Using a different API that requires OAuth or official partnership with an API provider