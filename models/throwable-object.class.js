/**
 * Represents a throwable object, extending a movable object.
 * @class
 * @name ThrowableObject
 * @extends MovableObject
 *
 * @property {number} height - The height of the throwable object.
 * @property {Object} offset - The offset values for the throwable object's boundaries.
 * @property {number} offset.top - The offset from the top edge.
 * @property {number} offset.bottom - The offset from the bottom edge.
 * @property {number} offset.left - The offset from the left edge.
 * @property {number} offset.right - The offset from the right edge.
 *
 * @example
 * const throwable = new ThrowableObject();
 */
class ThrowableObject extends MovableObject {
    height = 100;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: -8,
    };

    IMAGES_THROWING_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    /**
    * Constructor for ThrowableObject class.
    *
    * @constructor
    * @memberof ThrowableObject
    * @extends MovableObject
    *
    * Initializes a throwable object with a specified position and character direction.
    *
    * @param {number} x - The horizontal position of the throwable object.
    * @param {number} y - The vertical position of the throwable object.
    * @param {string} characterDirection - The direction of the character throwing the object.
    * 
    * @example
    * const throwable = new ThrowableObject(300, 200, 'left');
    */
    constructor(x, y, characterDirection) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_THROWING_BOTTLE);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.characterDirection = characterDirection;
        this.throw();
        this.bottleAnimations();
    }

    /**
    * Initiates the throwing action for the throwable object.
    *
    * @function
    * @name throw
    * @memberof ThrowableObject
    * @instance
    * @private
    *
    * Sets the vertical speed, applies gravity, and determines the throwing direction.
    * @example
    * throwable.throw();
    */
    throw() {
        this.speedY = 30;
        this.applyGravityBottle();
        this.throwingLeftOrRight();
    }

    /**
   * Initiates the throwing animation in the specified character direction.
   *
   * @function
   * @name throwingLeftOrRight
   * @memberof ThrowableObject
   * @instance
   * @private
   *
   * Plays the throw bottle sound, moves the object left or right, and clears the throwing interval after a delay.
   * @example
   * throwable.throwingLeftOrRight();
   */
    throwingLeftOrRight() {
        throwBottleSound.play();
        this.throwingInterval = setInterval(() => {
            if (this.characterDirection) {
                this.x -= 10;
            } else {
                this.x += 10;
            }
        }, 25);

        setTimeout(() => clearInterval(this.throwingInterval), 1000);
    }

    /**
    * Triggers bottle animations including splash or throwing animation and updates for collisions with the end boss.
    *
    * @function
    * @name bottleAnimations
    * @memberof ThrowableObject
    * @instance
    * 
    * @example
    * throwable.bottleAnimations();
    */
    bottleAnimations() {
        this.splashOrThrowingAnimation();
        this.updateBottleCollidedWithEndboss();
    }

    /**
    * Initiates the animation for either bottle throwing or splash based on the object's position and collisions.
    *
    * @function
    * @name splashOrThrowingAnimation
    * @memberof ThrowableObject
    * @instance
    * @private
    *
    * Checks the object's position and collisions to play the appropriate animation.
    * @example
    * throwable.splashOrThrowingAnimation();
    */
    splashOrThrowingAnimation() {
        this.splashAnimation = setInterval(() => {
            if (this.y > 240 || world.bottleCollidedWithEndboss) {
                this.playSplashAnimation();
            } else {
                this.playAnimation(this.IMAGES_THROWING_BOTTLE);
            }
        }, 1000 / 15);
    }

    /**
   * Updates the status of bottle collision with the end boss after a brief delay.
   *
   * @function
   * @name updateBottleCollidedWithEndboss
   * @memberof ThrowableObject
   * @instance
   * @private
   *
   * Resets the world variable for bottle collision with the end boss after a specified time.
   * @example
   * throwable.updateBottleCollidedWithEndboss();
   */
    updateBottleCollidedWithEndboss() {
        setTimeout(() => {
            world.bottleCollidedWithEndboss = false;
        }, 50);
    }

    /**
     * Plays the animation for the splash effect when the throwable object collides with the end boss or reaches a certain position.
     *
     * @function
     * @name playSplashAnimation
     * @memberof ThrowableObject
     * @instance
     * @private
     *
     * Initiates splash animation, plays the splash sound, updates properties, triggers splash effect, and clears the animation interval.
     * @example
     * throwable.playSplashAnimation();
     */
    playSplashAnimation() {
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        bottleSplashSound.play();
        this.speed = 0;
        this.height = 100;
        this.splashEffect();
        clearInterval(this.splashAnimation);
    }

    /**
 * Initiates the splash effect by continuously moving the throwable object downward and triggering its deletion.
 *
 * @function
 * @name splashEffect
 * @memberof ThrowableObject
 * @instance
 * @private
 *
 * Moves the object downward and deletes it at a specified interval.
 * @example
 * throwable.splashEffect();
 */
    splashEffect() {
        setInterval(() => {
            this.y += 10;
            this.deleteBottle();
        }, 70);
    }

    /**
 * Deletes the throwable object by repositioning it after a specified delay.
 *
 * @function
 * @name deleteBottle
 * @memberof ThrowableObject
 * @instance
 * @private
 *
 * Repositions the throwable object after a delay to simulate its removal from the scene.
 * @example
 * throwable.deleteBottle();
 */
    deleteBottle() {
        setTimeout(() => {
            this.y = 500;
        }, 300);
    }
}