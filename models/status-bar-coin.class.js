/**
 * Represents a status bar for coins, extending a drawable object.
 * @class
 * @name StatusBarCoin
 * @extends DrawableObject
 *
 * @property {string[]} IMAGES_COIN - Array of image paths for coin status levels.
 * @property {number} x - The horizontal position of the status bar.
 * @property {number} y - The vertical position of the status bar.
 * @property {number} height - The height of the status bar.
 * @property {number} width - The width of the status bar.
 * @property {number} collected - The current number of collected coins.
 *
 * @example
 * const coinStatusBar = new StatusBarCoin();
 */
class StatusBarCoin extends DrawableObject {
    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    x = 0;
    y = 110;
    height = 60;
    width = 250;
    collected = 0;

    /**
     * Constructor for StatusBarCoin class.
     *
     * @constructor
     * @memberof StatusBarCoin
     * @extends DrawableObject
     *
     * Initializes a coin status bar by loading images and setting initial collected value to 0.
     *
     * @example
     * const coinStatusBar = new StatusBarCoin();
     */
    constructor() {
        super();

        this.loadImages(this.IMAGES_COIN);

        this.setCollected(0);
    }

    /**
     * Sets the number of collected coins and updates the status bar image accordingly.
     *
     * @function
     * @name setCollected
     * @memberof StatusBarCoin
     * @instance
     * 
     * @param {number} collected - The new value for the collected coins.
     * @example
     * coinStatusBar.setCollected(5);
     */
    setCollected(collected) {
        this.collected = collected;
        let path = this.IMAGES_COIN[this.resolveImageIndexCollectableObjects()];
        this.img = this.imageCache[path];
    }
}