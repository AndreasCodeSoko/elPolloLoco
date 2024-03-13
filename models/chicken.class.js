/**
 * Represents a chicken object that extends the MovableObject class.
 * @extends {MovableObject}
 */
class Chicken extends MovableObject {
    height = 90;
    width = 75;
    y = 340;

    offset = {
        top: 0,
        bottom: 0,
        left: 25,
        right: 25,
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    /**
     * Constructor for the Chicken class.
     * Loads initial images, sets random position, speed, and triggers chicken animations.
     * @constructor
     * @memberof Chicken
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 500 + Math.random() * 2000;

        this.speed = 0.15 + Math.random() * 0.3;
        this.chickenAnimations();
    }
}