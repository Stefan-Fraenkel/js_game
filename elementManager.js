import Character from './character.js';
import Enemy from './enemy.js';
import Wall from "./wall.js";

export default class ElementManager {

    types = ["character", "enemy", "wall"];
    walls = [];
    wallCounter;
    enemies = [];
    enemyCounter;
    characters = [];
    characterCounter;

    constructor(start_pos_x = 20, start_pos_y = 100) {
        this.wallCounter = 0;
        this.enemyCounter = 0;
        this.characterCounter = 0;
    }

    createElement(type, number = 1, x = 0, y = 0, w = 10, h = 10)
    {
        let test = false;
        this.types.forEach(function (test_type) {
            if (test_type == type) {
                test = true;
            }
        })

        if (test == false) {
            throw new Error("Type does not exist.");
        }

        if (type == "character") {
            this.createCharacter(number, x, y);
        }

        if (type == "enemy") {
            this.createEnemy(number);
        }

        if (type == "wall") {
            this.createWall(number, x, y, w, h);
        }
    }

    createCharacter(number = 1, x = 100, y = 100)
    {
        while(number > 0) {
            this.characters.push(new Character(x, y, ++this.characterCounter)); // enemyCounter to give object unique id, since js objects don't naturally have one
            number--;
        }
    }

    createEnemy(number = 1)
    {
        while(number > 0) {
            this.enemies.push(new Enemy(this.getSize(), ++this.enemyCounter)); // enemyCounter to give object unique id, since js objects don't naturally have one
            number--;
        }
    }

    deleteEnemy(ids)
    {
        let deleters = [];
        let array = this.enemies;
        ids.forEach(function(id) {
            let i = 0;
            array.forEach(function(enemy) {
                if (enemy.id === id){
                    document.body.removeChild(document.getElementById(enemy.id)); // deleting all references since js objects can't destroy themselves, hence we're hoping for the garbage collector
                    deleters.push(i);
                }
                i++;
            })
        })
        var self = this; // this only references one layer above where it is called and the following function is nested within another one
        deleters.forEach(function(deleter) {
            self.enemies.splice(deleter, 1);
        })
    }

    createWall(number = 1, x, y, w = 10 , h = 10)
    {
        while(number > 0) {
            this.walls.push(new Wall(x, y, w, h, ++this.wallCounter)); // wallCounter to give object unique id, since js objects don't naturally have one
            number--;
        }
    }

    getSize(){
        if(window.innerWidth !== undefined && window.innerHeight !== undefined) {
            return [window.innerWidth, window.innerHeight]
        } else {
            return [document.documentElement.clientWidth, document.documentElement.clientHeight]
        }
    }

}