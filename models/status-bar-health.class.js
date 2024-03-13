/**
 * Represents a status bar for general health, extending a drawable object.
 * @class
 * @name StatusBarHealth
 * @extends DrawableObject
 *
 * @property {string[]} IMAGES_HEALTH - Array of image paths for health status levels.
 * @property {number} x - The horizontal position of the status bar.
 * @property {number} y - The vertical position of the status bar.
 * @property {number} height - The height of the status bar.
 * @property {number} width - The width of the status bar.
 * @property {number} health - The current health level.
 *
 * @example
 * const healthStatusBar = new StatusBarHealth();
 */
class StatusBarHealth extends DrawableObject {
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    percent = 100;
    x = 0;
    y = 0;
    height = 60;
    width = 250;

    /**
 * Constructor for StatusBarHealth class.
 *
 * @constructor
 * @memberof StatusBarHealth
 * @extends DrawableObject
 *
 * Initializes a health status bar by loading health images and setting initial health percentage to 100.
 *
 * @example
 * const healthStatusBar = new StatusBarHealth();
 */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);

        this.setPercentage(100);
    }

    /**
   * Sets the health percentage and updates the status bar image accordingly.
   *
   * @function
   * @name setPercentage
   * @memberof StatusBarHealth
   * @instance
   * 
   * @param {number} percent - The new health percentage.
   * @example
   * healthStatusBar.setPercentage(75);
   */
    setPercentage(percent) {
        this.percent = percent;
        let path = this.IMAGES_HEALTH[this.resolveImageIndexHealth()];
        this.img = this.imageCache[path];
    }
}