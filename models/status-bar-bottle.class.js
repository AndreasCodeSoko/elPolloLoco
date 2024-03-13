/**
 * Represents a status bar for bottles, extending a drawable object.
 * @class
 * @name StatusBarBottle
 * @extends DrawableObject
 *
 * @property {string[]} IMAGES_BOTTLE - Array of image paths for bottle status levels.
 * @property {number} x - The horizontal position of the status bar.
 * @property {number} y - The vertical position of the status bar.
 * @property {number} height - The height of the status bar.
 * @property {number} width - The width of the status bar.
 * @property {number} collected - The current number of collected bottles.
 *
 * @example
 * const bottleStatusBar = new StatusBarBottle();
 */
class StatusBarBottle extends DrawableObject {
    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    x = 0;
    y = 55;
    height = 60;
    width = 250;
    collected = 0;


    /**
     * Constructor for StatusBarBottle class.
     *
     * @constructor
     * @memberof StatusBarBottle
     * @extends DrawableObject
     *
     * Initializes a bottle status bar by loading images and setting initial collected value to 0.
     *
     * @example
     * const bottleStatusBar = new StatusBarBottle();
     */
    constructor() {
        super();

        this.loadImages(this.IMAGES_BOTTLE);

        this.setCollected(0);
    }

    /**
   * Sets the number of collected bottles and updates the status bar image accordingly.
   *
   * @function
   * @name setCollected
   * @memberof StatusBarBottle
   * @instance
   * 
   * @param {number} collected - The new value for the collected bottles.
   * @example
   * bottleStatusBar.setCollected(3);
   */
    setCollected(collected) {
        this.collected = collected;
        let path = this.IMAGES_BOTTLE[this.resolveImageIndexCollectableObjects()];
        this.img = this.imageCache[path];
    }
}