/**
 * Represents a collectable coin object that extends the MovableObject class.
 * @extends {MovableObject}
 */
class CollectableObjectCoin extends MovableObject {
    height = 150;
    width = 150;
    y = 75;

    IMAGES_COIN = ['img/8_coin/coin_1.png', 'img/8_coin/coin_2.png'];

    /**
     * Constructor for the CollectableObjectCoin class.
     * Loads initial image, sets random position, and triggers animation.
     * @constructor
     * @memberof CollectableObjectCoin
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = 400 + Math.random() * 2000;
        this.animate();
    }

    /**
    * Animates the CollectableObjectCoin by continuously playing its animation.
    * @function
    * @memberof CollectableObjectCoin
    * @fires CollectableObjectCoin#playAnimation
    * @returns {void}
    */
    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 200);
    }
}