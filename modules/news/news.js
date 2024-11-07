let upvoteBtn;
let upvoteCount = 0;

async function newsData() {
  try {
    const response = await fetch("https://cors-anywhere.herokuapp.com/https://medium.com/feed/@will-carter", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/xml'
      }, 
      mode: 'cors'


    });

    response = await url.json();

    const articleTitles = response.news.slice(0, 10).map(article => article.title);
    
    console.log(articleTitles);

  } catch (error) {
    console.error("Fehler beim Abrufen der Daten:", error);
  }
}

newsData();

console.log("News-Modul geladen");
