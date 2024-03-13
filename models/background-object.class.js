
/**
 * Represents a background object that extends the MovableObject class.
 * @extends {MovableObject}
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
        * Creates a new BackgroundObject.
        * @param {string} imagePath - The path to the image for the background object.
        * @param {number} x - The initial x-coordinate of the background object.
        */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}