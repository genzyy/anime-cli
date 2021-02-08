#!/usr/bin/env node

const fetch = require('node-fetch');
//const query = "Naruto";
let query = process.argv;
//console.log(process.argv[2]);
query = query.slice(2).join();

//console.log(arg[2]);

var Table = require('cli-table3');
var table = new Table({ 'head': ['Title', 'Episodes', 'Type', 'Status'],
                        'colWidths': [46, 11] });

const chalk = require('chalk');

if(query.includes('--help') || query.includes('-h') || process.argv.length < 3) {
  console.log("Usage:\n    anime-cli NAME\n    anime-cli -h\n    anime-cli --help\n\nExamples:\n    anime-cli boku no hero\n    anime-cli naruto");
  return;
}

//console.log(table.toString());


fetch(`https://api.jikan.moe/v3/search/anime?q=${query}`)
  .then(response => response.json())
  .then(data => {
    //console.log([data])


    //console.log(data.results[0]);
    const bunch = data.results;
    let status = '';
    let PTitle = '';

    bunch.map((item) => {
        //console.log(item.title);

        if(item.title.toLowerCase().includes(query.toLowerCase())) {

          PTitle = chalk.bold.green;
        }
        else {
          PTitle = chalk.bold.white;
        }

        if(item.airing === true) {
            //console.log('Ongoing');
            status = chalk.red('Ongoing');
        }
        else if (item.airing === false) {
            //console.log('Finished! Time to binge watch');
            status = chalk.cyanBright('Finished');
        }
        //console.log(item.episodes);
        //console.log('---------------------');

        table.push(
          [PTitle(item.title), item.episodes, chalk.yellow(item.type), status]
        )


    })

    console.log(table.toString());

  })
  .catch(error => console.log(error));
