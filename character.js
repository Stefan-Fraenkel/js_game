 export default class Character {

     timer;
     vertical;
     horizontal;
     speed;
     speedx;
     speedy;
     deceleration;
     id;

    constructor(start_pos_x = 100, start_pos_y = 100, id) {
        this.id = "character-" + id;
        let character = document.createElement('div');
        character.className = "character";
        character.id = this.id;
        character.style.left = start_pos_x + "px";
        character.style.top = start_pos_y + "px";
        character.style.width = 64 + "px";
        character.style.height = 64 + "px";
        character.style.backgroundImage = "url('/animation/walking.png')";
        character.style.position = "absolute";
        document.body.appendChild(character);
        this.timer = 0;
        this.vertical=0;
        this.horizontal = 0;
        this.speed = 3;
        this.speedx = this.speed;
        this.speedy = this.speed;
        this.deceleration = this.speed * 0.0625;
    }

     onKeyDown(event)
     {
         var keyCode = event.keyCode;
         switch (keyCode) {
             case 68: //d
                 this.keyD = true;
                 break;
             case 83: //s
                 this.keyS = true;
                 break;
             case 65: //a
                 this.keyA = true;
                 break;
             case 87: //w
                 this.keyW = true;
                 break;
         }
     }

     onKeyUp(event)
     {
         var keyCode = event.keyCode;
         switch (keyCode) {
             case 68: //d
                 this.keyD = false;
                 break;
             case 83: //s
                 this.keyS = false;
                 break;
             case 65: //a
                 this.keyA = false;
                 break;
             case 87: //w
                 this.keyW = false;
                 break;
         }
     }

    move(passable_top, passable_bottom, passable_left, passable_right) {
        var w = 0;
        var a = 0;
        var s = 0;
        var d = 0;


        if (this.keyW == true){
            this.speedx = this.speed;
            w = this.speedx;
        }
        else {
            if (this.keyS != true && this.speedx > 0){
                this.speedx -= this.deceleration;
                w = this.speedx;
            }
        }

        if (this.keyS == true){
            this.speedx = this.speed * (-1);
            s = this.speedx * (-1);
        }
        else {
            if (this.keyW != true && this.speedx < 0){
                this.speedx += this.deceleration;
                s = this.speedx * (-1);
            }
        }


        if (this.keyD == true){
            this.speedy = this.speed;
            d = this.speedy;
        }
        else {
            if (this.keyA != true && this.speedy > 0){
                this.speedy -= this.deceleration;
                d = this.speedy;
            }
        }

        if (this.keyA == true){
            this.speedy = this.speed * (-1);
            a = this.speedy * (-1);
        }
        else {
            if (this.keyD != true && this.speedy < 0){
                this.speedy += this.deceleration;
                a = this.speedy * (-1);
            }
        }

        if (passable_bottom != true){
            s = 0;
        }
        if (passable_top != true){
            w = 0;
        }
        if (passable_left != true){
            a = 0;
        }
        if (passable_right != true){
            d = 0;
        }

        this.animate();
        document.getElementById(this.id).style.left = document.getElementById(this.id).getBoundingClientRect().left - a + d + "px";
        document.getElementById(this.id).style.top = document.getElementById(this.id).getBoundingClientRect().top - w + s + "px";

    }

    animate(){
        var animationRate = 15;
        if (this.keyW == true && this.keyS != true) { // != instead of false because it also tests for "undefined"
            if (this.horizontal < 192 && this.timer >= animationRate) {
                this.horizontal += 64;
                this.vertical = 64;
                this.timer = 0;
            }
            else if (this.horizontal >= 192 && this.timer >= animationRate) {
                this.vertical = 64;
                this.horizontal = 0;
                this.timer = 0;
            }
            this.timer++;
        }
        if (this.keyW != true && this.keyS == true) {
            if (this.horizontal < 192 && this.timer >= animationRate) {
                this.horizontal += 64;
                this.vertical = 0;
                this.timer = 0;
            }
            else if (this.horizontal >= 192 && this.timer >= animationRate) {
                this.vertical = 0;
                this.horizontal = 0;
                this.timer = 0;
            }
            this.timer++;
        }
        if (this.keyA != true && this.keyD == true && this.keyW != true && this.keyS != true) {
            if (this.horizontal < 192 && this.timer >= animationRate) {
                this.horizontal += 64;
                this.vertical = 128;
                this.timer = 0;
            }
            else if (this.horizontal >= 192 && this.timer >= animationRate) {
                this.vertical = 128;
                this.horizontal = 0;
                this.timer = 0;
            }
            this.timer++;
        }
        if (this.keyA == true && this.keyD != true && this.keyW != true && this.keyS != true) {
            if (this.horizontal < 192 && this.timer >= animationRate) {
                this.horizontal += 64;
                this.vertical = 192;
                this.timer = 0;
            }
            else if (this.horizontal >= 192 && this.timer >= animationRate) {
                this.vertical = 192;
                this.horizontal = 0;
                this.timer = 0;
            }
            this.timer++;
        }
        document.getElementById(this.id).style.backgroundPosition = this.horizontal + 'px ' + this.vertical + 'px';
    };

}