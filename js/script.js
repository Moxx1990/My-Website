let currentTestimonialIndex = 1;
let isTransitioningTestimonial = false;

/**
 * Calculates the horizontal translation offset based on the window viewport width.
 * @param {number} width - The current window inner width in pixels.
 * @returns {number} The calculated CSS translateX pixel offset value.
 */
function calculateTestimonialOffset(width) {
    if (width >= 769 && width <= 1023) {
        const positions = [80, -560, -1200]; 
        return positions[currentTestimonialIndex] || 0;
    }
    if (width >= 479 && width <= 768) {
        const positions = [70, -330, -730]; 
        return positions[currentTestimonialIndex] || 0;
    }
    if (width <= 478) {
        const positions = [0, -310, -620]; 
        return positions[currentTestimonialIndex] || 0;
    }
    return currentTestimonialIndex * -780;
}

/**
 * Re-calculates positions and updates styles of the testimonial horizontal belt slider container.
 * @returns {void}
 */
function renderTestimonial() {
    const offset = calculateTestimonialOffset(window.innerWidth);
    document.getElementById('testimonial-belt').style.transform = `translateX(${offset}px)`;
    document.querySelectorAll('.testimonial-card').forEach((card, i) => {
        card.classList.toggle('focused', i === currentTestimonialIndex);
    });
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentTestimonialIndex);
    });
}

/**
 * Shifts the testimonial index by a dynamic relative delta (e.g., -1 for backward, +1 for forward), 
 * handling edge-wraparounds smoothly before initiating a visual repaint.
 * @param {number} direction - Direction value modifier integer (typically -1 or 1).
 * @returns {void}
 */
function switchTestimonial(direction) {
    const cards = document.querySelectorAll('.testimonial-card');
    currentTestimonialIndex = (currentTestimonialIndex + direction + cards.length) % cards.length;
    renderTestimonial();
}

/**
 * Validates that the "Name" input field contains non-whitespace string characters.
 * Toggles structural validation layout classes and dynamically alters placeholder texts.
 * @returns {boolean} True if the input value is structurally valid, otherwise false.
 */
function checkName() {
    const field = document.getElementById('name');
    const isValid = field.value.trim() !== "";
    field.classList.toggle('input-error', !isValid);
    field.placeholder = isValid ? "Your name goes here" : "Oops! It seems your name is missing";
    return isValid;
}

/**
 * Validates the syntax of the contact form's Email field in real-time.
 * @returns {boolean} True if input data is a valid email, false otherwise.
 */
function checkEmail() {
    const field = document.getElementById('email');
    const value = field.value.trim();
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = value !== "" && emailRegEx.test(value);
    if (!isValid && value !== "") {
        field.style.borderColor = "red";
        field.style.borderWidth = "2px";
        field.placeholder = "Hoppla! Das ist keine gültige E-Mail";
    } else {
        field.style.borderColor = ""; 
        field.style.borderWidth = "";
        field.placeholder = "youremail@email.com";
    }
    field.classList.toggle('input-error', !isValid);
    return isValid;
}

/**
 * Validates the "Help/Message" textarea message body payload field content.
 * Updates CSS validation UI states and placeholder text dynamically.
 * @returns {boolean} True if the message textarea payload contains non-whitespace characters, false otherwise.
 */
function checkHelp() {
    const field = document.getElementById('help');
    const isValid = field.value.trim() !== "";
    field.classList.toggle('input-error', !isValid);
    field.placeholder = isValid ? "Hello Max, I am interested in..." : "Please tell me how I can help.";
    return isValid;
}

/**
 * Checks if the legal terms & data processing privacy checklist checkbox input is toggled active.
 * Directs visual contextual validation inline error message strings onto the DOM element wrapper.
 * @returns {boolean} True if the checkbox element state is actively checked, false otherwise.
 */
function checkConsent() {
    const field = document.getElementById('consent');
    const isValid = field.checked;
    document.getElementById('consent-error').innerText = isValid ? "" : "Please accept the privacy policy.";
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
    document.getElementById('form-content').classList.add('d-none');
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
    if (nameField && !nameField.classList.contains('input-error')) {
        nameField.placeholder = lang === "de" ? "Dein Name hier..." : "Your name goes here";
    }
    if (emailField && !emailField.classList.contains('input-error')) {
        emailField.placeholder = "youremail@email.com";
    }
    if (helpField && !helpField.classList.contains('input-error')) {
        helpField.placeholder = lang === "de" ? "Hallo Max, ich interessiere mich für..." : "Hello Max, I am interested in...";
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
    field.addEventListener('input', () => {
        validationFunc();
        toggleSubmitButtonState();
    });
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
        const isMenuLink = e.target.closest('#mobile-menu a');
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
    const menu = document.getElementById('mobile-menu');
    const burgerImg = document.getElementById('burger-img');
    if (!burger || !menu) return;
    
    setupBurgerClick(burger, menu, burgerImg);
    setupAnchorLinkClicks(menu, burgerImg); // Zuerst die direkten Klicks zuweisen!
    setupOutsideClick(burger, menu, burgerImg);
}

/**
 * Sets up global event listeners for testimonials, modal close hooks, and forms.
 * @returns {void}
 */
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('testimonial-belt')) renderTestimonial();
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
        duration: 800,
    });
});