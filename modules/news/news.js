

const cards = document.querySelectorAll('.ag-courses_item');
const cardTitles = document.querySelectorAll('.ag-courses-item_title');
const cardDate = document.querySelectorAll('.ag-courses-item_date');
const cardDescription = document.querySelectorAll('.ag-courses-item_description');

const xmlUrlSpain = "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/section/internacional/portada";
const xmlUrlGerman = "https://www.tagesschau.de/infoservices/alle-meldungen-100~rss2.xml";
const xmlUrlItalian = "https://www.ansa.it/sito/notizie/mondo/mondo_rss.xml";
const xmlUrlEnglish = "https://www.reutersagency.com/feed/?taxonomy=best-sectors&post_type=best";


async function setNews() {

    const lang = localStorage.getItem("lang");

    const data = await getNews(lang);

    console.log(data);

    let cont = -1;

    cardTitles.forEach(cardTitle => {

        cardTitle.innerHTML = data[++cont].title;
        cardDate[cont].innerHTML = data[cont].pubDate;
        cardDescription[cont].innerHTML = data[cont].description;


        // Open a new tab but dont focus on it (open in background)
        const card = cardTitle.parentElement;

        card.addEventListener('click', () => {
            window.open(data[cont].link, '_blank');
        });




    });

}


async function getNews(lang){

    let xmlUrl = "";

    switch(lang){
        case "es":
            xmlUrl = xmlUrlSpain;
            break;
        case "de":
            xmlUrl = xmlUrlGerman;
            break;
        case "it":
            xmlUrl = xmlUrlItalian;
            break;
        case "en":
            xmlUrl = xmlUrlEnglish;
            break;
        default:
            xmlUrl = xmlUrlEnglish;
            break;
    }

    const response = await fetch(xmlUrl);
    const xml = await response.text();
    const parser = new DOMParser();
    const xmlDOM = parser.parseFromString(xml, 'text/xml');
    // convert to json
    const items = xmlDOM.querySelectorAll('item');
    const data = [];

    items.forEach(item => {
        data.push({
            title: item.querySelector('title').textContent,
            description: item.querySelector('description').textContent,
            link: item.querySelector('link').textContent,
            pubDate: item.querySelector('pubDate').textContent
        });
    });

    return data;
    
}