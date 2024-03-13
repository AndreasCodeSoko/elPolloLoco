let canvas;
let world;
let keyboard = new Keyboard();
let arrivedEndboss = false;
let intervalIDs = [];

let bottlesCollectedInMenu = 0;
let bottlesThrowedInMenu = 0;
let coinsCollectedInMenu = 0;
let killedChickenInMenu = 0;

canvas = document.getElementById('canvas');

/**
 * Initiates the start of the game, transitioning between screens, setting up game elements,
 * and initializing the game world after a delay of 1000 milliseconds.
 * @function
 * @name startGame
 * @returns {void}
 */
function startGame() {
    switchContainer('start-screen-container', 'loading-animation-container');
    setTimeout(() => {
        switchContainer('loading-animation-container', 'canvas-container');
        setEndgameStatisticToNull();
        gameSounds();
        initLevel();
        mobileButtons();
        canvas = document.getElementById('canvas');
        world = new World(canvas, keyboard);
    }, 1000);
}

/**
 * Sets up a stoppable interval by creating a new interval and adding its ID to the intervalIDs array.
 * @function
 * @name setStoppableInterval
 * @param {Function} fn - The function to be executed at each interval.
 * @param {number} time - The time interval, in milliseconds, at which the function will be called.
 * @returns {void}
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIDs.push(id);
}

/**
 * Stops the game by clearing all intervals associated with the game.
 * @function
 * @name stopGame
 * @returns {void}
 */
function stopGame() {
    intervalIDs.forEach(clearInterval);
}

/**
 * Switches between two containers by hiding one (id1) and displaying the other (id2).
 * @function
 * @name switchContainer
 * @param {string} id1 - The ID of the container to hide.
 * @param {string} id2 - The ID of the container to display.
 * @returns {void}
 */
function switchContainer(id1, id2) {
    document.getElementById(id1).classList.add('d-none');
    document.getElementById(id2).classList.remove('d-none');
}

/**
 * Resets endgame statistics to zero, including collected bottles, thrown bottles,
 * collected coins, and killed chickens in the menu.
 * @function
 * @name setEndgameStatisticToNull
 * @returns {void}
 */
function setEndgameStatisticToNull() {
    bottlesCollectedInMenu = 0;
    bottlesThrowedInMenu = 0;
    coinsCollectedInMenu = 0;
    killedChickenInMenu = 0;
}

/**
 * Increments the count of collected bottles in the menu.
 * @function
 * @name checkCollectedBottles
 * @returns {void}
 */
function checkCollectedBottles() {
    bottlesCollectedInMenu++;
}

/**
 * Increments the count of thrown bottles in the menu.
 * @function
 * @name checkThrowedBottles
 * @returns {void}
 */
function checkThrowedBottles() {
    bottlesThrowedInMenu++;
}

/**
 * Increments the count of collected coins in the menu.
 * @function
 * @name checkCollectedCoins
 * @returns {void}
 */
function checkCollectedCoins() {
    coinsCollectedInMenu++;
}

/**
 * Increments the count of killed chickens in the menu.
 * @function
 * @name checkKilledChicken
 * @returns {void}
 */
function checkKilledChicken() {
    killedChickenInMenu++;
}

/**
 * Updates the specified HTML elements with the game statistics values.
 * @function
 * @name showGameStatistic
 * @param {string} id1 - The ID of the HTML element to display the collected bottles count.
 * @param {string} id2 - The ID of the HTML element to display the thrown bottles count.
 * @param {string} id3 - The ID of the HTML element to display the collected coins count.
 * @param {string} id4 - The ID of the HTML element to display the killed chickens count.
 * @returns {void}
 */
function showGameStatistic(id1, id2, id3, id4) {
    document.getElementById(id1).innerHTML = bottlesCollectedInMenu;
    document.getElementById(id2).innerHTML = bottlesThrowedInMenu;
    document.getElementById(id3).innerHTML = coinsCollectedInMenu;
    document.getElementById(id4).innerHTML = killedChickenInMenu;
}

/**
 * Handles the game loss by stopping the background music and displaying the game lost container.
 * @function
 * @name gameLost
 * @returns {void}
 */
function gameLost() {
    stopBackgroundMusic();
    showGameLostContainer();
}

/**
 * Pauses the background music and endboss music, stopping the playback.
 * @function
 * @name stopBackgroundMusic
 * @returns {void}
 */
function stopBackgroundMusic() {
    gameBackgroundMusic.pause();
    gameEndbossMusic.pause();
}

/**
 * Displays the game lost container after a delay of 500 milliseconds, playing the game lose sound.
 * Also shows the in-game statistics in the container.
 * @function
 * @name showGameLostContainer
 * @returns {void}
 */
function showGameLostContainer() {
    setTimeout(() => {
        gameLoseSound.play();
        showGameStatistic('collected-bottles-ingame', 'throwed-bottles-ingame', 'collected-coins-ingame', 'killed-chicken-ingame');
        document.getElementById('you-lost-container').classList.remove('d-none');
        document.getElementById('canvas-container').classList.add('d-none');
    }, 500);
}

/**
 * Handles the game victory by stopping the background music and displaying the game win container.
 * @function
 * @name gameWon
 * @returns {void}
 */
function gameWon() {
    stopBackgroundMusic();
    showGameWinContainer();
}

/**
 * Displays the game win container after a delay of 1200 milliseconds, showing the in-game statistics.
 * @function
 * @name showGameWinContainer
 * @returns {void}
 */
function showGameWinContainer() {
    setTimeout(() => {
        showGameStatistic('collected-bottles-ingame-win', 'throwed-bottles-ingame-win', 'collected-coins-ingame-win', 'killed-chicken-ingame-win');
        document.getElementById('you-win-container').classList.remove('d-none');
        document.getElementById('canvas-container').classList.add('d-none');
    }, 1200);
}

/**
 * Opens a text container by removing the 'd-none' class from one container and adding it to another.
 * @function
 * @name openTextContainer
 * @param {string} id1 - The ID of the text container to open.
 * @param {string} id2 - The ID of the text container to hide.
 * @returns {void}
 */
function openTextContainer(id1, id2) {
    document.getElementById(id1).classList.remove('d-none');
    document.getElementById(id2).classList.add('d-none');
}

/**
 * Closes a text container by adding the 'd-none' class to one container and removing it from another.
 * @function
 * @name closeTextContainer
 * @param {string} id1 - The ID of the text container to close.
 * @param {string} id2 - The ID of the text container to display.
 * @returns {void}
 */
function closeTextContainer(id1, id2) {
    document.getElementById(id1).classList.add('d-none');
    document.getElementById(id2).classList.remove('d-none');
}

/**
 * Navigates to the main menu by adding the 'd-none' class to one container and removing it from another.
 * @function
 * @name goToMainMenu
 * @param {string} id1 - The ID of the current container to hide.
 * @param {string} id2 - The ID of the main menu container to display.
 * @returns {void}
 */
function goToMainMenu(id1, id2) {
    document.getElementById(id1).classList.add('d-none');
    document.getElementById(id2).classList.remove('d-none');
}

/**
 * Restarts the game by hiding a specified container and initiating the game start.
 * @function
 * @name restartGame
 * @param {string} id - The ID of the container to hide before restarting the game.
 * @returns {void}
 */
function restartGame(id) {
    document.getElementById(id).classList.add('d-none');
    startGame();
}

/**
 * Event listener for keydown events to handle keyboard input for game controls.
 * @function
 * @name handleKeyDown
 * @param {KeyboardEvent} e - The keyboard event.
 * @returns {void}
 */
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

/**
 * Event listener for keyup events to handle keyboard input for game controls.
 * @function
 * @name handleKeyUp
 * @param {KeyboardEvent} e - The keyboard event.
 * @returns {void}
 */
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});



/**
 * Adds touch event listeners to a specified HTML element to handle touch input for game controls.
 * @function
 * @name addTouchListeners
 * @param {string} elementId - The ID of the HTML element to which touch listeners are added.
 * @param {string} key - The keyboard key corresponding to the touch control.
 * @returns {void}
 */
function addTouchListeners(elementId, key) {
    const element = document.getElementById(elementId);
    element.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard[key] = true;
    });
    element.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard[key] = false;
    });
}

/**
 * Configures touch listeners for mobile controls, associating specific buttons with corresponding keyboard keys.
 * @function
 * @name mobileButtons
 * @returns {void}
 */
function mobileButtons() {
    addTouchListeners('canvas', 'LEFT');
    addTouchListeners('btn-left', 'LEFT');
    addTouchListeners('btn-right', 'RIGHT');
    addTouchListeners('btn-jump', 'SPACE');
    addTouchListeners('btn-throw', 'D');
}

/**
 * Toggles fullscreen mode for the game canvas using the Fullscreen API.
 * @function
 * @name toggleFullscreen
 * @returns {void}
 */
function toggleFullscreen() {
    const canvas = document.getElementById('canvas');

    if (!document.fullscreenElement) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else if (canvas.mozRequestFullScreen) {
            canvas.mozRequestFullScreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        } else if (canvas.msRequestFullscreen) {
            canvas.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

/**
 * Adds the 'fullscreen' class to specified HTML elements, ensuring they fill the entire screen.
 * @function
 * @name addClassesToElements
 * @returns {void}
 */
function addClassesToElements() {
    var elements = [
        'start-screen-container',
        'loading-animation-container',
        'story-container',
        'controls-container',
        'you-lost-container',
        'hints-container',
        'you-win-container',
        'canvas-container',
        'canvas'
    ];

    elements.forEach(function (elementId) {
        document.getElementById(elementId).classList.add('fullscreen');
    });
}

/**
 * Enters fullscreen mode for a specified HTML element using the appropriate Fullscreen API method.
 * @function
 * @name enterFullscreen
 * @param {HTMLElement} element - The HTML element for which to enable fullscreen mode.
 * @returns {void}
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
 * Removes the 'fullscreen' class from specified HTML elements, reverting them to their original size.
 * @function
 * @name removeClassesFromElements
 * @returns {void}
 */
function removeClassesFromElements() {
    const elementsToRemove = [
        'start-screen-container',
        'loading-animation-container',
        'story-container',
        'controls-container',
        'you-lost-container',
        'hints-container',
        'you-win-container',
        'canvas-container',
        'canvas'
    ];

    elementsToRemove.forEach(function (elementId) {
        document.getElementById(elementId).classList.remove('fullscreen');
    });
}

/**
 * Modifies specified class on multiple buttons.
 * @function
 * @name modifyClassesOnButtons
 * @param {string} action - The action to perform on the classList ('add', 'remove', or 'toggle').
 * @param {Array<string>} buttonIds - Array of button IDs to modify.
 * @param {string} className - The class name to be added, removed, or toggled.
 * @returns {void}
 */
function modifyClassesOnButtons(action, buttonIds, className) {
    buttonIds.forEach(function (buttonId) {
        document.getElementById(buttonId).classList[action](className);
    });
}

/**
 * Removes the 'fullscreen' class from specified HTML elements and resets button styles.
 * @function
 * @name removeClassesFromAllElements
 * @returns {void}
 */
function removeClassesFromAllElements() {
    removeClassesFromElements();
    modifyClassesOnButtons('remove', [
        'you-lost-button-1',
        'you-lost-button-3',
        'you-win-button-1',
        'you-win-button-2',
        'start-game-button',
        'open-story-button',
        'open-controls-button'
    ], 'button-style-fullscreen-main-menu');

    document.getElementById('enter-fullscreen-img').classList.remove('d-none');
    document.getElementById('disable-fullscreen-img').classList.add('d-none');
    document.getElementById('loading-animation-id').classList.remove('loading-animation-fullscreen');
    document.getElementById('loading-animation-id').classList.add('loading-animation');
}

/**
 * Requests fullscreen mode specifically for the game canvas using the appropriate Fullscreen API method.
 * @function
 * @name goToFullscreen
 * @returns {void}
 */
function goToFullscreen() {
    const canvas = document.getElementById('canvas');

    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (canvas.mozRequestFullScreen) {
        canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) {
        canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) {
        canvas.msRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode using the appropriate Fullscreen API method and adjusts related button visibility.
 * @function
 * @name goOutFromFullscreen
 * @returns {void}
 */
function goOutFromFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }

    enterFullscreenImg.classList.remove('d-none');
    disableFullscreenImg.classList.add('d-none');
}

/**
 * Exits fullscreen mode using the appropriate Fullscreen API method.
 * @function
 * @name exitFullscreen
 * @returns {void}
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

