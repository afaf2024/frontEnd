const score = document.getElementById("score");
const progress = document.getElementById("progress");
const trueBtn = document.getElementById("true-btn");
const fakeBtn = document.getElementById("fake-btn");

function setScore(value) {
    let currentPoints = progress.getAttribute("aria-valuenow");
    console.log(currentPoints);

    // progress.setAttribute("aria-valuenow", value);
}

// trueBtn.addEventListener("click", setScore(20));
//fakeBtn.addEventListener("click", setScore());


