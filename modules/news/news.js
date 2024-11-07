

const cards = document.querySelectorAll('.ag-courses_item');
const cardTitles = document.querySelectorAll('.ag-courses-item_title');



async function setNews() {

    const lang = localStorage.getItem("lang");
    
    const data = await getNews(lang);
    let cont = 0;

    cardTitles.forEach(cardTitles => {
        
        cardTitles.innerHTML = data[++cont].title;

        

        
            







        /*
        caja.addEventListener('click', () => {
            const id = caja.dataset.id;
            window.location.href = `./news-detail.html?id=${id}`;
        });
        */
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