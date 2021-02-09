#!/usr/bin/env node

const fetch = require("node-fetch");
const pjson = require("./package.json");

//const query = "Naruto";
let query = process.argv.slice(2,process.argv.length);
query = query.join();
//console.log(query.split(','));
const arg = query.split(",");
//console.log(arg[0]);

var Table = require("cli-table3");
var table = new Table({
  head: ["Title", "Episodes", "Type", "Status"],
  colWidths: [46, 11],
});

// For font colors
const chalk = require("chalk");
const greenText = "\x1b[32m";
const resetFont = "\x1b[0m";
const cyanText = "\x1b[36m";

if (arg[0] === "--help" || arg[0] === "-h") {
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
	
	help, --h
		view this information
		${greenText}eg: anime-cli -help${resetFont}

	version, --v
		view the version number of the anime-cli app
		${greenText}eg: anime-cli -version${resetFont}

DESCRIPION
	anime-cli is a command line application that can be used to
	fetch information regarding the user-queried anime, like
	number of episodes, type of anime and it's airing status.
	  `);
  return;
}

if(arg[0] === "--version" || arg[0] === "-v") {
	console.log(chalk.cyanBright(`anime-cli\nversion: ${pjson.version}\n`))
	return;
}

//console.log(table.toString());

fetch(`https://api.jikan.moe/v3/search/anime?q=${query}`)
  .then((response) => response.json())
  .then((data) => {
    //console.log([data])

    //console.log(data.results[0]);
    const bunch = data.results.slice(0, 30);
    let status = "";
    let PTitle = "";

    if (arg[0] !== undefined) {
      arg[0] = arg[0].toLowerCase();
    }

    bunch.map((item) => {
      //console.log(item.title);

      if (item.title.toLowerCase().includes(arg[0])) {
        PTitle = chalk.bold.green;
      } else {
        PTitle = chalk.bold.white;
      }

      if (item.airing === true) {
        //console.log('Ongoing');
        status = chalk.red("Ongoing");
      } else if (item.airing === false) {
        //console.log('Finished! Time to binge watch');
        status = chalk.cyanBright("Finished");
      }
      //console.log(item.episodes);
      //console.log('---------------------');

      table.push([
        PTitle(item.title),
        item.episodes,
        chalk.yellow(item.type),
        status,
      ]);
    });

    console.log(table.toString());
  })
  .catch((error) => console.log(error));
