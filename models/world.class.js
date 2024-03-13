/**
 * Represents the game world containing various game elements and state.
 * @class
 * @name World
 *
 * @property {Character} character - The player character in the game.
 * @property {Endboss} endboss - The end boss in the game.
 * @property {Level} level - The current level of the game.
 * @property {HTMLCanvasElement} canvas - The HTML canvas element for rendering the game.
 * @property {CanvasRenderingContext2D} ctx - The canvas rendering context.
 * @property {Keyboard} keyboard - The keyboard input handler.
 * @property {number} camera_x - The horizontal position of the camera.
 * @property {StatusBarHealth} statusBarHealth - The status bar for player health.
 * @property {StatusBarBottle} statusBarBottle - The status bar for collected bottles.
 * @property {StatusBarCoin} statusBarCoin - The status bar for collected coins.
 * @property {StatusBarEndboss} statusBarEndboss - The status bar for the end boss.
 * @property {ThrowableObject[]} throwableObject - An array of throwable objects in the game.
 * @property {number} collectedBottles - The total number of collected bottles.
 * @property {boolean} endbossNotHitable - Flag indicating whether the end boss is not hittable.
 * @property {boolean} characterNotHitable - Flag indicating whether the player character is not hittable.
 * @property {boolean} bottleCollidedWithEndboss - Flag indicating whether a throwable object has collided with the end boss.
 *
 * @example
 * const gameWorld = new World();
 */
class World {
    character = new Character();
    endboss = new Endboss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    statusBarEndboss = new StatusBarEndboss();
    throwableObject = [];
    collectedBottles = 0;
    endbossNotHitable = false;
    characterNotHitable = false;
    bottleCollidedWithEndboss = false;

    /**
   * Constructor for the World class, initializing the game world with a canvas and keyboard input.
   *
   * @constructor
   * @memberof World
   *
   * @param {HTMLCanvasElement} canvas - The HTML canvas element for rendering the game.
   * @param {Keyboard} keyboard - The keyboard input handler.
   *
   * @example
   * const gameCanvas = document.getElementById('gameCanvas');
   * const gameKeyboard = new Keyboard();
   * const gameWorld = new World(gameCanvas, gameKeyboard);
   */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.runBottles();
    }


    setWorld() {
        this.character.world = this;
    }
    /**
     * Initiates the main game loop, checking collisions and updating game elements at a specified interval.
     *
     * @function
     * @name run
     * @memberof World
     * @instance
     * @private
     *
     * Uses a stoppable interval to continuously check and update game elements such as collisions, attacks, and kills.
     * @example
     * world.run();
     */
    run() {
        setStoppableInterval(() => {
            this.checkCollisionsWithChicken();
            this.checkCollisionsWithEndboss();
            this.checkCollisionsBottle();
            this.checkCollisionsCoin();
            this.killChickenWithBottle();
            this.attackEndboss();
        }, 1000 / 60);
    }

    /**
     * Initiates a loop to check for throwable objects (bottles) at a specified interval.
     *
     * @function
     * @name runBottles
     * @memberof World
     * @instance
     * @private
     *
     * Uses a stoppable interval to continuously check for throwable objects in the game.
     * @example
     * world.runBottles();
     */
    runBottles() {
        setStoppableInterval(() => {
            this.checkThrowObjects();
        }, 200);
    }

    /**
   * Checks collisions between the main character and chickens on the game field.
   * If a collision is detected, either the chicken is killed or the main character takes damage,
   * depending on various conditions.
   *
   * @function
   * @memberof GameModule
   * @name checkCollisionsWithChicken
   * 
   * @throws {Error} Throws an error if this.level.enemies, this.character.isColliding, this.character.isAboveGround,
   *                this.character.isHurt, this.killChicken, this.character.hit, or this.statusBarHealth.setPercentage
   *                are not defined.
   */
    checkCollisionsWithChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && !this.character.isHurt()) {
                    this.killChicken(enemy);
                } else {
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                }
            }
        });
    }

    /**
  * Kills a chicken enemy by adjusting the main character's vertical speed,
  * marking the chicken as dead, and scheduling its removal after a delay.
  *
  * @function
  * @memberof GameModule
  * @name killChicken
  * 
  * @param {Enemy} enemy - The chicken enemy to be killed.
  * 
  * @throws {Error} Throws an error if this.character.speedY, this.chickenIsDead, or this.deleteEnemy
  *                are not defined.
  */
    killChicken(enemy) {
        this.character.speedY = 30;
        this.chickenIsDead(enemy);

        setTimeout(() => {
            this.deleteEnemy(enemy);
        }, 500);
    }

    /**
    * Marks a chicken enemy as dead by setting its energy to zero and playing a sound effect.
    *
    * @function
    * @memberof GameModule
    * @name chickenIsDead
    * 
    * @param {Enemy} enemy - The chicken enemy to be marked as dead.
    * 
    * @throws {Error} Throws an error if enemy.energy or ChickenDeadSound.play are not defined.
    */
    chickenIsDead(enemy) {
        enemy.energy = 0;
        ChickenDeadSound.play();
    }

    /**
  * Deletes a specified enemy from the game by removing it from the list of enemies in the current level.
  * Also triggers a check for killed chickens after removal.
  *
  * @function
  * @memberof GameModule
  * @name deleteEnemy
  * 
  * @param {Enemy} enemy - The enemy to be removed from the game.
  * 
  * @throws {Error} Throws an error if this.level.enemies, this.level.enemies.indexOf, 
  *                this.level.enemies.splice, or checkKilledChicken are not defined.
  */
    deleteEnemy(enemy) {
        let i = this.level.enemies.indexOf(enemy);
        if (i > -1) {
            this.level.enemies.splice(i, 1);
            checkKilledChicken();
        }
    }

    /**
  * Checks collisions between the main character and end bosses in the game.
  * If a collision is detected and the character is not currently invulnerable,
  * the character is hit by the end boss, health is updated, and the character becomes temporarily invulnerable.
  *
  * @function
  * @memberof GameModule
  * @name checkCollisionsWithEndboss
  * 
  * @throws {Error} Throws an error if this.level.endboss, this.character.isColliding,
  *                this.character.hittedByEndboss, this.statusBarHealth.setPercentage, or this.characterInvulnerable
  *                are not defined.
  */
    checkCollisionsWithEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss) && !this.characterNotHitable) {
                this.character.hittedByEndboss();
                this.statusBarHealth.setPercentage(this.character.energy);
                this.characterInvulnerable();
            }
        });
    }

    /**
   * Makes the main character temporarily invulnerable by setting a flag that prevents it from being hit.
   * The invulnerability lasts for a specified duration before the character can be hit again.
   *
   * @function
   * @memberof GameModule
   * @name characterInvulnerable
   * 
   * @throws {Error} Throws an error if this.characterNotHitable or setTimeout are not defined.
   */
    characterInvulnerable() {
        this.characterNotHitable = true;
        setTimeout(() => {
            this.characterNotHitable = false;
        }, 1500);
    }

    /**
  * Initiates an attack on the end boss by checking collisions between throwable objects and the end boss.
  * If a collision is detected and the end boss is currently vulnerable, the end boss is attacked.
  * The status bar for the end boss's energy is then updated.
  *
  * @function
  * @memberof GameModule
  * @name attackEndboss
  * 
  * @throws {Error} Throws an error if this.throwableObject, this.level.endboss, bottle.isColliding,
  *                this.endbossNotHitable, this.bottleCollidedWithEndboss, or this.endbossGotAttacked
  *                are not defined.
  */
    attackEndboss() {
        this.throwableObject.forEach((bottle) => {
            this.level.endboss.forEach((endboss) => {
                if (bottle.isColliding(endboss) && !this.endbossNotHitable) {
                    this.bottleCollidedWithEndboss = true;
                    this.endbossGotAttacked(endboss);
                }
            });
        });
        this.statusBarEndboss.setPercentage(world.level.endboss[0].energy);
    }

    /**
 * Processes an attack on the end boss by invoking the 'hittedByBottle' method on the specified end boss
 * and making the end boss temporarily invulnerable.
 *
 * @function
 * @memberof GameModule
 * @name endbossGotAttacked
 * 
 * @param {Endboss} endboss - The end boss that got attacked.
 * 
 * @throws {Error} Throws an error if endboss.hittedByBottle or this.endbossInvulnerable
 *                are not defined.
 */
    endbossGotAttacked(endboss) {
        endboss.hittedByBottle();
        this.endbossInvulnerable();
    }

    /**
   * Makes the end boss temporarily invulnerable by setting a flag that prevents it from being hit.
   * The invulnerability lasts for a specified duration before the end boss can be hit again.
   *
   * @function
   * @memberof GameModule
   * @name endbossInvulnerable
   * 
   * @throws {Error} Throws an error if this.endbossNotHitable or setTimeout are not defined.
   */
    endbossInvulnerable() {
        this.endbossNotHitable = true;
        setTimeout(() => {
            this.endbossNotHitable = false;
        }, 1500);
    }

    /**
  * Checks if the player input triggers the action of throwing objects (e.g., bottles).
  * If the "D" key is pressed and the player has collected at least one bottle, a bottle is thrown,
  * and the bottle bar is reduced.
  *
  * @function
  * @memberof GameModule
  * @name checkThrowObjects
  * 
  * @throws {Error} Throws an error if this.keyboard.D, this.collectedBottles, this.throwBottle,
  *                or this.reduceBottleBar are not defined.
  */
    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0) {
            this.throwBottle();
            this.reduceBottleBar();
        }
    }

    /**
   * Reduces the number of collected bottles in the bottle bar by one and updates the corresponding status bar.
   *
   * @function
   * @memberof GameModule
   * @name reduceBottleBar
   * 
   * @throws {Error} Throws an error if this.statusBarBottle.collected or this.statusBarBottle.setCollected
   *                are not defined.
   */
    reduceBottleBar() {
        this.statusBarBottle.collected--;
        this.statusBarBottle.setCollected(this.statusBarBottle.collected);
    }

    /**
     * Initiates the action of throwing a bottle. Updates the number of collected bottles,
     * checks for the thrown bottles, and triggers the appropriate bottle throwing animation
     * based on the character's direction.
     *
     * @function
     * @memberof GameModule
     * @name throwBottle
     * 
     * @throws {Error} Throws an error if this.collectedBottles, checkThrowedBottles,
     *                this.character.otherDirection, this.bottleThrowingLeft, or this.bottleThrowingRight
     *                are not defined.
     */
    throwBottle() {
        this.collectedBottles--;
        checkThrowedBottles();
        if (this.character.otherDirection) {
            this.bottleThrowingLeft();
        } else {
            this.bottleThrowingRight();
        }
    }

    /**
     * Initiates the throwing animation for a bottle in the left direction.
     * Creates a new throwable object (e.g., bottle) and adds it to the list of throwable objects.
     *
     * @function
     * @memberof GameModule
     * @name bottleThrowingLeft
     * 
     * @throws {Error} Throws an error if ThrowableObject, this.character.x, this.character.y,
     *                this.character.otherDirection, or this.throwableObject.push are not defined.
     */
    bottleThrowingLeft() {
        let bottle = new ThrowableObject(this.character.x - 20, this.character.y + 100, this.character.otherDirection);
        this.throwableObject.push(bottle);
    }

    /**
     * Initiates the throwing animation for a bottle in the right direction.
     * Creates a new throwable object (e.g., bottle) and adds it to the list of throwable objects.
     *
     * @function
     * @memberof GameModule
     * @name bottleThrowingRight
     * 
     * @throws {Error} Throws an error if ThrowableObject, this.character.x, this.character.y,
     *                this.character.otherDirection, or this.throwableObject.push are not defined.
     */
    bottleThrowingRight() {
        let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 100, this.character.otherDirection);
        this.throwableObject.push(bottle);
    }

    /**
     * Checks collisions between the main character and collectible bottles on the game field.
     * If a collision is detected, plays a collect bottle sound, collects the bottle, and increases the bottle bar.
     *
     * @function
     * @memberof GameModule
     * @name checkCollisionsBottle
     * 
     * @throws {Error} Throws an error if this.level.collectableObjectBottle, this.character.isColliding,
     *                collectBottleSound.play, this.bottleCollected, or this.increaseBottleBar are not defined.
     */
    checkCollisionsBottle() {
        this.level.collectableObjectBottle.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                collectBottleSound.play();
                this.bottleCollected(bottle);
                this.increaseBottleBar();
            }
        });
    }

    /**
    * Processes the collection of a bottle by triggering checks for collected bottles,
    * incrementing the count of collected bottles, and removing the collected bottle from the game field.
    *
    * @function
    * @memberof GameModule
    * @name bottleCollected
    * 
    * @param {CollectableObject} bottle - The collectible bottle that has been collected.
    * 
    * @throws {Error} Throws an error if checkCollectedBottles, this.collectedBottles,
    *                this.level.collectableObjectBottle.indexOf, or this.level.collectableObjectBottle.splice
    *                are not defined.
    */
    bottleCollected(bottle) {
        checkCollectedBottles();
        this.collectedBottles++;
        let i = this.level.collectableObjectBottle.indexOf(bottle);
        this.level.collectableObjectBottle.splice(i, 1);
    }

    /**
    * Increases the number of collected bottles in the bottle bar by one and updates the corresponding status bar.
    *
    * @function
    * @memberof GameModule
    * @name increaseBottleBar
    * 
    * @throws {Error} Throws an error if this.statusBarBottle.collected or this.statusBarBottle.setCollected
    *                are not defined.
    */
    increaseBottleBar() {
        this.statusBarBottle.collected++;
        this.statusBarBottle.setCollected(this.statusBarBottle.collected);
    }

    /**
  * Checks collisions between thrown bottles and chicken enemies.
  * If a collision is detected, triggers the action of killing the chicken with the bottle.
  *
  * @function
  * @memberof GameModule
  * @name killChickenWithBottle
  * 
  * @throws {Error} Throws an error if this.throwableObject, this.level.enemies, bottle.isColliding,
  *                or this.chickenKilledWithBottle are not defined.
  */
    killChickenWithBottle() {
        this.throwableObject.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    this.chickenKilledWithBottle(enemy);
                }
            });
        });
    }

    /**
   * Processes the killing of a chicken enemy with a thrown bottle by setting the enemy's energy to zero,
   * playing a sound effect, and scheduling the removal of the enemy after a delay.
   *
   * @function
   * @memberof GameModule
   * @name chickenKilledWithBottle
   * 
   * @param {Enemy} enemy - The chicken enemy that has been killed with a bottle.
   * 
   * @throws {Error} Throws an error if enemy.energy, ChickenDeadSound.play, or this.deleteEnemy
   *                are not defined.
   */
    chickenKilledWithBottle(enemy) {
        enemy.energy = 0;
        ChickenDeadSound.play();

        setTimeout(() => {
            this.deleteEnemy(enemy);
        }, 500);
    }

    /**
 * Checks collisions between the main character and collectible coins on the game field.
 * If a collision is detected, plays a collect coin sound, increases the coin bar, and processes the collected coin.
 *
 * @function
 * @memberof GameModule
 * @name checkCollisionsCoin
 * 
 * @throws {Error} Throws an error if this.level.collectableObjectCoin, this.character.isColliding,
 *                collectCoinSound.play, this.increaseCoinBar, or this.coinCollected
 *                are not defined.
 */
    checkCollisionsCoin() {
        this.level.collectableObjectCoin.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                collectCoinSound.play();
                this.increaseCoinBar();
                this.coinCollected(coin);
            }
        });
    }

    /**
 * Increases the number of collected coins in the coin bar by one and updates the corresponding status bar.
 *
 * @function
 * @memberof GameModule
 * @name increaseCoinBar
 * 
 * @throws {Error} Throws an error if this.statusBarCoin.collected or this.statusBarCoin.setCollected
 *                are not defined.
 */
    increaseCoinBar() {
        this.statusBarCoin.collected++;
        this.statusBarCoin.setCollected(this.statusBarCoin.collected);
    }

    /**
  * Processes the collection of a coin by triggering checks for collected coins
  * and removing the collected coin from the game field.
  *
  * @function
  * @memberof GameModule
  * @name coinCollected
  * 
  * @param {CollectableObject} coin - The collectible coin that has been collected.
  * 
  * @throws {Error} Throws an error if checkCollectedCoins or this.level.collectableObjectCoin.indexOf
  *                or this.level.collectableObjectCoin.splice are not defined.
  */
    coinCollected(coin) {
        checkCollectedCoins();
        let i = this.level.collectableObjectCoin.indexOf(coin);
        this.level.collectableObjectCoin.splice(i, 1);
    }

    /**
     * Clears the canvas and then draws background objects, status bars, movable objects, and additional frames.
     * This function is responsible for rendering the current state of the game on the canvas.
     *
     * @function
     * @memberof GameModule
     * @name draw
     * 
     * @throws {Error} Throws an error if this.ctx, this.canvas.width, this.canvas.height, this.addBackgroundObjects,
     *                this.addStatusBars, this.addMoveableObjects, or this.drawingFrames are not defined.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addBackgroundObjects();
        this.addStatusBars();
        this.addMoveableObjects();
        this.drawingFrames();
    }

    /**
     * Translates the canvas to adjust for the camera position, adds background objects and clouds to the map,
     * and then translates the canvas back to its original position.
     *
     * @function
     * @memberof GameModule
     * @name addBackgroundObjects
     * 
     * @throws {Error} Throws an error if this.ctx, this.camera_x, this.addObjectsToMap, this.level.backgroundObjects,
     *                or this.level.clouds are not defined.
     */
    addBackgroundObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
    * Adds various status bars, such as health, bottle, coin, and end boss bars, to the game map.
    * The end boss bar is added only if the player has arrived at the end boss.
    *
    * @function
    * @memberof GameModule
    * @name addStatusBars
    * 
    * @throws {Error} Throws an error if this.addToMap, this.statusBarHealth, this.statusBarBottle,
    *                this.statusBarCoin, this.statusBarEndboss, or arrivedEndboss are not defined.
    */
    addStatusBars() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarCoin);
        if (arrivedEndboss === true) {
            this.addToMap(this.statusBarEndboss);
        }
    }

    /**
     * Translates the canvas to adjust for the camera position, adds various moveable objects to the game map,
     * and then translates the canvas back to its original position.
     *
     * @function
     * @memberof GameModule
     * @name addMoveableObjects
     * 
     * @throws {Error} Throws an error if this.ctx, this.camera_x, this.addToMap, this.character, this.level.enemies,
     *                this.level.endboss, this.level.collectableObjectCoin, this.level.collectableObjectBottle,
     *                this.throwableObject, or this.addObjectsToMap are not defined.
     */
    addMoveableObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.collectableObjectCoin);
        this.addObjectsToMap(this.level.collectableObjectBottle);
        this.addObjectsToMap(this.throwableObject);
        this.ctx.translate(-this.camera_x, 0);
    }
    /**
     * Initiates the next frame drawing by scheduling a callback using the requestAnimationFrame method.
     * This function is responsible for creating a loop to continuously update and redraw the game frames.
     *
     * @function
     * @memberof GameModule
     * @name drawingFrames
     * 
     * @throws {Error} Throws an error if requestAnimationFrame or this.draw are not defined.
     */
    drawingFrames() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds an array of objects to the game map by iterating through each object in the array
     * and invoking the addToMap method for each object.
     *
     * @function
     * @memberof GameModule
     * @name addObjectsToMap
     * 
     * @param {Array} objects - An array of objects to be added to the game map.
     * 
     * @throws {Error} Throws an error if this.addToMap is not defined.
     */
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a moveable object to the game map. If the object has a specified direction,
     * flips the image before drawing, and then flips it back if needed.
     *
     * @function
     * @memberof GameModule
     * @name addToMap
     * 
     * @param {MoveableObject} mo - The moveable object to be added to the game map.
     * 
     * @throws {Error} Throws an error if this.flipImage, mo.draw, or this.flipImageBack are not defined.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image of a moveable object horizontally by applying a transformation to the canvas context.
     * Adjusts the object's position accordingly for proper rendering after the flip.
     *
     * @function
     * @memberof GameModule
     * @name flipImage
     * 
     * @param {MoveableObject} mo - The moveable object whose image needs to be flipped.
     * 
     * @throws {Error} Throws an error if this.ctx.save, this.ctx.translate, this.ctx.scale, or mo.x are not defined.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the canvas context after flipping the image of a moveable object back to its original orientation.
     * Adjusts the object's position accordingly for proper rendering after the flip restoration.
     *
     * @function
     * @memberof GameModule
     * @name flipImageBack
     * 
     * @param {MoveableObject} mo - The moveable object whose image has been flipped back.
     * 
     * @throws {Error} Throws an error if mo.x or this.ctx.restore are not defined.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}