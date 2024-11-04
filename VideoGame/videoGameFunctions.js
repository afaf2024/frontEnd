const domainOfAPI = "https://erasmus.ieszaidinvergeles.es/fakeNews/public/api/video";
const videoContainer = document.getElementById("video");
const nextButton = document.getElementById("nextButton");
const backButton = document.getElementById("backButton");
const resultText = document.getElementById("resultText");
const result = document.getElementById("result");
const FINISH_MESSAGE = "Y";

let dataFromAPI; 
let actualVideo = 0;

window.onload = async () => {
    dataFromAPI = await fetchVideoFromAPI();
    console.log(dataFromAPI);
    setVideo(actualVideo);
};



//Set First Video

//Fetches the Data from API
async function fetchVideoFromAPI(){
    const response = await fetch(domainOfAPI);
    const data = await response.json();
    return data
}

async function setVideo(idVideo){
    videoContainer.src = dataFromAPI[idVideo].videoUrl;
    nextButton.innerText = dataFromAPI[idVideo].buttonOption1;
    backButton.innerText = dataFromAPI[idVideo].buttonOption2;
    actualVideo = idVideo;
}



//Sets the Video Changes for when a new Video is Selected
async function changeVideo(newVideoId){
    setVideo(newVideoId-1);
}

function finished (){
    resultText.innerText = "You have finished the game!";
    nextButton.style.display = "none";
    backButton.style.display = "none";
    result.style.display = "none";
}


async function nextVideo(id){

    console.log(id)
    console.log(actualVideo)

    if(id === 1){

        actualVideo = dataFromAPI[actualVideo].videoUrlOption1;

        if(!actualVideo){

            finished();

        } else {
            changeVideo(parseInt(actualVideo));
        }




    } else {

        actualVideo = dataFromAPI[actualVideo].videoUrlOption2;

        if(!actualVideo){

            finished();

        } else {
            changeVideo(parseInt(actualVideo));
        }




        
    }

}
