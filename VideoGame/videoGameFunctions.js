const domainOfAPI = "https://erasmus.ieszaidinvergeles.es/fakeNews/public/api/video";
const videoContainer = document.getElementById("video");
const videoBtn1 = document.getElementById("opt1-btn");
const videoBtn2 = document.getElementById("opt2-btn");
const resultText = document.getElementById("resultText");
const result = document.getElementById("result");
const FINISH_MESSAGE = "Y";

let dataFromAPI;

window.onload = async () => {
    dataFromAPI = await fetchVideoFromAPI();
    console.log(dataFromAPI);
    setVideo(0);
};





//Set First Video

//Fetches the Data from API
async function fetchVideoFromAPI(){
    const response = await fetch(domainOfAPI);
    console.log(response);
    const data = await response.json();
    return data
}

async function setVideo(idVideo){
    videoContainer.src = dataFromAPI[idVideo].videoUrl;
    videoBtn1.innerText = dataFromAPI[idVideo].buttonOption1;
    videoBtn1.value = dataFromAPI[idVideo].videoUrlOption1;
    videoBtn2.innerText = dataFromAPI[idVideo].buttonOption2;
    videoBtn2.value = dataFromAPI[idVideo].videoUrlOption2;
}



//Sets the Video Changes for when a new Video is Selected
async function changeVideo(newVideoId){

    
    if(dataFromAPI[newVideoId-1].resultText != ""){
        console.log("Result Text: " + dataFromAPI[newVideoId-1].resultText);
        resultText.innerText = dataFromAPI[newVideoId-1].resultText;
        resultText.style.color = "black";
        resultText.style.textAlign = "center";
        document.getElementById("result").style.display = "block";
        videoBtn1.style.display = "none";
        videoBtn2.style.display = "none";
        
    }

    setVideo(newVideoId-1);
    
}



async function onClick(button){


    changeVideo(button.value);
    
}