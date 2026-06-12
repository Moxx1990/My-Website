let currentProjectName = 'Join';

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

function checkName() {
    const field = document.getElementById('name');
    const isValid = field.value.trim() !== "";
    document.getElementById('name-error').innerText = isValid ? "" : "Please enter your name.";
    return isValid;
}

function checkEmail() {
    const field = document.getElementById('email');
    const value = field.value.trim();
    let message = "";
    if (value === "") message = "Please enter your email.";
    else if (!value.includes('@')) message = "Please enter a valid email.";
    document.getElementById('email-error').innerText = message;
    return message === "";
}

function checkHelp() {
    const field = document.getElementById('help');
    const isValid = field.value.trim() !== "";
    document.getElementById('help-error').innerText = isValid ? "" : "Please tell me how I can help.";
    return isValid;
}

function checkConsent() {
    const field = document.getElementById('consent');
    const isValid = field.checked;
    document.getElementById('consent-error').innerText = isValid ? "" : "You must accept the privacy policy.";
    return isValid;
}

async function sendEmail(event) {
    event.preventDefault();
    
    // Führt alle Funktionen aus und speichert, ob alle true waren
    const isFormValid = checkName() & checkEmail() & checkHelp() & checkConsent();
    if (!isFormValid) return;

    const response = await fetch('/sites/submit.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(getFormData())
    });
    const result = await response.json();
    alert(result.success ? 'Email sent!' : result.error);
}

document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const infoContainer = document.getElementById('project-info');
    infoContainer.addEventListener('click', (event) => {
        if (event.target === infoContainer) {
            closeCard();
        }
    });

    ['name', 'email', 'help'].forEach(id => {
        const field = document.getElementById(id);
        const func = id === 'name' ? checkName : id === 'email' ? checkEmail : checkHelp;
        field.addEventListener('input', func);
        field.addEventListener('blur', func);
    });

    const langToggle = document.getElementById("lang-toggle");
    const savedLang = localStorage.getItem("selectedLanguage");
    if (savedLang === "de") {
        langToggle.checked = true;
    }
    langToggle.addEventListener("change", () => {
        if (langToggle.checked) {
            localStorage.setItem("selectedLanguage", "de");
            window.location.href = "/de/"; 
        } else {
            localStorage.setItem("selectedLanguage", "en");
            window.location.href = "/en/"; 
        }
    });
});