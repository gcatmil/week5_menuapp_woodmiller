class Game {
    constructor(name, ranking) {
        this.name = name;
        this.ranking = ranking;
    }

    describe() {
        return `${this.name} is ranked at ${this.ranking}.`;
    }
}

class Genre {
    constructor(name) {
        this.name = name;
        this.games = [];
    }


    addGame(game) {
        if (game instanceof Game) {
            this.games.push(game);
        } else {
            throw new Error(`You can only add an instance of Game. Argument is not a game: ${game}`);
        }
    }

    describe() {
        return `${this.name} has ${this.ranking.length} games.`;
    }
}

class Menu {
    constructor() {
        this.genres = [];
        this.selectedGenre = null;
    }
    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createGenre();
                    break;
                case '2':
                    this.viewGenre();
                    break;
                case '3':
                    this.deleteGenre();
                    break;
                case '4':
                    this.displayGenres();
                    break;
                default:
                        selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }
    
    showMainMenuOptions() {
        return prompt(`
        Welcome to your video game library! 
        Manage your games by genre, and ranking.
            0) exit
            1) create new genre
            2) view genre and game list
            3) delete genre
            4) display all genres
        `);
    }

    showGenreMenuOptions(genreInfo) {
        return prompt(`
        0) back
        1) add game
        2) delete game
        ---------------
        ${genreInfo}
        `);
    }
    
    displayGenres() {
        let genreString = '';
        for (let i = 0; i < this.genres.length; i++) {
            genreString += i + ') ' + this.genres[i].name + '\n';
        }
        alert(genreString);
    }
    
    createGenre() {
        let name = prompt('Enter the name of the new genre:');
        this.genres.push(new Genre(name));
    }

    viewGenre() {
        let index = prompt('Enter the index of the genre you want to view: ');
        if (index > -1 && index < this.genres.length) {
            this.selectedGenre = this.genres[index];
            let description = 'Genre Name: ' + this.selectedGenre.name + '\n';
            
            for (let i = 0; i < this.selectedGenre.games.length; i++) {
                description += i + ') ' + this.selectedGenre.games[i].name
                + ' - ' + this.selectedGenre.games[i].ranking + '\n';
            }

            let selection = this.showGenreMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createGame();
                    break;
                case '2':
                    this.deleteGame();
            }
        }
    }

    deleteGenre() {
        let index = prompt(`Enter the index of the genre you wish to delete:`);
        if (index >-1 && index < this.genres.length) {
            this.genres.splice(index, 1);
        }
    }

    createGame() {
        let name = prompt(`Enter name for new game:`);
        let ranking = prompt(`Enter ranking for new game:`);
        this.selectedGenre.games.push(new Game(name, ranking));
        //add something that organizes the array by value of ranking


    }
    deleteGame() {
        let index = prompt(`Enter the index of the game you wish to delete:`);
        if(index > -1 && index < this.selectedGenre.games.length) {
            this.selectedGenre.games.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();