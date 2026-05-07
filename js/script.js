function getProjectInfo(projectName) {
    switch (projectName) {
        case 'join':
            return 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories';
        case 'bow-of-the-dead':
            return 'Jump, run and shoot games based on object-oriented approach. Help the Samurai to find sake and arrows to fight against the zombies.';
        case 'pokedex':
            return 'Pokedex is a web application that provides information about various Pokémon. It is built with HTML, CSS, and JavaScript. It uses the PokéAPI to fetch data. Users can search for Pokémon by name.';
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
    }
}

function openProjectInfo(projectName) {
    const info = getProjectInfo(projectName);
    const number = getProjectNumber(projectName);
    const languages = getProjectLanguages(projectName);
    const link = getProjectLink(projectName);
    const github = getProjectGithub(projectName);
    console.log(info, number, languages, link, github);
    document.getElementById('project-info').innerHTML = createCard(projectName, info, number, languages, link, github);

}


function getProjectLink(projectName) {
    switch (projectName) {
        case 'join':
            return 'https://join-frontend.web.app/';
        case 'bow-of-the-dead':
            return 'https://bow-of-the-dead.web.app/';
        case 'pokedex':
            return 'https://pokedex-maxschmidt.web.app/';
    }
    window.open(projectUrl, '_blank');
}

function getProjectGithub(projectName) {
        switch (projectName) {
        case 'join':
            return 'https://github.com/Moxx1990/join';
        case 'bow-of-the-dead':
            return 'https://github.com/Moxx1990/2D-Sidescroller---Bow-of-the-Dead';
        case 'pokedex':
            return 'https://github.com/Moxx1990/Pokedex';
    }
    window.open(projectUrl, '_blank');
}

function closeCard() {
    console.log('noch nichts programmiert');
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