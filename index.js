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
  search = list[Math.floor(Math.random() * list.length)].split(' ').join('_');
} else {
  search = query.slice(2, query.length).join('_');
}

//API returns error if search string is less than 3 characters long

let arg = query;

//arg.forEach(a => a.toString());
//console.log(arg);

// Table module for displaying the results in a table.
const Table = require('cli-table3');

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

// TODO: Add an option for showing mal_id here.

// Structuring the table.
const table = new Table({
  head: tableHead,
  colWidths: [46, 11]
});

// Applying some colours and predefined vim colours.
const chalk = require('chalk');
const greenText = '\x1b[32m';
const resetFont = '\x1b[0m';
const cyanText = '\x1b[36m';

// if-else condition for the arguments meant for app config.
// TODO: Add an option to set the show mal_id option.
if (arg[2] === '-h' || arg[2] === '--help') {
  console.log(`
NAME
	${cyanText}anime-cli: command line application to fetch anime details${resetFont}

USAGE
	${cyanText}anime-cli [ <anime name>  |  arguments ]
	anime-cli [ <anime name> |  -help  | --h ...]${resetFont}

OPTIONS
	<anime name>
		The name of the anime whose information you would
		like to fetch
		${greenText}eg: anime-cli Naruto${resetFont}
	
	--help, -h
		view this information
		${greenText}eg: anime-cli --help${resetFont}
		${greenText}eg: anime-cli -h${resetFont}

	--version, -v
		view the version number of the anime-cli app
		${greenText}eg: anime-cli --version${resetFont}
		${greenText}eg: anime-cli -v${resetFont}

DESCRIPION
	anime-cli is a command line application that can be used to
	fetch information regarding the user-queried anime, like
	number of episodes, type of anime and it's airing status.
	  `);
  return;
}

if (arg[2] === '--version' || arg[2] === '-v') {
  console.log(chalk.cyanBright(`anime-cli\nversion: ${pjson.version}\n`));
  return;
}

if (search.length < 3) {
  console.log(
    'Name has to be at least 3 characters long or you might have entered a two digit number!'
  );
  return;
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
  return;
} else if (arg.includes('setLimit') && arg.includes('false')) {
  config.set('setLimit', false);
  return;
}

if (arg.includes('onlyMatches')) {
  if (arg.includes('onlyMatches') && arg.includes('true')) {
    config.set('onlyMatches', true);
    return;
  } else if (arg.includes('onlyMatches') && arg.includes('false')) {
    config.set('onlyMatches', false);
    return;
  } else {
    console.log('Allowed value for onlyMatches: [true, false]');
  }
  return;
}

if (arg.includes('showScore')) {
  if (arg[arg.indexOf('showScore') + 1] === 'true') {
    config.set('showScore', true);
  } else if (arg[arg.indexOf('showScore') + 1] === 'false') {
    config.set('showScore', false);
  } else {
    console.log('Allowed value for showScore: [true, false]');
  }

  // TODO: Add a show mal_id argument here.
  return;
}

if (arg.includes('showYear')) {
  if (arg[arg.indexOf('showYear') + 1] === 'true') {
    config.set('showYear', true);
  } else if (arg[arg.indexOf('showYear') + 1] === 'false') {
    config.set('showYear', false);
  } else {
    console.log('Allowed value for showYear: [true, false]');
  }
  return;
}

fetch(`https://api.jikan.moe/v3/search/anime?q=${search}`)
  .then(response => response.json())
  .then(data => {
    limvalue = config.get('setLimit') ? config.get('limit') : 100;
    const bunch = data.results.slice(0, limvalue);
    let status = '';
    let PTitle = '';

    //arg[2] = arg;
    if (arg[2] !== undefined) {
      arg[2] = arg[2].toLowerCase();
    }

    bunch.map(item => {
      // We need to check whether the user filter is set to true or false.
      if (config.get('onlyMatches') == true) {
        if (item.airing === true) {
          status = chalk.red('Ongoing');
        } else if (item.airing === false) {
          status = chalk.cyanBright('Finished');
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
          status = chalk.red('Ongoing');
        } else if (item.airing === false) {
          status = chalk.cyanBright('Finished');
        }

        const row = [
          PTitle(item.title),
          item.episodes,
          chalk.yellow(item.type),
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
  })
  .catch(error => console.log(error));
