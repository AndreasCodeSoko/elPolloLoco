
/**
 * Represents a character object that extends the MovableObject class.
 * @extends {MovableObject}
 */
class Character extends MovableObject {
    height = 330;
    width = 120;
    checkingLongIdle = 0;
    offset = {
        top: 120,
        bottom: 20,
        left: 15,
        right: 15,
    };
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    IMAGES_HURT = ['img/2_character_pepe/4_hurt/H-41.png', 'img/2_character_pepe/4_hurt/H-42.png', 'img/2_character_pepe/4_hurt/H-43.png'];

    world;
    speed = 8;

    /**
     * Constructor for the Character class.
     * Loads initial images, applies gravity to the character, and starts animation.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/long_idle/I-11.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravityCharacter();
        this.animate();
    }

    /**
 * Animates the character based on user input and game state.
 * Uses two intervals to handle movement and animation separately.
 * @function
 * @memberof YourClassName
 * @returns {void}
 */
    animate() {
        setStoppableInterval(() => {
            if (this.world.keyboard.RIGHT && this.world.character.x <= this.world.endboss.x) {
                this.moveRight();
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.speedY = 30;
            }
            this.world.camera_x = -this.x + 70;
        }, 1000 / 60);


        /**
         * Interval for handling character animation based on game state.
         * @inner
         * @function
         * @fires YourClassName#deathAnimation
         * @fires YourClassName#hurtAnimation
         * @fires YourClassName#jumpAnimation
         * @fires YourClassName#walkingAnimation
         * @fires YourClassName#idleAnimation
         * @fires YourClassName#longIdleAnimation
         */

        setStoppableInterval(() => {
            if (this.isDead()) {
                this.deathAnimation();
            } else if (this.isHurt()) {
                this.hurtAnimation();
            } else if (this.isAboveGround()) {
                this.jumpAnimation();
            } else if (this.isWalking()) {
                this.walkingAnimation();
            } else if (this.isStanding()) {
                this.idleAnimation();
            } else {
                this.longIdleAnimation();
            }
        }, 100);
    }

    /**
     * Triggers the death animation for the character.
     * Plays the death animation, audio, stops game sounds, and handles game loss.
     * @function
     * @memberof YourClassName
     * @fires YourClassName#playAnimation
     * @fires YourClassName#characterDeadSound
     * @fires YourClassName#setGameSoundsToNull
     * @fires YourClassName#gameLost
     * @fires YourClassName#stopsGame
     * @returns {void}
     */
    deathAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        characterDeadSound.play();
        setGameSoundsToNull();
        gameLost();
        this.stopsGame();
    }

    /**
     * Stops the game after a delay and resets the 'arrivedEndboss' flag.
     * @function
     * @memberof YourClassName
     * @fires stopGame
     * @returns {void}
     */
    stopsGame() {
        setTimeout(() => {
            stopGame();
            arrivedEndboss = false;
        }, 700);
    }

    /**
     * Triggers the hurt animation for the character.
     * Plays the hurt animation, plays the character hurt sound, and resets the long idle counter.
     * @function
     * @memberof YourClassName
     * @fires YourClassName#playAnimation
     * @fires YourClassName#characterHurtSound
     * @returns {void}
     */
    hurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        characterHurtSound.play();
        this.checkingLongIdle = 0;
    }

    /**
     * Triggers the jump animation for the character.
     * Plays the jump animation, plays the character jump sound, and resets the long idle counter.
     * @function
     * @memberof YourClassName
     * @fires YourClassName#playAnimation
     * @fires YourClassName#characterJumpSound
     * @returns {void}
     */
    jumpAnimation() {
        this.playAnimation(this.IMAGES_JUMPING);
        characterJumpSound.play();
        this.checkingLongIdle = 0;
    }

    /**
     * Checks if the character is currently walking based on keyboard input.
     * @function
     * @memberof YourClassName
     * @returns {boolean} - Returns true if the character is walking (moving left or right), otherwise false.
     */
    isWalking() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }
    /**
     * Triggers the walking animation for the character.
     * Plays the walking animation and resets the long idle counter.
     * @function
     * @memberof YourClassName
     * @fires YourClassName#playAnimation
     * @returns {void}
     */
    walkingAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
        this.checkingLongIdle = 0;
    }

    /**
     * Checks if the character is currently standing based on the long idle counter.
     * @function
     * @memberof YourClassName
     * @returns {boolean} - Returns true if the character is standing, otherwise false.
     */
    isStanding() {
        return this.checkingLongIdle < 30;
    }

    /**
     * Triggers the idle animation for the character.
     * Plays the idle animation and increments the long idle counter.
     * @function
     * @memberof YourClassName
     * @fires YourClassName#playAnimation
     * @returns {void}
     */
    idleAnimation() {
        this.playAnimation(this.IMAGES_IDLE);
        this.checkingLongIdle++;
    }

    /**
     * Triggers the long idle animation for the character.
     * Plays the long idle animation.
     * @function
     * @memberof YourClassName
     * @fires YourClassName#playAnimation
     * @returns {void}
     */
    longIdleAnimation() {
        this.playAnimation(this.IMAGES_LONG_IDLE);
    }
}