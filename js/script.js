/**
 * Retrieves the currently selected language from LocalStorage.
 * @returns {string} "de" or "en"
 */
function getCurrentLang() {
    return localStorage.getItem("selectedLanguage") || "en";
}

/**
 * Validates that the "Name" input field contains non-whitespace string characters.
 */
function checkName() {
    const field = document.getElementById('name');
    const isValid = field.value.trim() !== "";
    const lang = getCurrentLang();
    
    field.classList.toggle('input-error', !isValid);
    field.placeholder = isValid ? translations[lang].namePlaceholder : translations[lang].nameError;
    return isValid;
}

/**
 * Validates the syntax of the contact form's Email field in real-time.
 */
function checkEmail() {
    const f = document.getElementById('email'), v = f.value.trim();
    const isValid = v !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const lang = getCurrentLang();
    
    let err = document.getElementById('email-err');
    if (!err) {
        err = Object.assign(document.createElement('span'), {id: 'email-err', className: 'field-error-message'});
        f.parentNode.appendChild(err);
    }
    f.classList.toggle('input-error', !isValid);
    err.innerText = isValid ? "" : (v === "" ? translations[lang].emailRequired : translations[lang].emailInvalid);
    err.style.display = isValid ? "none" : "block";
    return isValid;
}

/**
 * Validates the "Help/Message" textarea message body payload field content.
 */
function checkHelp() {
    const field = document.getElementById('help');
    const isValid = field.value.trim() !== "";
    const lang = getCurrentLang();
    
    field.classList.toggle('input-error', !isValid);
    field.placeholder = isValid ? translations[lang].helpPlaceholder : translations[lang].helpError;
    return isValid;
}

/**
 * Checks if the legal terms & data processing privacy checklist checkbox input is toggled active.
 */
function checkConsent() {
    const field = document.getElementById('consent');
    const isValid = field.checked;
    const lang = getCurrentLang();
    
    document.getElementById('consent-error').innerText = isValid ? "" : translations[lang].consentError;
    return isValid;
}

/**
 * Real-time helper to check if all inputs possess content AND email is valid.
 * @returns {boolean} True if structurally complete and valid, otherwise false.
 */
function isFormFilled() {
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const help = document.getElementById('help')?.value.trim();
    const consent = document.getElementById('consent')?.checked;
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = email && emailRegEx.test(email);
    
    return !!(name && isEmailValid && help && consent);
}

/**
 * Toggles the disabled attribute state on the submit button based on current form fullness.
 * @returns {void}
 */
function toggleSubmitButtonState() {
    const btn = document.querySelector('.submit__button');
    if (btn) btn.disabled = !isFormFilled();
}

/**
 * Safely extracts input data from the contact form fields and constructs a payload object.
 * @returns {{name: string, email: string, message: string}} The formatted form data payload.
 */
function getFormData() {
    return {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('help').value
    };
}

/**
 * Resets all contact form input fields, unchecks consent, and toggles visual success message states.
 * @returns {void}
 */
function resetContactForm() {
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('help').value = "";
    document.getElementById('consent').checked = false;
    document.querySelector('.form-content').classList.add('d-none');
    document.getElementById('success-message').classList.remove('d-none');
}

/**
 * Sends the form data payload to the server API via an asynchronous POST request.
 * @returns {Promise<boolean>} True if the email was successfully sent, otherwise false.
 */
async function executeEmailSubmit() {
    try {
        const response = await fetch('sites/submit.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(getFormData())
        });
        const result = await response.json();
        return result.success;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}

/**
 * Intercepts the form submission, validates all inputs, and orchestrates the email dispatch.
 * @param {SubmitEvent} event - The native browser form submission event.
 * @returns {Promise<void>} Resolves when the email process finishes.
 */
async function sendEmail(event) {
    event.preventDefault();
    const isNameValid = checkName();
    const isEmailValid = checkEmail();
    const isHelpValid = checkHelp();
    const isConsentValid = checkConsent();
    const isFormValid = isNameValid && isEmailValid && isHelpValid && isConsentValid;
    if (!isFormValid) return;
    const success = await executeEmailSubmit();
    if (success) resetContactForm();
    else alert('Mail delivery failed or an error occurred.');
}

/**
 * Updates a single element's content based on its data-translate key and selected language.
 * @param {HTMLElement} element - The DOM element to translate.
 * @param {string} lang - The active language code (e.g., "en" or "de").
 * @returns {void}
 */
function translateElement(element, lang) {
    const key = element.getAttribute("data-translate");
    const translation = translations[lang]?.[key];
    if (!translation) return;

    if (key === "skillsNeed" || key.startsWith('legal')) {
        element.innerHTML = key.startsWith('legal') 
            ? translation.replace(/\n/g, '<br>') 
            : translation;
    } else {
        element.innerHTML = translation;
    }
}

/**
 * Loops across localized translations matching custom attribute markers `[data-translate]` on the DOM view tree,
 * updating re-rendered internal text labels or formatted structural inner HTML markup elements accordingly.
 * @param {string} lang - The identifier key string of the targeted destination translation package (e.g. "en" or "de").
 * @returns {void}
 */
function updateLanguage(lang) {
    const elements = document.querySelectorAll("[data-translate]");
    elements.forEach(element => translateElement(element, lang));
    updatePlaceholders(lang);
}

/**
 * Localizes interface form element structural placeholder text definitions 
 * safely without stepping over active input runtime validation layout anomalies.
 * @param {string} lang - The dynamic destination translation short code language identifier string ("en" or "de").
 * @returns {void}
 */
function updatePlaceholders(lang) {
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const helpField = document.getElementById('help');
    const activeLang = translations[lang] ? lang : "en";
    if (nameField) {
        nameField.placeholder = nameField.classList.contains('input-error')
            ? translations[activeLang].nameError
            : translations[activeLang].namePlaceholder;
    }
    if (emailField) {
        emailField.placeholder = translations[activeLang].emailPlaceholder;
    }
    if (helpField) {
        helpField.placeholder = helpField.classList.contains('input-error')
            ? translations[activeLang].helpError
            : translations[activeLang].helpPlaceholder;
    }
}

/**
 * Attaches event listeners for strict real-time input event validation.
 * @param {string} id - The DOM element ID of the input field.
 * @returns {void}
 */
function initFieldListeners(id) {
    const field = document.getElementById(id);
    if (!field) return;
    const validationFunc = id === 'email' ? checkEmail : (id === 'name' ? checkName : checkHelp);
    field.addEventListener('blur', () => { validationFunc(); toggleSubmitButtonState(); });
    field.addEventListener('input', toggleSubmitButtonState);
}

/**
 * Initializes the language toggle switch state and its change event listener.
 * @returns {void}
 */
function initLanguageToggle() {
    const toggle = document.getElementById("lang-toggle");
    if (!toggle) return;
    let currentLang = localStorage.getItem("selectedLanguage") || "en";
    toggle.checked = (currentLang === "de");
    updateLanguage(currentLang);

    toggle.addEventListener("change", () => {
    currentLang = toggle.checked ? "de" : "en";
    localStorage.setItem("selectedLanguage", currentLang);
    updateLanguage(currentLang);
    if (document.getElementById('name').classList.contains('input-error')) checkName();
    if (document.getElementById('email').classList.contains('input-error')) checkEmail();
    if (document.getElementById('help').classList.contains('input-error')) checkHelp();
    const consentErr = document.getElementById('consent-error');
    if (consentErr && consentErr.innerText !== "") {
            consentErr.innerText = translations[currentLang].consentError;
        }
    });
}

/**
 * Closes the mobile navigation menu, restoring window scroll and burger icon state.
 * @param {HTMLElement} menu - The navigation links container element.
 * @param {HTMLElement} burgerImg - The native image asset inside the burger button wrapper.
 * @returns {void}
 */
function closeMobileMenu(menu, burgerImg) {
    menu.classList.remove('active');
    document.body.classList.remove('no-scroll');
    if (burgerImg) burgerImg.style.opacity = '1';
}

/**
 * Sets up the click/touch listener on the burger button to toggle menu visibility.
 * @param {HTMLElement} burger - The burger trigger element.
 * @param {HTMLElement} menu - The mobile links container.
 * @param {HTMLElement} burgerImg - The icon inside the burger wrapper.
 * @returns {void}
 */
function setupBurgerClick(burger, menu, burgerImg) {
    burger.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = menu.classList.toggle('active');
        document.body.classList.toggle('no-scroll', isOpen);
        if (burgerImg) burgerImg.style.opacity = isOpen ? '0' : '1';
    });
}

/**
 * Sets up direct click event listeners on the anchor links inside the mobile menu.
 * @param {HTMLElement} menu - The mobile links container.
 * @param {HTMLElement} burgerImg - The icon inside the burger wrapper.
 * @returns {void}
 */
function setupAnchorLinkClicks(menu, burgerImg) {
    const anchorLinks = menu.querySelectorAll('.header-category');
    anchorLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(() => {
                closeMobileMenu(menu, burgerImg);
            }, 50);
        });
    });
}

/**
 * Sets up a global listener to close the menu when clicking/tapping outside.
 * @param {HTMLElement} burger - The burger trigger element.
 * @param {HTMLElement} menu - The mobile links container.
 * @param {HTMLElement} burgerImg - The icon inside the burger wrapper.
 * @returns {void}
 */
function setupOutsideClick(burger, menu, burgerImg) {
    document.addEventListener('pointerdown', (e) => {
        const isMenuLink = e.target.closest('.mobile-menu a');
        const isOutside = !menu.contains(e.target) && !burger.contains(e.target);
        if ((isMenuLink || isOutside) && menu.classList.contains('active')) {
            closeMobileMenu(menu, burgerImg);
        }
    });
}

/**
 * Handles initialization and global click events for the mobile slide-out navigation layout.
 * @returns {void}
 */
function initMobileNavigation() {
    const burger = document.getElementById('burger-trigger');
    const menu = document.querySelector('.mobile-menu');
    const burgerImg = document.getElementById('burger-img');
    if (!burger || !menu) return;
    
    setupBurgerClick(burger, menu, burgerImg);
    setupAnchorLinkClicks(menu, burgerImg);
    setupOutsideClick(burger, menu, burgerImg);
}

/**
 * Sets up global event listeners for testimonials, modal close hooks, and forms.
 * @returns {void}
 */
document.addEventListener("DOMContentLoaded", () => {
    const infoContainer = document.getElementById('project-info');
    infoContainer?.addEventListener('click', (e) => e.target === infoContainer && closeCard());
    
    ['name', 'email', 'help'].forEach(initFieldListeners);

    document.getElementById('consent')?.addEventListener('change', () => {
        checkConsent();
        toggleSubmitButtonState();
    });
    initLanguageToggle();
    toggleSubmitButtonState();
    initMobileNavigation();
    AOS.init({
        duration: 1000,
    });
});