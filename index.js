#!/usr/bin/env node
// The above comment declares the environment that should be used to run the file.

const fetch = require('node-fetch');
//In react the fetch function is available globally but to use it
// without react we need to install node-fetch.

const pjson = require('./package.json');
//To get version and package name.

const Configstore = require('configstore');
// This package is used to create a user configuration to save the user settings.

// Presaved anime titles for random user searches.
const list = require('./RA.json');

//Preconfigured or default anime-cli user configuration.
const config = new Configstore(pjson.name, {
	setLimit: false,
	limit: 100,
	onlyMatches: false,
	showScore: false,
	showYear: false
});

let limvalue = 100;
//getting the values from the arguments passed by the user.
let query = process.argv;
let search = ' ';

// Handling random search
if (query.length <= 2) {
	console.log('yes');
	search = list[parseInt(Math.random() * list.length)];
	console.log(search);
} else {
	search = query.slice(2, query.length).join('_');
}

//API returns error if search string is less than 3 characters long

let arg = query;

// if (arg.length < 3) {
// 	search = list[parseInt(Math.random() * list.length)];
// 	console.log(search);
// }
//arg.forEach(a => a.toString());
//console.log(arg);

// Table module for displaying the results in a table.
const Table = require('cli-table3');
const colors = require('./colors');

// Configuring the columns of the table.
const tableHead = ['Title', 'Episodes', 'Type', 'Status'];

// showScore column.
if (config.get('showScore') == true) {
	tableHead.splice(1, 0, 'Score');
}

// showYear column.
if (config.get('showYear') == true) {
	tableHead.splice(1, 0, 'Year');
}

// Structuring the table.
const table = new Table({
	head: tableHead,
	colWidths: [60, 15, 15, 15]
});

// Applying some colours and predefined vim colours.
const chalk = require('chalk');

// if-else condition for the arguments meant for app config.
if (arg[2] === '-h' || arg[2] === '--help') {
	console.log(`
NAME
	${colors.cyan}anime-cli: command line application to fetch anime details${colors.reset}

USAGE
	${colors.cyan}anime-cli [ <anime name>  |  arguments ]
	anime-cli [ <anime name> |  -help  | --h ...]${colors.reset}

OPTIONS
	<anime name>
		The name of the anime whose information you would
		like to fetch
		${colors.green}eg: anime-cli Naruto${colors.reset}
	
	--help, -h
		view this information
		${colors.green}eg: anime-cli --help${colors.reset}
		${colors.green}eg: anime-cli -h${colors.reset}

	--version, -v
		view the version number of the anime-cli app
		${colors.green}eg: anime-cli --version${colors.reset}
		${colors.green}eg: anime-cli -v${colors.reset}

DESCRIPION
	anime-cli is a command line application that can be used to
	fetch information regarding the user-queried anime, like
	number of episodes, type of anime and it's airing status.
	  `);
	process.exit();
}

if (arg[2] === '--version' || arg[2] === '-v') {
	console.log(
		`${colors.green}anime-cli\nversion: ${pjson.version}\n${colors.reset}`
	);
	process.exit();
}

if (search.length < 3) {
	console.log(
		'Name has to be at least 3 characters long or you might have entered a two digit number!'
	);
	process.exit();
}

if (arg.includes('setLimit') && arg[arg.indexOf('setLimit') + 1] === 'true') {
	config.set('setLimit', true);
	if (arg[4] === undefined) {
		console.log(
			'The argument should be used as: setLimit <true/false> limit <number>'
		);
	} else {
		config.set('limit', parseInt(arg[4]));
	}
	process.exit();
} else if (arg.includes('setLimit') && arg.includes('false')) {
	config.set('setLimit', false);
	process.exit();
}

if (arg.includes('onlyMatches')) {
	if (arg.includes('onlyMatches') && arg.includes('true')) {
		config.set('onlyMatches', true);
		process.exit();
	} else if (arg.includes('onlyMatches') && arg.includes('false')) {
		config.set('onlyMatches', false);
		process.exit();
	} else {
		console.log('Allowed value for onlyMatches: [true, false]');
	}
	process.exit();
}

if (arg.includes('showScore')) {
	if (arg[arg.indexOf('showScore') + 1] === 'true') {
		config.set('showScore', true);
	} else if (arg[arg.indexOf('showScore') + 1] === 'false') {
		config.set('showScore', false);
	} else {
		console.log('Allowed value for showScore: [true, false]');
	}
	process.exit();
}

if (arg.includes('showYear')) {
	if (arg[arg.indexOf('showYear') + 1] === 'true') {
		config.set('showYear', true);
	} else if (arg[arg.indexOf('showYear') + 1] === 'false') {
		config.set('showYear', false);
	} else {
		console.log('Allowed value for showYear: [true, false]');
	}
	process.exit();
}

fetch(`https://api.jikan.moe/v4/anime?q=${search}`)
	.then((response) => response.json())
	.then((data) => {
		limvalue = config.get('setLimit') ? config.get('limit') : 100;
		if (
			arg[3] !== undefined &&
			typeof arg[3] === 'string' &&
			!isNaN(parseInt(arg[3]))
		) {
			if (parseInt(arg[3]) <= 100) {
				limvalue = parseInt(arg[3]);
			}
		}
		const bunch = data.data.slice(0, limvalue);
		let status = '';
		let PTitle = '';

		//arg[2] = arg;
		if (arg[2] !== undefined) {
			arg[2] = arg[2].toLowerCase();
		}

		bunch.map((item) => {
			// We need to check whether the user filter is set to true or false.
			if (config.get('onlyMatches') == true) {
				if (item.airing === true) {
					status = `${colors.red}Ongoing${colors.reset}`;
				} else if (item.airing === false) {
					status = `${colors.blue}Finished${colors.reset}`;
				}

				// Converting the fetched title to lowercase for better matching.
				if (item.title.toLowerCase().includes(arg[2])) {
					PTitle = chalk.bold.green;
					//new row for new features
					const row = [
						PTitle(item.title),
						item.episodes,
						chalk.yellow(item.type),
						status
					];

					// To check whether the user config has this option set to true.
					if (config.get('showScore') == true) {
						row.splice(1, 0, item.score);
					}

					// To check whether the user config has this option set to true.
					if (config.get('showYear') == true) {
						row.splice(
							1,
							0,
							item.start_date ? item.start_date.split('-')[0] : ''
						);
					}

					table.push(row);
				}
			} else if (config.get('onlyMatches') == false) {
				if (item.title.toLowerCase().includes(arg[2])) {
					PTitle = chalk.bold.green;
				} else {
					PTitle = chalk.bold.white;
				}

				if (item.airing === true) {
					status = `${colors.red}Ongoing${colors.reset}`;
				} else if (item.airing === false) {
					status = `${colors.blue}Finished${colors.reset}`;
				}

				const row = [
					PTitle(item.title),
					item.episodes,
					`${colors.yellow}${item.type}${colors.reset}`,
					status
				];

				// To check whether the user config has this option set to true.
				if (config.get('showScore')) {
					row.splice(1, 0, item.score);
				}

				// To check whether the user config has this option set to true.
				if (config.get('showYear')) {
					row.splice(
						1,
						0,
						item.start_date ? item.start_date.split('-')[0] : ''
					);
				}

				table.push(row);
			}
		});

		// Printing the table to the terminal.
		console.log(table.toString());
		const link = chalk.blueBright('https://git.io/JDcSO');

		console.log(`Having some issues with the app? Report here: ${link}`);
	})
	.catch((error) => console.log(error));

// add pre-commit hook to the project.
