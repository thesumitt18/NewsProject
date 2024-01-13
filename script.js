// API Key for accessing the News API
const API_KEY = "c1113b8e57ce42979b9065bbf04c0818";
// Base URL for the News API
const url = "https://newsapi.org/v2/everything?q=";


// Event listener for when the window has finished loading
window.addEventListener("load", () => fetchNews("India"));

// Function to reload the webpage
function reload() {
    window.location.reload();
}

// Asynchronous function to fetch news data based on a query
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

// Function to bind news data to the HTML template
function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    // Clear the existing content in the cards container
    cardsContainer.innerHTML = "";

    // Iterate through each article and create news cards
    articles.forEach((article) => {
        // Skip articles without an image
        if (!article.urlToImage) return;

        // Clone the news card template and fill data
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);

        // Append the card to the container
        cardsContainer.appendChild(cardClone);
    });
}

// Function to fill data in a news card
function fillDataInCard(cardClone, article) {
    // Extract elements from the cloned template
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    // Fill data into the card elements
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    // Format and display the publication date and source
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });
    newsSource.innerHTML = `${article.source.name} · ${date}`;

    // Open the article in a new tab when the card is clicked
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

// Variable to keep track of the currently selected navigation item
let curSelectedNav = null;

// Function to handle navigation item click events
function onNavItemClick(id) {
    // Fetch news based on the clicked navigation item
    fetchNews(id);

    // Highlight the active navigation item
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

// Get references to the search button and search text input
const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

// Event listener for the search button click event
searchButton.addEventListener("click", () => {
    // Get the search query from the input field
    const query = searchText.value;
    if (!query) return; // Skip if the query is empty

    // Fetch news based on the search query
    fetchNews(query);

    // Remove the active class from the selected navigation item
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
