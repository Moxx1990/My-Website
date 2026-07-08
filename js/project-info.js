/**
 * @typedef {Object} Project
 * @property {string} number - The sequential display number of the project (e.g., "01").
 * @property {string} info - A brief description of the project, its core functionality, and tech approach.
 * @property {string[]} languages - An array of technologies, frameworks, and languages used in the project.
 * @property {string} link - The live deployment URL where the project is hosted.
 * @property {string} github - The URL pointing to the project's repository on GitHub.
 */

/**
 * A collection of featured portfolio projects with their metadata, technical details, and deployment links.
 * @type {Object<string, Project>}
 */
const projectsData = {
    'Join': {
        number: "01",
        info: 'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories',
        languages: ['Angular', 'TypeScript', 'HTML', 'CSS', 'Firebase'],
        link: 'https://join.schmidtmaximilian.com',
        github: 'https://github.com/Moxx1990/join'
    },
    'Bow of the Dead': {
        number: "02",
        info: 'Jump, run and shoot games based on object-oriented approach. Help the Samurai to find sake and arrows to fight against the zombies.',
        languages: ['HTML', 'CSS', 'JavaScript'],
        link: 'https://bowofthedead.schmidtmaximilian.com',
        github: 'https://github.com/Moxx1990/2D-Sidescroller---Bow-of-the-Dead'
    },
    'Pokédex': {
        number: "03",
        info: 'Pokedex is a web application that provides information about various Pokémon. It is built with HTML, CSS, and JavaScript. It uses the PokéAPI to fetch data. Users can search for Pokémon by name.',
        languages: ['HTML', 'CSS', 'JavaScript'],
        link: 'https://pokedex.schmidtmaximilian.com',
        github: 'https://github.com/Moxx1990/Pokedex'
    }
};