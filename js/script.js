function getProjectInfo(projectName) {
    switch (projectName) {
        case 'join':
            return 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories';
        case 'bow-of-the-dead':
            return 'Jump, run and shoot games based on object-oriented approach. Help the Samurai to find sake and arrows to fight against the zombies.';
        case 'pokedex':
            return 'Pokedex is a web application that provides information about various Pokémon. It is built with HTML, CSS, and JavaScript. It uses the PokéAPI to fetch data. Users can search for Pokémon by name.';
        case 'da-bubble':
            return 'This App is a Slack Clone App. It revolutionizes team communication and collaboration with its intuitive interface, real-time messaging and robust channel organization.';
    }
}

function getProjectNumber(projectName) {
    switch (projectName) {
        case 'join':
            return "01";
        case 'bow-of-the-dead':
            return "02";
        case 'pokedex':
            return "03";
        case 'da-bubble':
            return "04";
    }
}

function getProjectLanguages(projectName) {
    switch (projectName) {
        case 'join':
            return ['Angular', 'Typescript', 'HTML', 'CSS', 'Firebase'];
        case 'bow-of-the-dead':
            return ['HTML', 'CSS', 'JavaScript'];
        case 'pokedex':
            return ['HTML', 'CSS', 'JavaScript'];
        case 'da-bubble':
            return ['Unknown'];
    }
}

function openProjectWindow(projectName) {
    const info = getProjectInfo(projectName);
    const number = getProjectNumber(projectName);
    const languages = getProjectLanguages(projectName);
    console.log(info, number, languages);
}


function openProject(projectName) {
    let projectUrl = '';
    switch (projectName) {
        case 'join':
            projectUrl = 'https://join-frontend.web.app/';
            break;
        case 'bow-of-the-dead':
            projectUrl = 'https://bow-of-the-dead.web.app/';
            break;
        case 'pokedex':
            projectUrl = 'https://pokedex-maxschmidt.web.app/';
            break;
        case 'da-bubble':
            projectUrl = 'https://da-bubble.web.app/';
            break;
    }
    window.open(projectUrl, '_blank');
}