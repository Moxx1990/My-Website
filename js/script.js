let currentProjectName = 'Join';
let currentTestimonialIndex = 1;
let isTransitioningTestimonial = false;

function openProjectInfo(projectName) {
    currentProjectName = projectName;
    const { info, number, languages, link, github } = getProjectData(projectName);
    createCard(projectName, info, number, languages, link, github);
    const infoContainer = document.getElementById('project-info');
    infoContainer.classList.add('active');
    document.body.classList.add('no-scroll');
}

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

function createCard(projectName, info, number, languages, link, github) {
    createCardStructure(projectName, info, number, languages, link, github);
    createProjectCardLeftSide(number, projectName, info, languages, link, github);
    createProjectCardRightSide(projectName);
    createProjectCardHeaderandInfo(number, projectName);
    createProjectCardContent(info, languages);
    createProjectCardButton(github, link);
}

function createCardStructure(projectName, info, number, languages, link, github) {
    const infoContainer = document.getElementById('project-info');
    infoContainer.innerHTML = createCardStructureTemplate(projectName, info, number, languages, link, github);
}

function createProjectCardLeftSide(number, projectName, info, languages, link, github) {
    const leftSideContainer = document.getElementById('project-info-card-left-side');
    leftSideContainer.innerHTML = createProjectCardLeftSideTemplate(number, projectName, info, languages, link, github);
}

function createProjectCardHeaderandInfo(number, projectName) {
    const headerContainer = document.getElementById('project-card_header');
    headerContainer.innerHTML = createProjectCardHeaderandInfoTemplate(number, projectName);
}

function createProjectCardContent(info, languages) {
    const contentContainer = document.getElementById('project-card-content');
    contentContainer.innerHTML = createProjectCardContentTemplate(info, languages);
}

function createProjectCardButton(github, link) {
    const buttonContainer = document.getElementById('project-info-button-container');
    buttonContainer.innerHTML = createProjectCardButtonTemplate(github, link);
}

function createProjectCardRightSide(projectName) {
    const rightSideContainer = document.getElementById('project-info-card-right-side');
    rightSideContainer.innerHTML = createProjectCardRightSideTemplate(projectName);
}

function closeCard() {
    const infoContainer = document.getElementById('project-info');
    infoContainer.innerHTML = "";
    infoContainer.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

function switchCard() {
    const projectKeys = Object.keys(projectsData);
    const currentIndex = projectKeys.indexOf(currentProjectName);
    const nextIndex = (currentIndex + 1) % projectKeys.length;
    const nextProjectName = projectKeys[nextIndex];
    openProjectInfo(nextProjectName);
}

function renderTestimonial() {
    const belt = document.getElementById('testimonial-belt');
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const offset = currentTestimonialIndex * -780;
    belt.style.transform = `translateX(${offset}px)`;
    cards.forEach((card, i) => {
        card.classList.toggle('focused', i === currentTestimonialIndex);
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentTestimonialIndex);
    });
}

function switchTestimonial(direction) {
    const cards = document.querySelectorAll('.testimonial-card');
    currentTestimonialIndex = (currentTestimonialIndex + direction + cards.length) % cards.length;
    renderTestimonial();
}

function checkName() {
    const field = document.getElementById('name');
    const isValid = field.value.trim() !== "";
    field.classList.toggle('input-error', !isValid);
    field.placeholder = isValid ? "Your name goes here" : "Oops! It seems your name is missing";
    return isValid;
}

function checkEmail(isBlurSetting = false) {
    const field = document.getElementById('email');
    const value = field.value.trim();
    let isValid = value !== "";
    if (!isValid) {
        field.placeholder = "Please enter your email.";
    } else if (isBlurSetting && !value.includes('@')) {
        field.value = "";
        field.placeholder = "Hoplla! Your email is required";
        isValid = false;
    }
    field.classList.toggle('input-error', !isValid);
    if (isValid) field.placeholder = "youremail@email.com";
    return isValid;
}

function checkHelp() {
    const field = document.getElementById('help');
    const isValid = field.value.trim() !== "";
    field.classList.toggle('input-error', !isValid);
    field.placeholder = isValid ? "Hello Max, I am interested in..." : "Please tell me how I can help.";
    return isValid;
}

function checkConsent() {
    const field = document.getElementById('consent');
    const isValid = field.checked;
    document.getElementById('consent-error').innerText = isValid ? "" : "Please accept the privacy policy.";
    return isValid;
}

async function sendEmail(event) {
    event.preventDefault();
    const isFormValid = checkName() & checkEmail(true) & checkHelp() & checkConsent();
    if (!isFormValid) return;
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('help').value
    };

    try {
        const response = await fetch('sites/submit.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        if (result.success) {
            document.getElementById('name').value = "";
            document.getElementById('email').value = "";
            document.getElementById('help').value = "";
            document.getElementById('consent').checked = false;
            document.getElementById('form-content').classList.add('d-none');
            document.getElementById('success-message').classList.remove('d-none');
        } else {
            alert(result.error || 'Mail delivery failed');
        }
    } catch (error) {
        console.error('Error sending email:', error);
        alert('An error occurred. Please try again later.');
    }
}

function updateLanguage(lang) {
    const elements = document.querySelectorAll("[data-translate]");
    elements.forEach(element => {
        const key = element.getAttribute("data-translate");
        if (translations[lang] && translations[lang][key]) {
            if (key === "formConsent" || key === "skillsNeed") {
                if (key === "formConsent") {
                    element.innerHTML = lang === "de" 
                        ? 'Ich habe die <a class="privacy-policy__link" href="legal.html">Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Daten zu.'
                        : 'I\'ve read the <a class="privacy-policy__link" href="legal.html">privacy policy</a> and agree to the processing of my data as outlined.';
                } else if (key === "skillsNeed") {
                    element.innerHTML = translations[lang][key];
                }
                return;
            }
            if (key.startsWith('legal')) {
                element.innerHTML = translations[lang][key].replace(/\n/g, '<br>');
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
    updatePlaceholders(lang);
}

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

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('testimonial-belt')) {
        renderTestimonial();
    }
    const infoContainer = document.getElementById('project-info');
    if (infoContainer) {
        infoContainer.addEventListener('click', (event) => {
            if (event.target === infoContainer) closeCard();
        });
    }
    ['name', 'email', 'help'].forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            if (id === 'email') {
                field.addEventListener('input', () => checkEmail(false));
                field.addEventListener('blur', () => checkEmail(true));
            } else {
                const func = id === 'name' ? checkName : checkHelp;
                field.addEventListener('input', func);
                field.addEventListener('blur', func);
            }
        }
    });
    const consentField = document.getElementById('consent');
    if (consentField) {
        consentField.addEventListener('change', checkConsent);
    }
    const langToggle = document.getElementById("lang-toggle");
    if (langToggle) {
        let currentLang = localStorage.getItem("selectedLanguage") || "en";
        langToggle.checked = (currentLang === "de");
        updateLanguage(currentLang);

        langToggle.addEventListener("change", () => {
            currentLang = langToggle.checked ? "de" : "en";
            localStorage.setItem("selectedLanguage", currentLang);
            updateLanguage(currentLang);
        });
    }
});