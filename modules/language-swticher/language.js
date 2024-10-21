export const setLanguage = (languageURL) => {
    document.addEventListener("DOMContentLoaded", function() {
        const languageButtons = document.querySelectorAll(".lng-btn");

        languageButtons.forEach(function(button) {
            button.addEventListener("click", function(event) {
                event.preventDefault();
                window.location.href = languageURL;
                console.log("URL", window.location.href);
            });
        });
    });
}

const changeLanguage = (languageTexts) => {
    document.getElementById("welcome-text").textContent = languageTexts.introduction;
};

const languageButtons = document.querySelectorAll(".lng-btn");

languageButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
        event.preventDefault();
        const language = button.getAttribute("data-language");

        fetch("data/language.json")
            .then(response => response.json())
            .then(data => {
                changeLanguage(data[language]);
            })
            .catch(error => console.error('Error fetching language data:', error));
    });
});
