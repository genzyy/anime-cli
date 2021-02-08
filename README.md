<div align="center">
  <h1>anime-cli</h1>
 </div>
 
![image](./assets/anime-cli.png)
 
 ## What its about ##
 
 The anime-cli is a commandline app created using javascript modules and an external api which can be found [here](https://jikan.moe/).
 The anime-cli app gives you information about the number of episodes of the anime, if its completed or not and tells you all its movies.
 You can also visit the npm site for this cli app [here](https://www.npmjs.com/package/@genzyy/anime-cli).
 
 
 ## How to install the commandline app ##
 As the app is a npm package you first need to install [NodeJS](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/get-npm) as these are the requirements for this app.
 Now since to make this an app or to be more clear, to be able to run this app from any directory iin the terminal/cmd, you need to install this npm package globally.
 To install a npm package globally you need to have root priviledges and include global flag during the installation of any npm package.
To install this commandline app:
<br>
If you are using mac or linux:
```bash
  sudo npm install -g @genzyy/anime-cli
```
Or if you are using windows:
```bash
  npm install -g @genzyy/anime-cli
```

## Change Log ##

### v1.1.1 ###

With the help from:
* [@MichalNemecek](https://github.com/MichalNemecek)

 Added a feature to search anime even in lowercase when passed in the arguments.

### v1.0.2 ###

Thanks to:
* [@Gamecube762](https://github.com/Gamecube762)

For adding 'type' section for a better sorting of movies and TV shows.

## Usage ##

Now that you have installed the app, you can run anime-cli in your terminal or cmd and it will show you recent animes and their episodes and airing status.
To get data about a specific anime or about its seasons and movies, run:
```bash
  anime-cli <anime-name>
```
For example:
```bash
  anime-cli Naruto
```

The keyword that you have used to search about the anime, if that keyword matches to any title in the result array them that anime will be highlighted in green color so that it shows that this anime is probably connected to the anime keyword that you have used to search about.

### Some Useful Notes ###
The cli app is currently in development and is only mantained by [me](https://github.com/genzyy) and so the development will be a little slow as I have to do my college work also.
Sorry for that!
But dont worry, I will keep adding new features and argument passing features for a more accurate data fetching.
Also, I request you while using the cli app try to pass the exact name of the anime for example pass `Boku No Hero` instead of `boku no hero` so as to get the highlighting of the animes which contain the exact names that you have passed in the arguments.
