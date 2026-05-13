function createCard(projectName, info, number, languages, link, github) {
    return `
        <div class="project-info-card">
            <div class="project-info-card-left-side">
                <div class="project-card_header">
                    <div class="project-number" >
                        ${number}
                    </div>
                    <div class="project-info-name">
                        ${projectName}
                    </div>
                </div>

                <div class="project-card-content">
                    <div class="project-info__headline">
                        What is this project about?
                    </div>
                    <div class="project-info">
                        ${info}
                    </div>
                    <div class="project-languages">
                        ${renderLanguages(languages)}
                    </div>
                </div>
                
                <div class="project-info-button-container">
                    <div class="project__button"> 
                        <a href="${github}">Github</a>
                        <img src="img/projects/arrow_outward.svg"> 
                    </div>
                    <div class="project__button"> 
                        <a href="${link}">Live Test</a>
                        <img src="img/projects/arrow_outward.svg"> 
                    </div>
                </div>
            </div>

            <div class="project-info-card-right-side">
                <div class="project-info-close">
                    <img src="img/projects/close_small.svg" onclick="closeCard()">
                </div>
                <div class="project-info__picture">
                    <img src="img/projects/${projectName}.jpg">
                </div>
                <div class="next-project__button" onclick="switchCard()">
                    Next project <img src="img/projects/arrow_forward.svg">
                </div>
            </div>
        </div>`
}