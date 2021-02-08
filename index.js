#!/usr/bin/env node

const fetch = require('node-fetch');
//const query = "Naruto";
let query = process.argv;
query = query.join();
//console.log(query.split(','));
const arg = query.split(',');
//console.log(arg[2]);

var Table = require('cli-table3');
var table = new Table({ 'head': ['Title', 'Episodes', 'Type', 'Status'],
                        'colWidths': [46, 11] });

const chalk = require('chalk');

if(arg[2] === 'help') {
  console.log(chalk.redBright("You just need to type anime and then the actual\nof the anime that you want to search but with \nevery word having the first letter as the \ncapital letter"));
  console.log(chalk.greenBright("For example: anime Boku No Hero"));
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

        if(item.title.includes(arg[2])) {
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
