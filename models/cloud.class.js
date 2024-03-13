/**
 * Represents a cloud object that extends the MovableObject class.
 * @extends {MovableObject}
 */
class Cloud extends MovableObject {
    width = 400;
    height = 350;

    /**
  * Constructor for the Cloud class.
  * Loads initial cloud image, sets random position, speed, and triggers animation.
  * @constructor
  * @memberof Cloud
  */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.y = 10 + Math.random() * 50;
        this.x = Math.random() * 3000;
        this.speed = 0.05;
        this.animate();
    }
    /**
     * Animates the Cloud object by continuously moving it to the left.
     * @function
     * @memberof Cloud
     * @fires Cloud#moveLeft
     * @returns {void}
     */
    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
    }
}