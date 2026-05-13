function openProjectInfo(projectName) {
    const info = getProjectInfo(projectName);
    const number = getProjectNumber(projectName);
    const languages = getProjectLanguages(projectName);
    const link = getProjectLink(projectName);
    const github = getProjectGithub(projectName);
    console.log(info, number, languages, link, github);
    document.getElementById('project-info').innerHTML = createCard(projectName, info, number, languages, link, github);

}

function getProjectInfo(projectName) {
    switch (projectName) {
        case 'Join':
            return 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories';
        case 'Bow of the Dead':
            return 'Jump, run and shoot games based on object-oriented approach. Help the Samurai to find sake and arrows to fight against the zombies.';
        case 'Pokédex':
            return 'Pokedex is a web application that provides information about various Pokémon. It is built with HTML, CSS, and JavaScript. It uses the PokéAPI to fetch data. Users can search for Pokémon by name.';
    }
}

function getProjectNumber(projectName) {
    switch (projectName) {
        case 'Join':
            return "01";
        case 'Bow of the Dead':
            return "02";
        case 'Pokédex':
            return "03";
    }
}

function getProjectLanguages(projectName) {
    switch (projectName) {
        case 'Join':
            return ['Angular', 'TypeScript', 'HTML', 'CSS', 'Firebase'];
        case 'Bow of the Dead':
            return ['HTML', 'CSS', 'JavaScript'];
        case 'Pokédex':
            return ['HTML', 'CSS', 'JavaScript'];
    }
}

function getProjectLink(projectName) {
    switch (projectName) {
        case 'Join':
            return 'https://join-frontend.web.app/';
        case 'Bow of the Dead':
            return 'https://bow-of-the-dead.web.app/';
        case 'Pokédex':
            return 'https://pokedex-maxschmidt.web.app/';
    }
    window.open(projectUrl, '_blank');
}

function getProjectGithub(projectName) {
        switch (projectName) {
        case 'Join':
            return 'https://github.com/Moxx1990/join';
        case 'Bow of the Dead':
            return 'https://github.com/Moxx1990/2D-Sidescroller---Bow-of-the-Dead';
        case 'Pokédex':
            return 'https://github.com/Moxx1990/Pokedex';
    }
    window.open(projectUrl, '_blank');
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