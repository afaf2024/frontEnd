let upvoteBtn;
let upvoteCount = 0;

async function newsData() {
  try {
    const url = await fetch("https://www.tagesschau.de/api2/news/?ressort=inland");
    const response = await url.json();

    const articleTitles = response.news.slice(0, 10).map(article => article.title);
    
    console.log(articleTitles);

  } catch (error) {
    console.error("Fehler beim Abrufen der Daten:", error);
  }
}

newsData();
