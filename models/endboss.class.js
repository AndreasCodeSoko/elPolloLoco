
class Endboss extends MovableObject {
    IMAGES_ATTENTION = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    height = 400;
    width = 300;
    y = 50;
    offset = {
        top: 50,
        bottom: 20,
        left: 30,
        right: 30,
    };

    /**
     * Represents an end boss character with various animations.
     * @constructor
     * @extends {DrawableObject}
     */
    constructor() {
        super().loadImage(this.IMAGES_ATTENTION[0]);
        this.loadImages(this.IMAGES_ATTENTION);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3200;
        this.speed = 15;
        this.endbossAnimations();
    }

    /**
     * Manages the different animations for the end boss character based on its state.
     * @method
     * @returns {void}
     */
    endbossAnimations() {
        setStoppableInterval(() => {
            if (this.arrivingEndboss()) {
                this.endbossAttentionAnimation();
            } else if (this.CharacterIsNearEndboss()) {
                this.endbossAttackingAnimation();
            } else if (this.endbossIsHurt()) {
                this.endbossIsHurtAnimation();
            } else if (this.isDead()) {
                this.deathAnimation();
            } else if (this.endbossCanWalk()) {
                this.walkingAnimation();
            }
        }, 130);
    }

    /**
     * Checks if the end boss is currently within a certain distance from the player character and has not yet arrived.
     * @method
     * @returns {boolean} - `true` if the end boss is arriving, `false` otherwise.
     */
    arrivingEndboss() {
        return this.x - world.character.x <= 800 && !arrivedEndboss;
    }

    /**
     * Initiates the attention animation for the end boss, playing the attention images and associated sound.
     * @method
     * @returns {void}
     */
    endbossAttentionAnimation() {
        this.playAnimation(this.IMAGES_ATTENTION);
        endbossAttentionSound.play();
        this.letEndbossWalk();
    }

    /**
     * Initiates the walking behavior for the end boss by setting a timer to mark its arrival.
     * @method
     * @returns {void}
     */
    letEndbossWalk() {
        setTimeout(() => {
            arrivedEndboss = true;
        }, 1500);
    }

    /**
     * Checks if the player character is near the end boss.
     * @method
     * @returns {boolean} - `true` if the player character is near the end boss, `false` otherwise.
     */
    CharacterIsNearEndboss() {
        return this.x - world.character.x < 30;
    }

    /**
     * Initiates the attacking animation for the end boss, playing the attack images and associated sound.
     * @method
     * @returns {void}
     */
    endbossAttackingAnimation() {
        this.playAnimation(this.IMAGES_ATTACK);
        endbossAttackSound.play();
    }

    /**
     * Initiates the hurt animation for the end boss, playing the hurt images and associated sound.
     * @method
     * @returns {void}
     */
    endbossIsHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        endbossHurtSound.play();
    }

    /**
     * Initiates the death animation for the end boss, playing the dead animation, associated sound, and handling game over conditions.
     * @method
     * @returns {void}
     */
    deathAnimation() {
        this.endbossDeadAndSound();
        setGameSoundsToNull();
        this.endbossMovesDownFromField();
        gameWon();
        this.stopsGame();
    }

    /**
     * Stops the game after a specified delay, resetting the 'arrivedEndboss' flag.
     * @method
     * @returns {void}
     */
    stopsGame() {
        setTimeout(() => {
            stopGame();
            arrivedEndboss = false;
        }, 1500);
    }

    /**
     * Initiates the dead animation for the end boss, plays the dead animation images, and triggers the game win sound after a delay.
     * @method
     * @returns {void}
     */
    endbossDeadAndSound() {
        this.playAnimation(this.IMAGES_DEAD);
        setTimeout(() => {
            gameWinSound.play();
        }, 200);
    }

    /**
     * Initiates the downward movement animation for the end boss, gradually changing its y-coordinate.
     * @method
     * @returns {void}
     */
    endbossMovesDownFromField() {
        setTimeout(() => {
            setStoppableInterval(() => {
                this.y += 20;
            }, 50);
        }, 500);
    }

    /**
     * Checks if the end boss is allowed to perform the walking animation based on its arrival status.
     * @method
     * @returns {boolean} - `true` if the end boss has arrived and can walk, `false` otherwise.
     */
    endbossCanWalk() {
        return arrivedEndboss === true;
    }

    /**
     * Initiates the walking animation for the end boss, playing the walking animation images, starting the end boss music, and moving left.
     * @method
     * @returns {void}
     */
    walkingAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
        this.playEndbossMusic();
        this.moveLeft();
        this.otherDirection = false;
    }
    /**
     * Plays the end boss music, looping it and pausing the background music.
     * @method
     * @returns {void}
     */
    playEndbossMusic() {
        gameEndbossMusic.loop = true;
        gameEndbossMusic.play();
        gameBackgroundMusic.pause();
    }
}