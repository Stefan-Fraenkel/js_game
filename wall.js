export default class Wall {

    character_left;
    character_right;
    character_top;
    character_bottom;
    character_height = 64;
    wall_right;
    wall_left;
    character_width = 64;
    wall_top;
    wall_bottom;
    passable_horizontal;
    passable_vertical;
    buffer;

    passable_top;
    passable_bottom;
    passable_left;
    passable_right;

    constructor(x, y, w = 10, h = 10, id)
    {
        this.id = "wall-" + id;
        let wall = document.createElement('div');
        wall.className = "wall";
        wall.id = this.id;
        wall.style.left = x + "px";
        wall.style.top = y + "px";
        wall.style.width = w + "px";
        wall.style.height = h + "px";
        wall.style.backgroundColor = "darkslategray";
        var r1 = 140;
        var g1 = 202;
        var b1 = 165;
        var r2 = 198;
        var g2 = 159;
        var b2 = 197;
        var r3 = 248;
        var g3 = 160;
        var b3 = 133;
        wall.style.backgroundImage = 'linear-gradient(45deg, rgb(' + r1 + ',' + g1 + ',' + b1 + '), rgb(' + r2 + ',' + g2 + ',' + b2 + '), rgb(' + r3 + ',' + g3 + ',' + b3 + '))';
        wall.style.position = "absolute";
        document.body.appendChild(wall);
    }

    passable(character){

        this.buffer = 10;

        this.character_left = document.getElementById(character.id).getBoundingClientRect().left; //declaration here prevents update on every loop
        this.character_right = document.getElementById(character.id).getBoundingClientRect().left + document.getElementById(character.id).offsetWidth;
        this.character_width = document.getElementById(character.id).offsetWidth;
        this.character_height = document.getElementById(character.id).offsetHeight;
        this.character_top = document.getElementById(character.id).getBoundingClientRect().top;
        this.character_bottom = document.getElementById(character.id).getBoundingClientRect().bottom;
        this.wall_right = document.getElementById(this.id).getBoundingClientRect().right - this.buffer;
        this.wall_left = document.getElementById(this.id).getBoundingClientRect().left + this.buffer;
        this.wall_top = document.getElementById(this.id).getBoundingClientRect().top + this.buffer;
        this.wall_bottom = document.getElementById(this.id).getBoundingClientRect().bottom - this.buffer;

        this.passable_horizontal = false;
        this.passable_vertical = false;

        this.passable_top = true;
        this.passable_bottom = true;
        this.passable_left = true;
        this.passable_right = true;

        if (this.character_right >= this.wall_left + 2*this.buffer && this.character_left <= this.wall_right - 2*this.buffer) {
            if (this.character_bottom >= this.wall_top - this.buffer && this.character_top <= this.wall_top - this.buffer) {
                this.passable_bottom = false;
            }
            else if (this.character_top <= this.wall_bottom - 4*this.buffer && this.character_bottom >= this.wall_bottom - 4*this.buffer ) {
                this.passable_top = false;
            }
        }

        if (this.character_bottom <= this.wall_bottom + 2*this.buffer && this.character_bottom >= this.wall_top) {
            if (this.character_left <= this.wall_right - 0.5 * this.buffer && this.character_right >= this.wall_right - 0.5 * this.buffer) {
                this.passable_left = false;
            } else if (this.character_right >= this.wall_left + 0.5 * this.buffer && this.character_left <= this.wall_left) {
                this.passable_right = false;
            }
        }
        return [this.passable_top, this.passable_bottom, this.passable_left, this.passable_right];
    }

}