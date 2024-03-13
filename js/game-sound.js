characterJumpSound = new Audio('audio/jump.mp3');
characterDeadSound = new Audio('audio/dead3.mp3');
characterHurtSound = new Audio('audio/hit.mp3');
ChickenDeadSound = new Audio('audio/chicken.mp3');
throwBottleSound = new Audio('audio/bottle.mp3');
collectBottleSound = new Audio('audio/coins.mp3');
bottleSplashSound = new Audio('audio/splash.mp3');
collectCoinSound = new Audio('audio/coins.mp3');
endbossHurtSound = new Audio('audio/endbossChicken.mp3');
endbossAttentionSound = new Audio('audio/endbossChicken.mp3');
endbossAttackSound = new Audio('audio/endbossChicken.mp3');


gameBackgroundMusic = new Audio('audio/background.mp3');
gameEndbossMusic = new Audio('audio/game_over_boss.mp3');

gameWinSound = new Audio('audio/win.mp3');
gameLoseSound = new Audio('audio/dead.mp3');


let game_music_off = false;

/**
 * Initializes and manages game sounds, including background music.
 * This function sets up sounds at the beginning, checks game music, and starts the background music in a loop.
 * @function
 * @name gameSounds
 * @returns {void}
 */
function gameSounds() {
    setSoundsAtBegin();
    checkGameMusic();
    gameBackgroundMusic.loop = true;
    gameBackgroundMusic.play();
}


/**
 * Sets the initial state of game sounds, resetting the current time of background and endboss music to zero.
 * @function
 * @name setSoundsAtBegin
 * @returns {void}
 */ 
function setSoundsAtBegin() {
    gameBackgroundMusic.currentTime = 0;
    gameEndbossMusic.currentTime = 0;
}

/**
 * Checks the status of the game music and adjusts the volume of all sounds accordingly.
 * If game music is enabled, sets the volume to maximum; otherwise, mutes all sounds.
 * @function
 * @name checkGameMusic
 * @returns {void}
 */
function checkGameMusic() {
    if (!game_music_off) {
        allSoundsVolumeOne();
    } else {
        allSoundsVolumeNull();
    }
}

/**
 * Turns off game sounds, sets the game music status to off, and mutes all sounds.
 * @function
 * @name soundOff
 * @returns {void}
 */
function soundOff() {
    game_music_off = true;
    showSoundOffButton();
    allSoundsVolumeNull();
}

/**
 * Displays the sound-off button by hiding the sound-on image and showing the sound-off image.
 * @function
 * @name showSoundOffButton
 * @returns {void}
 */
function showSoundOffButton() {
    document.getElementById('sound-on-img').classList.add('d-none');
    document.getElementById('sound-off-img').classList.remove('d-none');
}

/**
 * Mutes the volume of all game sounds.
 * @function
 * @name allSoundsVolumeNull
 * @returns {void}
 */
function allSoundsVolumeNull() {
    characterJumpSound.volume = 0;
    characterDeadSound.volume = 0;
    characterHurtSound.volume = 0;
    ChickenDeadSound.volume = 0;
    throwBottleSound.volume = 0;
    collectBottleSound.volume = 0;
    bottleSplashSound.volume = 0;
    collectCoinSound.volume = 0;
    endbossHurtSound.volume = 0;
    endbossAttentionSound.volume = 0;
    endbossAttackSound.volume = 0;
    gameBackgroundMusic.volume = 0;
    gameEndbossMusic.volume = 0;
    gameWinSound.volume = 0;
    gameLoseSound.volume = 0;
}

/**
 * Turns on game sounds, sets the game music status to on, and sets the volume of all sounds to maximum.
 * @function
 * @name soundOn
 * @returns {void}
 */
function soundOn() {
    game_music_off = false;
    showSoundOnButton();
    allSoundsVolumeOne();
}


/**
 * Displays the sound-on button by hiding the sound-off image and showing the sound-on image.
 * @function
 * @name showSoundOnButton
 * @returns {void}
 */
function showSoundOnButton() {
    document.getElementById('sound-on-img').classList.remove('d-none');
    document.getElementById('sound-off-img').classList.add('d-none');
}


/**
 * Sets the volume of all game sounds to maximum (1).
 * @function
 * @name allSoundsVolumeOne
 * @returns {void}
 */
function allSoundsVolumeOne() {
    characterJumpSound.volume = 1;
    characterDeadSound.volume = 1;
    characterHurtSound.volume = 1;
    ChickenDeadSound.volume = 1;
    throwBottleSound.volume = 1;
    collectBottleSound.volume = 1;
    bottleSplashSound.volume = 1;
    collectCoinSound.volume = 1;
    endbossHurtSound.volume = 1;
    endbossAttentionSound.volume = 1;
    endbossAttackSound.volume = 1;
    gameBackgroundMusic.volume = 1;
    gameEndbossMusic.volume = 1;
    gameWinSound.volume = 1;
    gameLoseSound.volume = 1;
}

/**
 * Sets the volume of all game sounds to mute (0) after a delay of 500 milliseconds.
 * @function
 * @name setGameSoundsToNull
 * @returns {void}
 */
function setGameSoundsToNull() {
    setTimeout(() => {
        characterJumpSound.volume = 0;
        characterDeadSound.volume = 0;
        characterHurtSound.volume = 0;
        ChickenDeadSound.volume = 0;
        throwBottleSound.volume = 0;
        collectBottleSound.volume = 0;
        bottleSplashSound.volume = 0;
        collectCoinSound.volume = 0;
        endbossHurtSound.volume = 0;
        endbossAttentionSound.volume = 0;
        endbossAttackSound.volume = 0;
        gameBackgroundMusic.volume = 0;
        gameEndbossMusic.volume = 0;
    }, 500);
}