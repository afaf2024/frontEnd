

const cards = document.querySelectorAll('.ag-courses_item');
const cardTitles = document.querySelectorAll('.ag-courses-item_title');
const cardDate = document.querySelectorAll('.ag-courses-item_date');
const cardDescription = document.querySelectorAll('.ag-courses-item_description');





async function setNews() {

    const lang = localStorage.getItem("lang");
    
    const data = await getNews(lang);

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


async function getNews(lang) {

    const response = await fetch(`https://erasmus.ieszaidinvergeles.es/fakeNews/public/api/news/${lang}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });

    // json
    const data = await response.json();
    console.log(data);
    return data;
    
}