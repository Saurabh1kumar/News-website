const API_KEY = "1a8d0698541e439fa3ad3d862c40b848";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener('load', () => fetchNews("india"));

function reload(){
    window.location.reload();
}

async function fetchNews (query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    // console.log(data);
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-cards');

    cardsContainer.innerHTML = '';
    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newImg = cardClone.querySelector('#news-img');
    const newTitle = cardClone.querySelector('#news-title');
    const newSource = cardClone.querySelector('#news-source');
    const newDesc = cardClone.querySelector('#news-desc');

    newImg.src = article.urlToImage;
    newTitle.innerHTML = article.title;
    newDesc.innerHTML = article.description;

    const data = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });

    newSource.innerHTML = `${article.source.name} - ${data}`;

    cardClone.firstElementChild.addEventListener("click",() =>{
        window.open(article.url, "_blank");
    });
}
  
let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
});