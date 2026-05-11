function createCard(projectName, info, number, languages, link, github) {
    return `
        <div class="project-info-card">
            <div class="project-info-card-left-side">
                <p class="project-number" >${number}</p>
                <p class="project-info-name">${projectName}</p>
                <p class="project-info__headline">What is this project about?</p>
                <p class="project-info">${info}</p>
                <div class="project-languages">
                    ${renderLanguages(languages)}
                </div>
                <button> <a href="${github}" class="project__button">Github</a><img src="img/projects/arrow_outward.svg"> </button>
                <button> <a href="${link}" class="project__button">Live Test</a><img src="img/projects/arrow_outward.svg"> </button>
            </div>

            <div class="project-info-card-right-side">
                <p class="project-info-close"><img src="img/projects/close_small.svg" onclick="closeCard()"></p>
                <p class="project-info__picture"><img src="img/projects/${projectName}.jpg"></p>
                <button onclick="switchCard()">Next project <img src="img/projects/arrow_forward.svg"></button>
            </div>
        </div>`
}