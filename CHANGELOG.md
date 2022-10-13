# Change Log

### v1.5.5

- Thanks to [@mqhashim](https://github.com/mqhashim), for bumping up the [Jikan API](https://jikan.moe/) version to v4.

### v1.5.0

- Fixed a bug where it didn't show any results when no argument is passed.
- It now shows anime titles randomly chosen from a list and searched on the database.

### v1.4.5

- Reduced dependency on `chalk` npm package.

### v1.4.1

Most of the changes in this version focus on the development side and improving the code in general but there is one feature that has been added now for limiting the fetched results.

- Limit the fetched results for any anime title by passing the number of results you want (should be between 1 and 100),

```bash
anime-cli <anime-title> <number>
```

- `NOTE`: As of now, not passing any anime-title gives out an error (you can try that) and I am aiming to fix it in the next version which will be released soon.

- Use of non-functional returns has been droped and instead we are using `process.exit()` to quit the process.
- `eslint` and `prettier` is now being used for making the code better and linting the files.
- Using strict `eslint` rules for better programming.
<hr>
<br />

### v1.4.0

- Fix `-h` argument not working because of early constraint checking on arguments.
- Upgrade to v1.4.0.
<hr>
<br />

### v1.3.8

- Fix a bug where if searched with a two digit number then it gives out error.
<hr>
<br />

### v1.3.6

- Added comments to the main js file to know the code better.
- Fixed some lexical and keyword errors.
- Added some more recommended animes in `RA.json` so that they get displayed when the user doesnt pass any argument.
<hr>
<br />

### v1.3.5

- Fixed help message
<hr>
<br />

### v1.3.2

- Thanks to [@KennyTheBard](https://github.com/KennyTheBard) for adding the following features.
- You can choose if the fetched titles will have displayed score, for this run `anime-cli showScore true` or to unset it run `anime-cli showScore false`.
- You can choose if the fetched titles will have displayed year, for this run `anime-cli showYear true` or to unset it run `anime-cli showYear false`.
- You can sort ascendent or descendent on a (single) field, for this run `anime-cli <search-term> --asc Score` or `anime-cli <search-term> --desc Score`
<hr>
<br />

### v1.3.1

- Thanks to [@atul-g](https://github.com/atul-g) for creating a much better help section and adding a version check command.
- Added a config file which is used for setting limit for the results and to show only the matched results.
- The config file in Linux/MacOS gets stored at `~/.config/configstore/@genzyy/anime-cli.json` and generally gets stored at `$CONFIG/package-name/config.json`.
- An example config would be like

```json
{
	"setLimit": false,
	"limit": 10,
	"onlyMatches": false
}
```

- To set a limit on the data fetched run `anime-cli setLimit true <number-results-to-show>`.
- To unset the limit run `anime-cli setLimit false`.
- You can also fetch only the titles which match to your query, for this run `anime-cli onlyMatches true` or to unset it run `anime-cli onlyMatches false`.
- Also instead of running these commands, you can manually edit the config file and change accordingly.
<hr>
<br />

### v1.1.2

- Fixed a bug where it threw an error when only `anime-cli` was run.
<hr>
<br />

### v1.1.1

With the help from:

- [@MichalNemecek](https://github.com/MichalNemecek)

Added a feature to search anime even in lowercase when passed in the arguments.

<hr>
<br />

### v1.0.2

Thanks to:

- [@Gamecube762](https://github.com/Gamecube762)

For adding 'type' section for a better sorting of movies and TV shows.

<hr>
<br />
