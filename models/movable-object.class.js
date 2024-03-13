/**
 * Represents a movable object that extends a drawable object.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };

    /**
     * Applies a gravity effect to the movable object, simulating vertical motion.
     * The object is moved vertically based on its speed and acceleration, creating a gravity effect.
     * The method uses a stoppable interval to update the object's position over time.
     *
     * @function
     * @name applyGravityBottle
     * @memberof MovableObject
     * @instance
     *
     * @description
     * This method should be called to simulate the effect of gravity on the movable object.
     * The object's vertical position (`y`) is adjusted based on its vertical speed (`speedY`) and acceleration (`acceleration`).
     * The interval for updating the position is set to 25 frames per second.
     *
     * @example
     * // Assuming 'movableObject' is an instance of MovableObject
     * movableObject.applyGravityBottle();
     */
    applyGravityBottle() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Applies a gravity effect to the character object, simulating vertical motion.
     * The object is moved vertically based on its speed and acceleration, creating a gravity effect.
     * If the character is not above the ground or has a negative vertical speed, its position is set to a default value (e.g., 105).
     * The method uses a stoppable interval to update the character's position over time.
     *
     * @function
     * @name applyGravityCharacter
     * @memberof CharacterObject
     * @instance
     *
     * @description
     * This method should be called to simulate the effect of gravity on the character object.
     * The character's vertical position (`y`) is adjusted based on its vertical speed (`speedY`) and acceleration (`acceleration`).
     * If the character is not above the ground or has a negative vertical speed, its position is set to a default value.
     * The interval for updating the position is set to 25 frames per second.
     *
     * @example
     * // Assuming 'characterObject' is an instance of CharacterObject
     * characterObject.applyGravityCharacter();
     */
    applyGravityCharacter() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.y = 105;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is positioned above the ground based on its vertical coordinate.
     * The determination of being above the ground depends on the type of object.
     *
     * @function
     * @name isAboveGround
     * @memberof SomeObject
     * @instance
     *
     * @description
     * This method checks whether the object is above the ground, and the criteria vary based on the object type.
     * For a `ThrowableObject`, it considers the object above the ground if its vertical position (`y`) is less than 300.
     * For other objects, including the default case for `ThrowableObject`, it considers the object above the ground
     * if its vertical position is less than 105.
     *
     * @returns {boolean} True if the object is above the ground, false otherwise.
     *
     * @example
     * // Assuming 'someObject' is an instance of SomeObject
     * const aboveGround = someObject.isAboveGround();
     * console.log(aboveGround); // Output: true or false
     */
    isAboveGround() {
        if (this instanceof ThrowableObject && this.y < 300) {
            return true;
        } else {
            return this.y < 105;
        }
    }

    /**
     * Plays an animation by updating the object's image with the next image in the provided image array.
     * The method cycles through the images in a loop, updating the object's image cache and the current image index.
     *
     * @function
     * @name playAnimation
     * @memberof AnimatedObject
     * @instance
     *
     * @description
     * This method should be called to play an animation by updating the object's image with the next image in the provided array.
     * The image array should contain paths to the images used for the animation. The method cycles through the images in a loop.
     *
     * @param {string[]} images - An array of image paths representing the frames of the animation.
     *
     * @example
     * // Assuming 'animatedObject' is an instance of AnimatedObject
     * const animationFrames = ['path/to/frame1.png', 'path/to/frame2.png', 'path/to/frame3.png'];
     * animatedObject.playAnimation(animationFrames);
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right by updating its horizontal position and direction.
     * @function
     * @name moveRight
     * @memberof MovableObject
     * @instance
     * @example
     * movableObject.moveRight();
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Moves the object to the left by updating its horizontal position and direction.
     * @function
     * @name moveLeft
     * @memberof MovableObject
     * @instance
     * @example
     * movableObject.moveLeft();
     */
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }
    /**
     * Checks if the object is colliding with another movable object.
     * @function
     * @name isColliding
     * @memberof SomeObject
     * @instance
     * @param {MovableObject} mo - The other movable object to check for collision.
     * @returns {boolean} True if colliding, false otherwise.
     * @example
     * someObject.isColliding(anotherObject);
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }

    /**
 * Reduces the object's energy by 0.5 and updates the last hit timestamp.
 * @function
 * @name hit
 * @memberof SomeObject
 * @instance
 * @example
 * someObject.hit();
 */
    hit() {
        this.energy -= 0.5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Reduces the object's energy by 19 and updates the last hit timestamp.
     * Used when the object is hit by an end boss.
     *
     * @function
     * @name hittedByEndboss
     * @memberof SomeObject
     * @instance
     * @example
     * someObject.hittedByEndboss();
     */
    hittedByEndboss() {
        this.energy -= 19;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
    /**
     * Reduces the object's energy by 19 when hit by a bottle.
     * If energy falls below 10, sets it to 0 and updates the last hit timestamp.
     *
     * @function
     * @name hittedByBottle
     * @memberof SomeObject
     * @instance
     * @example
     * someObject.hittedByBottle();
     */
    hittedByBottle() {
        this.energy -= 19;
        if (this.energy < 10) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is still in a hurt state based on the time elapsed since the last hit.
     *
     * @function
     * @name isHurt
     * @memberof SomeObject
     * @instance
     * @returns {boolean} True if still in a hurt state, false otherwise.
     * @example
     * const hurtState = someObject.isHurt();
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    /**
     * Checks if the end boss is still in a hurt state based on the time elapsed since the last hit.
     *
     * @function
     * @name endbossIsHurt
     * @memberof SomeObject
     * @instance
     * @returns {boolean} True if the end boss is still in a hurt state, false otherwise.
     * @example
     * const hurtState = someObject.endbossIsHurt();
     */
    endbossIsHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1.3;
    }

    /**
     * Checks if the object is dead based on its energy level.
     *
     * @function
     * @name isDead
     * @memberof SomeObject
     * @instance
     * @returns {boolean} True if the object is dead, false otherwise.
     * @example
     * const isObjectDead = someObject.isDead();
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Triggers chicken animations for moving left and checking death.
     *
     * @function
     * @name chickenAnimations
     * @memberof ChickenObject
     * @instance
     * @example
     * chickenObject.chickenAnimations();
     */
    chickenAnimations() {
        this.movingLeft();
        this.checkingDeath();
    }
    /**
     * Initiates animation for moving the object to the left.
     *
     * @function
     * @name movingLeft
     * @memberof MovableObject
     * @instance
     * @example
     * someObject.movingLeft();
     */
    movingLeft() {
        this.walkingLeft = setInterval(() => {
            this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
    }

    /**
     * Initiates periodic checks for the object's death status and triggers corresponding animations.
     *
     * @function
     * @name checkingDeath
     * @memberof ChickenObject
     * @instance
     * @example
     * chickenObject.checkingDeath();
     */
    checkingDeath() {
        this.Death = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.deadChicken();
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }

    /**
     * Handles actions and cleanup when the object is in a dead state.
     *
     * @function
     * @name deadChicken
     * @memberof ChickenObject
     * @instance
     * @example
     * chickenObject.deadChicken();
     */
    deadChicken() {
        setTimeout(() => {
            clearInterval(this.walkingLeft);
            clearInterval(this.Death);
        }, 100);
    }
}