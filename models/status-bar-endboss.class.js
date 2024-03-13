/**
 * Represents a status bar for an end boss, extending a drawable object.
 * @class
 * @name StatusBarEndboss
 * @extends DrawableObject
 *
 * @property {string[]} IMAGES_HEALTH - Array of image paths for end boss health status levels.
 * @property {number} x - The horizontal position of the status bar.
 * @property {number} y - The vertical position of the status bar.
 * @property {number} height - The height of the status bar.
 * @property {number} width - The width of the status bar.
 * @property {number} health - The current health level of the end boss.
 *
 * @example
 * const endbossStatusBar = new StatusBarEndboss();
 */
class StatusBarEndboss extends DrawableObject {
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
    ];

    percent = 100;
    x = 565;
    y = 30;
    height = 60;
    width = 250;

    /**
     * Constructor for StatusBarEndboss class.
     *
     * @constructor
     * @memberof StatusBarEndboss
     * @extends DrawableObject
     *
     * Initializes an end boss status bar by loading health images and setting initial health percentage to 100.
     *
     * @example
     * const endbossStatusBar = new StatusBarEndboss();
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);

        this.setPercentage(100);
    }
    /**
     * Sets the health percentage of the end boss and updates the status bar image accordingly.
     *
     * @function
     * @name setPercentage
     * @memberof StatusBarEndboss
     * @instance
     * 
     * @param {number} percent - The new health percentage for the end boss.
     * @example
     * endbossStatusBar.setPercentage(75);
     */
    setPercentage(percent) {
        this.percent = percent;
        let path = this.IMAGES_HEALTH[this.resolveImageIndexHealth()];
        this.img = this.imageCache[path];
    }
}