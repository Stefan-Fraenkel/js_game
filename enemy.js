 export default class Enemy {

     enemy
     destination_x;
     destination_y;
     rotation_enemy;
     hitpoints;
     id;
     coordinates;
     timer;

     constructor(view_width_height, id)
     {
         this.id = "enemy-" + id;
         let enemy = document.createElement('div');
         enemy.className = "enemy";
         enemy.id = this.id;
         enemy.style.left = this.getRndInteger(0, view_width_height[0]+1) + "px";
         enemy.style.top = this.getRndInteger(0, view_width_height[1]+1) + "px";
         enemy.style.width = 64 + "px";
         enemy.style.height = 64 + "px";
         enemy.style.backgroundImage = "url('/animation/ghost.png')";
         enemy.style.position = "absolute";
         document.body.appendChild(enemy);
         this.hitpoints = 5;
         this.timer = 0;
     }

     move(current_pos, view_width_height)
     {
         this.coordinates = document.getElementById(this.id).getBoundingClientRect()
         let animationRate = 20;
         if (this.timer >= animationRate) {
             document.getElementById(this.id).style.backgroundImage =  "url('/animation/ghost.png')";
             this.timer = 0;
         }
         this.timer++;

         if (typeof this.destination_x === 'undefined' || typeof this.destination_y === 'undefined') {
             this.newDestination(view_width_height);
             this.rotation_enemy = Math.atan2(this.destination_y - current_pos.top, this.destination_x - current_pos.left);
         }

         while (current_pos.left <= this.destination_x && current_pos.left + current_pos.width >= this.destination_x && current_pos.top <= this.destination_y && current_pos.top + current_pos.height >= this.destination_y) {
             this.newDestination(view_width_height);
             this.rotation_enemy = Math.atan2(this.destination_y - current_pos.top, this.destination_x - current_pos.left);
         }

         var velocity = 2;
         var enemy_x = Math.cos(this.rotation_enemy) * velocity;
         var enemy_y = Math.sin(this.rotation_enemy) * velocity;

         while ((current_pos.left + enemy_x) < 0 || (current_pos.left + enemy_x) > view_width_height[0] || (current_pos.top + enemy_y) < 0 || (current_pos.top + enemy_y) > view_width_height[1])
         {
             this.newDestination(view_width_height);
             this.rotation_enemy = Math.atan2(this.destination_y - current_pos.top, this.destination_x - current_pos.left);
             enemy_x = Math.cos(this.rotation_enemy) * velocity;
             enemy_y = Math.sin(this.rotation_enemy) * velocity;
         }

         return [current_pos.left + enemy_x + "px", current_pos.top + enemy_y + "px"];
     }

     newDestination(view_width_height)
     {
         this.destination_x = this.getRndInteger(0, view_width_height[0]+1); // Returns a random integer from 0 to w
         this.destination_y = this.getRndInteger(0, view_width_height[1]+1); // Returns a random integer from 0 to h
     }

     hit(bullet)
     {
         document.getElementById(this.id).style.backgroundImage =  "url('/animation/ghost_h2.png')";
         document.body.removeChild(document.getElementById(bullet[0]));

         if (this.hitpoints > 0){
             this.hitpoints--;
         }

         return this.hitpoints;
     }

     getRndInteger(min, max)
     {
         return Math.floor(Math.random() * (max - min) ) + min;
     }

}