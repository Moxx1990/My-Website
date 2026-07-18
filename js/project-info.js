/**
 * @typedef {Object} ProjectInfo
 * @property {string} en - English project description.
 * @property {string} de - German project description.
 */

/**
 * @typedef {Object} Project
 * @property {string} number - The sequential display number of the project.
 * @property {ProjectInfo} info - Localization-ready description payloads.
 * @property {string[]} languages - Technologies used in the project.
 * @property {string} link - The live deployment URL.
 * @property {string} github - The GitHub repository URL.
 */

/**
 * A collection of featured portfolio projects with localized metadata.
 * @type {Object<string, Project>}
 */
const projectsData = {
    'Join': {
        number: "01",
        info: {
            en: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
            de: 'Vom Kanban-System inspirierter Aufgabenmanager. Erstelle und organisiere Aufgaben per Drag-and-Drop, weise Benutzer und Kategorien zu.'
        },
        languages: ['Angular', 'TypeScript', 'HTML', 'CSS', 'Firebase'],
        link: 'https://join.schmidtmaximilian.com',
        github: 'https://github.com/Moxx1990/join'
    },
    'Bow of the Dead': {
        number: "02",
        info: {
            en: 'Jump, run and shoot game based on an object-oriented approach. Help the Samurai to find sake and arrows to fight against the zombies.',
            de: 'Jump-and-Run-Spiel basierend auf einer objektorientierten Programmierung. Hilf dem Samurai, Sake und Pfeile zu finden, um gegen Zombies zu kämpfen.'
        },
        languages: ['HTML', 'CSS', 'JavaScript'],
        link: 'https://bowofthedead.schmidtmaximilian.com',
        github: 'https://github.com/Moxx1990/2D-Sidescroller---Bow-of-the-Dead'
    },
    'Pokédex': {
        number: "03",
        info: {
            en: 'Pokedex is a web application that provides information about various Pokémon, utilizing the PokéAPI to fetch dynamic data.',
            de: 'Pokédex ist eine Webanwendung, die mithilfe der PokéAPI dynamisch Daten abruft und Informationen über verschiedene Pokémon bereitstellt.'
        },
        languages: ['HTML', 'CSS', 'JavaScript'],
        link: 'https://pokedex.schmidtmaximilian.com',
        github: 'https://github.com/Moxx1990/Pokedex'
    }
};