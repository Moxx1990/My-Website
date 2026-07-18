let currentProjectName = 'Join';

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
 * Safely extracts project metadata from the global data store, providing localized fallbacks.
 * @param {string} projectName - The name of the project to retrieve.
 * @returns {{info: string, number: string, languages: string[], link: string, github: string}} The processed data.
 */
function getProjectData(projectName) {
    const project = projectsData[projectName];
    const lang = typeof getCurrentLang === 'function' ? getCurrentLang() : 'en';
    const infoText = project?.info?.[lang] || project?.info?.[lang === 'de' ? 'en' : 'de'] || '';
    
    return {
        info: infoText,
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
 * Renders the body description text and technology chips inside the project modal using localized strings.
 * @param {string} info - Project description text.
 * @param {string[]} languages - List of programming languages/frameworks used.
 * @returns {void}
 */
function createProjectCardContent(info, languages) {
    const contentContainer = document.getElementById('project-card-content');
    if (!contentContainer) return;
    const lang = typeof getCurrentLang === 'function' ? getCurrentLang() : 'en';
    const headlineText = translations[lang]?.projectHeadline || 'What is this project about?';
    contentContainer.innerHTML = createProjectCardContentTemplate(info, languages, headlineText);
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
 * Generates the right side structure of the project card modal using localized strings.
 * @param {string} projectName - Name of the project.
 * @returns {void}
 */
function createProjectCardRightSide(projectName) {
    const rightSideContainer = document.getElementById('project-info-card-right-side');
    if (!rightSideContainer) return;
    const lang = typeof getCurrentLang === 'function' ? getCurrentLang() : 'en';
    const nextProjectText = translations[lang]?.nextProject || 'Next Project';
    rightSideContainer.innerHTML = createProjectCardRightSideTemplate(projectName, nextProjectText);
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
 * Updates the localized information body text inside a specific project DOM container.
 * @param {string} key - The lookup name identifier of the project data element.
 * @param {string} lang - The active dynamic language code ("en" or "de").
 */
function renderSingleProjectTranslation(key, lang) {
    const project = projectsData[key];
    const container = document.querySelector(`[data-project-name="${key}"] .project-info-text`);
    if (project && container) {
        container.innerText = project.info[lang] || project.info['en'];
    }
}

/**
 * Loops across the localized projects dataset to update visible content cards dynamically.
 * @param {string} lang - The destination translation packet key string (e.g., "en" or "de").
 */
function updateProjectLanguages(lang) {
    const activeLang = translations[lang] ? lang : "en";
    Object.keys(projectsData).forEach(key => {
        renderSingleProjectTranslation(key, activeLang);
    });
}