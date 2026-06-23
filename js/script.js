let currentProjectName = 'Join';
let currentTestimonialIndex = 1;
let isTransitioningTestimonial = false;

/**
 * Opens the project detail modal and populates it with data based on the project name.
 * Disables body scrolling while active.
 * @param {string} projectName - The key/name of the project to open.
 * @returns {void}
 */
function openProjectInfo(projectName) {
    currentProjectName = projectName;
    const { info, number, languages, link, github } = getProjectData(projectName);
    createCard(projectName, info, number, languages, link, github);
    const infoContainer = document.getElementById('project-info');
    infoContainer.classList.add('active');
    document.body.classList.add('no-scroll');
}

/**
 * Safely extracts project metadata from the global data store, providing fallbacks for missing properties.
 * @param {string} projectName - The name of the project to retrieve.
 * @returns {{info: string, number: string, languages: string[], link: string, github: string}} The processed project data object.
 */
function getProjectData(projectName) {
    const project = projectsData[projectName];
    return {
        info: project?.info || '',
        number: project?.number || '',
        languages: project?.languages || [],
        link: project?.link || '#',
        github: project?.github || '#'
    };
}

/**
 * Orchestrates the full creation and assembly of the project detail card inside the DOM.
 * @param {string} projectName - Name of the project.
 * @param {string} info - Detailed project description text.
 * @param {string} number - The formatted index string (e.g., "01").
 * @param {string[]} languages - Technologies used.
 * @param {string} link - Deployment URL.
 * @param {string} github - Repository URL.
 * @returns {void}
 */
function createCard(projectName, info, number, languages, link, github) {
    createCardStructure(projectName, info, number, languages, link, github);
    createProjectCardLeftSide(number, projectName, info, languages, link, github);
    createProjectCardRightSide(projectName);
    createProjectCardHeaderandInfo(number, projectName);
    createProjectCardContent(info, languages);
    createProjectCardButton(github, link);
}

/**
 * Initializes the root wrapper structure for the project detail card using a template literal.
 * @param {string} projectName - Name of the project.
 * @param {string} info - Project info.
 * @param {string} number - Project number.
 * @param {string[]} languages - Technologies array.
 * @param {string} link - Project live URL.
 * @param {string} github - GitHub URL.
 * @returns {void}
 */
function createCardStructure(projectName, info, number, languages, link, github) {
    const infoContainer = document.getElementById('project-info');
    infoContainer.innerHTML = createCardStructureTemplate(projectName, info, number, languages, link, github);
}

/**
 * Injects HTML structure into the left column container of the project card.
 * @param {string} number - Project number.
 * @param {string} projectName - Name of the project.
 * @param {string} info - Project description.
 * @param {string[]} languages - Technologies array.
 * @param {string} link - Project live URL.
 * @param {string} github - GitHub URL.
 * @returns {void}
 */
function createProjectCardLeftSide(number, projectName, info, languages, link, github) {
    const leftSideContainer = document.getElementById('project-info-card-left-side');
    leftSideContainer.innerHTML = createProjectCardLeftSideTemplate(number, projectName, info, languages, link, github);
}

/**
 * Renders the header segment (number and title) within the project details modal.
 * @param {string} number - Project number string.
 * @param {string} projectName - Title of the project.
 * @returns {void}
 */
function createProjectCardHeaderandInfo(number, projectName) {
    const headerContainer = document.getElementById('project-card_header');
    headerContainer.innerHTML = createProjectCardHeaderandInfoTemplate(number, projectName);
}

/**
 * Renders the body description text and technology chips inside the project modal.
 * @param {string} info - Project description text.
 * @param {string[]} languages - List of programming languages/frameworks used.
 * @returns {void}
 */
function createProjectCardContent(info, languages) {
    const contentContainer = document.getElementById('project-card-content');
    contentContainer.innerHTML = createProjectCardContentTemplate(info, languages);
}

/**
 * Dynamically builds and injects Action Buttons (GitHub repo link / Live Demo deployment link).
 * @param {string} github - The target GitHub repository URL.
 * @param {string} link - The deployed live preview website URL.
 * @returns {void}
 */
function createProjectCardButton(github, link) {
    const buttonContainer = document.getElementById('project-info-button-container');
    buttonContainer.innerHTML = createProjectCardButtonTemplate(github, link);
}

/**
 * Generates the right side structure (e.g., control buttons, navigation arrow close buttons) of the project card modal.
 * @param {string} projectName - Name of the project.
 * @returns {void}
 */
function createProjectCardRightSide(projectName) {
    const rightSideContainer = document.getElementById('project-info-card-right-side');
    rightSideContainer.innerHTML = createProjectCardRightSideTemplate(projectName);
}

/**
 * Closes the project card detail modal overlay, empties its contents, and re-enables body page scrolling.
 * @returns {void}
 */
function closeCard() {
    const infoContainer = document.getElementById('project-info');
    infoContainer.innerHTML = "";
    infoContainer.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

/**
 * Cyclically switches the project details modal contents to show the next available project in sequence.
 * @returns {void}
 */
function switchCard() {
    const projectKeys = Object.keys(projectsData);
    const currentIndex = projectKeys.indexOf(currentProjectName);
    const nextIndex = (currentIndex + 1) % projectKeys.length;
    const nextProjectName = projectKeys[nextIndex];
    openProjectInfo(nextProjectName);
}

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
 * Validates the syntax of the contact form's Email field.
 * Handles structural requirements based on the blur state of the input focus cycle.
 * @param {boolean} [isBlurSetting=false] - If set to true, strict structural format rule checks (like the presence of '@') are actively assessed.
 * @returns {boolean} True if input data passes active validation state thresholds, false otherwise.
 */
function checkEmail(isBlurSetting = false) {
    const field = document.getElementById('email');
    const value = field.value.trim();
    let isValid = value !== "";
    if (!isValid) {
        field.placeholder = "Please enter your email.";
    } else if (isBlurSetting && !value.includes('@')) {
        field.value = "";
        field.placeholder = "Hoppla! Your email is required";
        isValid = false;
    }
    field.classList.toggle('input-error', !isValid);
    if (isValid) field.placeholder = "youremail@email.com";
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
 * Real-time helper to check if all inputs possess content and consent is checked.
 * @returns {boolean} True if structurally complete, otherwise false.
 */
function isFormFilled() {
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const help = document.getElementById('help')?.value.trim();
    const consent = document.getElementById('consent')?.checked;
    return !!(name && email && help && consent);
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
    const isValid = checkName() & checkEmail(true) & checkHelp() & checkConsent();
    if (!isValid) return;
    
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
 * Attaches event listeners to the contact form input fields for validation.
 * @param {string} id - The DOM element ID of the input field.
 * @returns {void}
 */
function initFieldListeners(id) {
    const field = document.getElementById(id);
    if (!field) return;
    const func = id === 'email' ? () => checkEmail(false) : (id === 'name' ? checkName : checkHelp);
    const blurFunc = id === 'email' ? () => checkEmail(true) : func;
    
    field.addEventListener('input', () => {
        func();
        toggleSubmitButtonState();
    });
    field.addEventListener('blur', blurFunc);
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
 * Sets up the click listener on the burger button to toggle menu visibility.
 * @param {HTMLElement} burger - The burger trigger element.
 * @param {HTMLElement} menu - The mobile links container.
 * @param {HTMLElement} burgerImg - The icon inside the burger wrapper.
 * @returns {void}
 */
function setupBurgerClick(burger, menu, burgerImg) {
    burger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = menu.classList.toggle('active');
        document.body.classList.toggle('no-scroll', isOpen);
        if (burgerImg) burgerImg.style.opacity = isOpen ? '0' : '1';
    });
}

/**
 * Sets up a global click listener to close the menu when clicking outside or on a link.
 * @param {HTMLElement} burger - The burger trigger element.
 * @param {HTMLElement} menu - The mobile links container.
 * @param {HTMLElement} burgerImg - The icon inside the burger wrapper.
 * @returns {void}
 */
function setupOutsideClick(burger, menu, burgerImg) {
    document.addEventListener('click', (e) => {
        const isLink = e.target.classList.contains('header-category');
        const isOutside = !menu.contains(e.target) && !burger.contains(e.target);
        if ((isLink || isOutside) && menu.classList.contains('active')) {
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
});