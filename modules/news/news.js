

const cards = document.querySelectorAll('.ag-courses_item');
const cardTitles = document.querySelectorAll('.ag-courses-item_title');
const cardDate = document.querySelectorAll('.ag-courses-item_date');
const cardDescription = document.querySelectorAll('.ag-courses-item_description');





async function setNews() {

    const lang = localStorage.getItem("lang");
    
    const data = await getNews(lang);
    
    console.log(data.original[0])

    let cont = -1;

    cardTitles.forEach(cardTitle => {
        
        cardTitle.innerHTML = data.original[++cont].title;
        cardDate[cont].innerHTML = data.original[cont].pubDate;
        cardDescription[cont].innerHTML = data.original[cont].description.length > 60 
        ? data.original[cont].description.slice(0, 60) + '...'
        : data.original[cont].description;
        

        
        // Open a new tab but dont focus on it (open in background)
        const card = cardTitle.parentElement;

        card.addEventListener('click', () => {
            window.open(data.original[cont].link, '_blank');
        });
        
    
        
        
    });
    
}


async function getNews(lang) {
    if (!lang) {
        lang = 'en';
    }

    const response = await fetch(`https://erasmus.ieszaidinvergeles.es/fakeNews/public/api/news/${lang}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });

    // json
    const data = await response.json();
    
   
    return data;
    
}