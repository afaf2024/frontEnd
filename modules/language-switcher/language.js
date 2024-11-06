// The locale our app first shows
const defaultLocale = "en";
const supportedLocales = ["en"];

// The active locale
let locale;

// Gets filled with active locale translations
let translations = {};

// When the page content is ready...
//document.addEventListener("DOMContentLoaded", () => {
function initializeLanguagePicker() {

    const initialLocale =
        supportedOrDefault(browserLocales(true));
    // Translate the page to the default locale
    setLocale(initialLocale);

    initializeLanguageDropdown(initialLocale);
};

/**
 * Check if the locale is supported
 * @param locale the locale that we want to check
 * @returns {boolean} false if not supported. true otherwise
 */
function isSupported(locale) {
    return supportedLocales.indexOf(locale) > -1;
}

/**
 *  Retrieve language stored in webstorage or
 *  the locale which is set according to browser or
 *  return our default locale
 * @param locales the local (e.g: de,en) which support we want to check
 * @returns {string|*|string} a local that we support
 */
function supportedOrDefault(locales) {
    return localStorage.getItem("lang") || locales.find(isSupported) || defaultLocale;
}




/**
 * Whenever the user selects a new locale, we
 * load the locale's translations and update
 * the page
 */
function initializeLanguageDropdown(initialLocale) {
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const dropdownToggle = document.getElementById('countryDropdown');
    const initialLanguageElement = document.querySelector('#language-' + initialLocale )
    const initialFlag = initialLanguageElement.querySelector('.fi').className
    const initialText =initialLanguageElement.innerText
    dropdownToggle.innerHTML = `<span class="${initialFlag}"></span> ${initialText}`

    dropdownItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const selectedFlag = this.querySelector('.fi').className;
            const selectedText = this.innerText;
            const selectedLanguage = this.dataset.value;

            // Set the locale to the selected option[value]
            localStorage.setItem("lang", selectedLanguage)
            setLocale(selectedLanguage);
            // Update the dropdown button with the selected country
            dropdownToggle.innerHTML = `<span class="${selectedFlag}"></span> ${selectedText}`;
        });
    });
};


/**
 * Retrieve user-preferred locales from the browser
 *
 * @param {boolean} languageCodeOnly - when true, returns
 * ["en", "fr"] instead of ["en-US", "fr-FR"]
 * @returns array | undefined
 */

function browserLocales(languageCodeOnly = false) {

    return navigator.languages.map((locale) =>
        languageCodeOnly ? locale.split("-")[0] : locale,
    );

}

// Load translations for the given locale and translate
// the page to this locale
async function setLocale(newLocale) {
    if (newLocale === locale) return;
    const newTranslations =
        await fetchTranslationsFor(newLocale);
    locale = newLocale;
    translations = newTranslations;
    translatePage();
}

// Retrieve translations JSON object for the given
// locale over the network
async function fetchTranslationsFor(newLocale) {
    const response = await fetch(`/modules/language-switcher/data/${newLocale}.json`);
    return await response.json();
}

// Replace the inner text of each element that has a
// data-i18n-key attribute with the translation corresponding
// to its data-i18n-key

function translatePage() {

    document

        .querySelectorAll("[data-i18n-key]")

        .forEach(translateElement);

}

// Replace the inner text of the given HTML element

// with the translation in the active locale,

// corresponding to the element's data-i18n-key

function translateElement(element) {

    const key = element.getAttribute("data-i18n-key");

    const translation = translations[key];

    element.innerHTML = translation;

}