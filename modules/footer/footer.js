function insertFooter() {
  fetch("../modules/footer/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footerBox").innerHTML = data;
    });
}

window.addEventListener("load", insertFooter);