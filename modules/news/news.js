

const cards = document.querySelectorAll('.ag-courses_item');
const cardTitles = document.querySelectorAll('.ag-courses-item_title');

async function setNews() {

    const lang = document.documentElement.lang;
    await getNews(lang);

    cardTitles.forEach(cardTitles => {
        
            cardTitles.innerHTML = 'Noticia';

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
            'Content-Type': 'application/xml',
            'Access-Control-Allow-Origin': '*'
        }
    });

    if (response.ok) {
        const xml = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, 'application/xml');

        // Aquí puedes procesar el documento XML
        console.log(doc);
    } else {
        console.error('Error fetching news:', response.status);
    }
    
}