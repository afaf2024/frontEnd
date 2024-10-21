function insertNavigation() {
  fetch("../modules/navigation/navigation.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navigation").innerHTML = data;
    });
}

const link = document.getElementById("link");
const fadeOut = document.getElementById("fade-out");

if(link) {
  link.addEventListener("click", (e) => {
    e.preventDefault();
  
    const clickX = e.clientX;
    const clickY = e.clientY;
  
    // fadeOut.style.left = clickX + "px";
    // fadeOut.style.top = clickY + "px";
    // fadeOut.style.width = "0";
    // fadeOut.style.height = "0";
    fadeOut.style.opacity = "1";
    fadeOut.classList.add("fade-out");
  
    setTimeout(function () {
      fadeOut.style.opacity = "0";
      window.location.href += "pages/homepage.html";
    }, 1000);
  });
}