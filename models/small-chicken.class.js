/**
 * Represents a small chicken object that extends a movable object.
 * @class
 * @name ChickenSmall
 * @extends MovableObject
 *
 * @property {number} height - The height of the small chicken.
 * @property {number} width - The width of the small chicken.
 * @property {number} y - The vertical position of the small chicken.
 *
 * @property {Object} offset - The offset values for the small chicken's boundaries.
 * @property {number} offset.top - The offset from the top edge.
 * @property {number} offset.bottom - The offset from the bottom edge.
 * @property {number} offset.left - The offset from the left edge.
 * @property {number} offset.right - The offset from the right edge.
 *
 * @example
 * const smallChicken = new ChickenSmall();
 */
class ChickenSmall extends MovableObject {
    height = 55;
    width = 50;
    y = 372;

    offset = {
        top: 0,
        bottom: 0,
        left: 25,
        right: 25,
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    /**
    * Constructor for ChickenSmall class.
    *
    * @constructor
    * @memberof ChickenSmall
    * @extends MovableObject
    *
    * Initializes a small chicken with walking and death animations.
    * Sets random horizontal position and speed.
    *
    * @example
    * const smallChicken = new ChickenSmall();
    */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 500 + Math.random() * 2000;

        this.speed = 0.15 + Math.random() * 0.3;
        this.chickenAnimations();
    }
}