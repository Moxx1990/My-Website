function createCard(projectName, info, number, languages, link, github) {
    return `
        <div>
            <div>
            <div>
                ${number}
                ${projectName}
                What is this project about?
                ${info}
                ${languages}
                <a href="${github}" class="project__button">Github</a><img src="img/projects/arrow_outward.svg"> 
                <a href="${link}" class="project__button">Live Test</a><img src="img/projects/arrow_outward.svg">
            </div>

            <div>
                <img src="img/projects/close_small.svg" onclick="closeCard()">
                <img src="">
                <button onclick="switchCard()">Next project <img src="img/projects/arrow_forward.svg"></button>
            </div>
        </div>
        </div>`
}