function openProjectInfo(projectName) {
    const info = getProjectInfo(projectName);
    const number = getProjectNumber(projectName);
    const languages = getProjectLanguages(projectName);
    const link = getProjectLink(projectName);
    const github = getProjectGithub(projectName);
    console.log(info, number, languages, link, github);
    document.getElementById('project-info').innerHTML = createCard(projectName, info, number, languages, link, github);

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

    // 1. Prüfen, ob bereits eine Sprache gespeichert wurde
    const savedLang = localStorage.getItem("selectedLanguage");
    
    // Falls "de" gespeichert ist, Checkbox aktivieren (da standardmäßig "EN" aktiv ist)
    if (savedLang === "de") {
        langToggle.checked = true;
    }

    // 2. Auf Änderungen des Switches reagieren
    langToggle.addEventListener("change", () => {
        if (langToggle.checked) {
            localStorage.setItem("selectedLanguage", "de");
            // Hier die URL zu deiner deutschen Seite eintragen:
            window.location.href = "/de/"; 
        } else {
            localStorage.setItem("selectedLanguage", "en");
            // Hier die URL zu deiner englischen Seite eintragen:
            window.location.href = "/en/"; 
        }
    });
});