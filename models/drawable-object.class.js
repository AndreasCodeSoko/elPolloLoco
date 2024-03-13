/**
 * Represents a drawable object with properties such as image, position, and dimensions.
 * @class
 */
class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 200;
    height = 150;
    width = 100;

    /**
    * Loads an image and sets it as the source for the drawable object.
    * @method
    * @param {string} path - The path or URL of the image to be loaded.
    * @returns {void}
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
   * Draws the drawable object on a canvas rendering context.
   * @method
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   * @returns {void}
   */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
 * Loads an array of images into the image cache of the drawable object.
 * @method
 * @param {string[]} arr - An array of paths or URLs of images to be loaded.
 * @returns {void}
 */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
   * Resolves the image index based on the number of collected objects for a collectible item.
   * @method
   * @returns {number} - The resolved image index based on the number of collected objects.
   */
    resolveImageIndexCollectableObjects() {
        if (this.collected == 0) {
            return 0;
        } else if (this.collected == 1) {
            return 1;
        } else if (this.collected == 2) {
            return 2;
        } else if (this.collected == 3) {
            return 3;
        } else if (this.collected == 4) {
            return 4;
        } else {
            return 5;
        }
    }

    /**
  * Resolves the image index based on the health percentage.
  * @method
  * @returns {number} - The resolved image index based on the health percentage.
  */
    resolveImageIndexHealth() {
        if (this.percent == 100) {
            return 5;
        } else if (this.percent > 80) {
            return 4;
        } else if (this.percent > 60) {
            return 3;
        } else if (this.percent > 40) {
            return 2;
        } else if (this.percent > 20) {
            return 1;
        } else if (this.percent >= 0) {
            return 0;
        }
    }
}