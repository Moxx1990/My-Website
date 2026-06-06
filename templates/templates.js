function createCardStructureTemplate(projectName, info, number, languages, link, github) {
    return `
        <div class="project-info-card">
            <div id="project-info-card-left-side" class="project-info-card-left-side">
            </div>
            <div id="project-info-card-right-side" class="project-info-card-right-side">
            </div>
        </div>`
}

function createProjectCardLeftSideTemplate(number, projectName, info, languages, link, github) {
    return `
        <div id="project-card_header" class="project-card_header">
        </div>

        <div id="project-card-content" class="project-card-content">
        </div>
                
        <div id="project-info-button-container" class="project-info-button-container">
        </div>`
}

function createProjectCardHeaderandInfoTemplate(number, projectName) {
    return `
        <div class="project-number" >
                ${number}
        </div>
        <div class="project-info-name">
                ${projectName}
        </div>`
}

function createProjectCardContentTemplate(info, languages) {
    return `
        <div class="project-info__headline">
            What is this project about?
        </div>
        <div class="project-info">
            ${info}
        </div>
        <div class="project-languages">
            ${renderLanguages(languages)}
        </div>`
}

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

function createProjectCardRightSideTemplate(projectName) {
    return `
        <div class="project-info-close">
            <img src="img/projects/close_small.svg" onclick="closeCard()">
        </div>
        <div class="project-info__picture">
            <img src="img/projects/${projectName}.jpg">
        </div>
        <div class="next-project__button" onclick="switchCard()">
            Next project <img src="img/projects/arrow_forward.svg">
        </div>`
}