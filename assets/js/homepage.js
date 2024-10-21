// window.addEventListener('load', () => {
//     const content = document.querySelectorAll('.content');
//     content.style.opacitiy = 1; 
// })
const apiRoute = "https://cgarort2508.ieszaidinvergeles.es/fakeNews/fakeNews/public/api/admin";
//Eine Methode welche im Nachgang einen String bearbeiten kann
const formatString = (template, ...args) => {
    return template.replace(/{([0-9]+)}/g, function (match, index) {
      return typeof args[index] === 'undefined' ? match : args[index];
    });
  }

// String vom Html für eine Card
// {0} = Title; {1} = Date
const designOfACard = `          
<div class="ag-courses_item">
    <a href="#" class="ag-courses-item_link">
    <div class="ag-courses-item_bg"></div>

    <div class="ag-courses-item_title">
        {0}
    </div>

    <div class="ag-courses-item_date-box">
        Start:
        <span class="ag-courses-item_date">
        {1}
        </span>
    </div>
    </a>
</div>`

async function setNewsCards(){
    let response = await fetch(apiRoute + "endpoint");
    let dataJson = await response.json()
    let nexBoxElement = document.getElementById("newsBox");

    dataJson.forEach(element => {
        let htmlToAdd = formatString(designOfACard, dataJson.title, dataJson.date);
        nexBoxElement.insertAdjacentHTML("beforeend", htmlToAdd)
    });
}