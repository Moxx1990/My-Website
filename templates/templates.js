/**
 * Generates the structural HTML wrapper for the project information card modal.
 * @param {string} projectName - Name of the project.
 * @param {string} info - Project description.
 * @param {string} number - Sequential project number (e.g., "01").
 * @param {string[]} languages - List of technologies used.
 * @param {string} link - Live demonstration deployment URL.
 * @param {string} github - GitHub repository URL.
 * @returns {string} The HTML string structure containing the left and right layout columns.
 */
function createCardStructureTemplate(projectName, info, number, languages, link, github) {
    return `
        <div class="project-info-card">
            <div id="project-info-card-left-side" class="project-info-card-left-side">
            </div>
            <div id="project-info-card-right-side" class="project-info-card-right-side">
            </div>
        </div>`
}

/**
 * Generates the structural HTML layout placeholders for the left side of the project card.
 * @param {string} number - Sequential project number.
 * @param {string} projectName - Name of the project.
 * @param {string} info - Project description text.
 * @param {string[]} languages - List of technologies used.
 * @param {string} link - Live deployment URL.
 * @param {string} github - GitHub repository URL.
 * @returns {string} The inner HTML layout string containing header, content, and button slots.
 */
function createProjectCardLeftSideTemplate(number, projectName, info, languages, link, github) {
    return `
        <div id="project-card_header" class="project-card_header">
        </div>

        <div id="project-card-content" class="project-card-content">
        </div>
                
        <div id="project-info-button-container" class="project-info-button-container">
        </div>`
}

/**
 * Generates the HTML string markup for the header segment containing the project identifier number and title.
 * @param {string} number - Sequential project number (e.g., "01").
 * @param {string} projectName - Name/Title of the project.
 * @returns {string} HTML markup string for the card header.
 */
function createProjectCardHeaderandInfoTemplate(number, projectName) {
    return `
        <div class="project-number" >
                ${number}
        </div>
        <div class="project-info-name">
                ${projectName}
        </div>`
}

/**
 * Generates the HTML string template for the main body info description text and technical skill chips.
 * @param {string} info - Description detailing what the project is about.
 * @param {string[]} languages - List of tech stack labels used to render visual badge icons.
 * @param {string} headlineText - The dynamic localized title text for the info section.
 * @returns {string} HTML markup string containing the description block and rendered programming languages.
 */
function createProjectCardContentTemplate(info, languages, headlineText) {
    return `
       <div class="project-info__headline">
            ${headlineText}
        </div>
        <div class="project-card-content-text">
            ${info}
        </div>
        <div class="project-languages">
            ${renderLanguages(languages)}
        </div>`;
}

/**
 * Generates the HTML string structure for action link buttons (GitHub repository and Live Site test view tabs).
 * @param {string} github - Target GitHub repository destination endpoint URL.
 * @param {string} link - Target deployed live production domain URL.
 * @returns {string} HTML markup string holding anchor element links with outward arrow graphics.
 */
function createProjectCardButtonTemplate(github, link) {
    return `
        <a href="${github}" target="_blank" class="project__button"> 
            <span>Github</span>
            <img src="img/projects/arrow_outward.svg" alt="Arrow"> 
        </a>
        <a href="${link}" target="_blank" class="project__button"> 
            <span>Live Test</span>
            <img src="img/projects/arrow_outward.svg" alt="Arrow"> 
        </a>`
}

/**
 * Generates the HTML string layout template for the right side of the project modal,
 * including control buttons (close, skip next) and the main showcase visual graphics.
 * @param {string} projectName - Name of the project, used dynamically to fetch the matching cover image file.
 * @returns {string} HTML markup string containing close triggers, image components, and navigation buttons.
 */
function createProjectCardRightSideTemplate(projectName, nextProjectText) {
    return `
        <div class="project-info-close">
            <img src="img/projects/close_small.svg" onclick="closeCard()">
        </div>
        <div class="project-info__picture">
            <img src="img/projects/${projectName}.jpg">
        </div>
        <div class="next-project__button" onclick="switchCard()">
            ${nextProjectText} <img src="img/projects/arrow_forward.svg">
        </div>`;
}

/**
 * Maps across a listing of technology string tags to compile them into localized icon grid items.
 * @param {string[]} languages - Collection array of programming language names/tech badges (e.g., ['HTML', 'CSS']).
 * @returns {string} A single combined HTML template string of elements containing images and textual tag chips.
 */
function renderLanguages(languages) {
    return languages.map(language => `
        <div class="language">
            <img src="img/projects/${language}.svg" alt="${language}">
            <span>${language}</span>
        </div>
    `).join('');
}