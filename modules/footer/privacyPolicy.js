function insertFooter() {
  fetch("../modules/footer/privacyPolicy.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footerBox").innerHTML = data;
    });
}

window.addEventListener("load", insertFooter);