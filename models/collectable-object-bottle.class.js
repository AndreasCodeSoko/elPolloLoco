/**
 * Represents a collectable bottle object that extends the MovableObject class.
 * @extends {MovableObject}
 */
class CollectableObjectBottle extends MovableObject {
    height = 100;
    width = 100;
    y = 333;

    IMAGES_BOTTLE = ['img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'];

    /**
 * Constructor for the CollectableObjectBottle class.
 * Loads initial image, sets random position, and triggers animation.
 * @constructor
 * @memberof CollectableObjectBottle
 */
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 200 + Math.random() * 2000;
        this.animate();
    }

    /**
   * Animates the CollectableObjectBottle by continuously playing its animation.
   * @function
   * @memberof CollectableObjectBottle
   * @fires CollectableObjectBottle#playAnimation
   * @returns {void}
   */
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 600);
    }
}