function openProjectInfo(projectName) {
    const { info, number, languages, link, github } = getProjectData(projectName);
    createCard(projectName, info, number, languages, link, github);
}

function getProjectData(projectName) {
    return {
        info: getProjectInfo(projectName),
        number: getProjectNumber(projectName),
        languages: getProjectLanguages(projectName),
        link: getProjectLink(projectName),
        github: getProjectGithub(projectName)
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

function renderLanguages(languages) {
    return languages.map(language => `
        <div class="language">
            <img src="img/projects/${language}.svg" alt="${language}">
            <span>${language}</span>
        </div>
    `).join('');
}

function closeCard() {
    let info = document.getElementById('project-info')
    info.innerHTML = "";
}

function switchCard() {
    console.log('noch nichts programmiert');
}

function getFormData() {
    return {
        name: name.value,
        email: email.value,
        message: help.value
    };
}

async function sendEmail(event) {
    event.preventDefault();

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
        // Slider wechseln
    });
});

document.addEventListener("DOMContentLoaded", () => {
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