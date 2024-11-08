

const cards = document.querySelectorAll('.ag-courses_item');
const cardTitles = document.querySelectorAll('.ag-courses-item_title');
const cardDate = document.querySelectorAll('.ag-courses-item_date');
const cardDescription = document.querySelectorAll('.ag-courses-item_description');



let fetchedData = [];


async function setNews() {
    const lang = localStorage.getItem("lang");
    const data = await getNews(lang);

    cardTitles.forEach((cardTitle, index) => {
        // Usamos el índice `index` para obtener los datos de cada tarjeta
        cardTitle.innerHTML = data[index].title;
        cardDate[index].innerHTML = data[index].pubDate;
        cardDescription[index].innerHTML = data[index].description.length > 60 
            ? data[index].description.slice(0, 60) + '...'
            : data[index].description;

        // Obtener el enlace correspondiente al card actual
        const link = data[index].link;

        // Asociar el evento de clic para abrir el enlace en una nueva pestaña
        const card = cardTitle.parentElement;
        card.addEventListener('click', () => {
            window.open(link, '_blank');
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
    
    fetchedData = data;
   
    return data;
    
}

async function createPdf() {
    const pdf = new jsPDF();
    let margin = 12;
    let lineHeight = 10;
    let yOffset = margin;
    
    // Ajustes de estilo
    const titleFontSize = 14;
    const dateFontSize = 12;
    const descFontSize = 10;
    
    // Verificar si hay noticias
    if (fetchedData.length === 0) {
        await setNews();
    }
    
    // Recorrer las noticias
    fetchedData.forEach((news, index) => {
        
        // Título
        pdf.setFontSize(titleFontSize);
        pdf.setTextColor(0, 51, 102);

        const splitTitle = pdf.splitTextToSize(news.title, 180);
        splitTitle.forEach(line => {
            pdf.text(line, margin, yOffset);
            yOffset += lineHeight;
        });
        
        // Fecha
        pdf.setFontSize(dateFontSize);
        pdf.setTextColor(100);
        pdf.text(`Fecha: ${news.pubDate}`, margin, yOffset);
        yOffset += lineHeight;
        
        // Descripción con salto de línea si es largo
        pdf.setFontSize(descFontSize);
        pdf.setTextColor(50, 50, 50);
        const splitDescription = pdf.splitTextToSize(news.description, 180);
        splitDescription.forEach(line => {
            pdf.text(line, margin, yOffset);
            yOffset += lineHeight;
        });

        // link

        pdf.setTextColor(0, 0, 255);


        const splitLink = pdf.splitTextToSize(news.link, 180);
        splitLink.forEach(line => {
            pdf.text(line, margin, yOffset);
            yOffset += lineHeight;
        });

        

        
        yOffset += lineHeight * 1.5;  // Espacio entre noticias

        // Crear nueva página si el contenido llega al borde
        if (yOffset > pdf.internal.pageSize.height - margin) {
            pdf.addPage();
            yOffset = margin;
        }
    });
    
    // Descargar el PDF
    pdf.save('Noticias_Erasmus.pdf');
}


