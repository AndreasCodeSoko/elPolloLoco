/**
 * Represents a game level with enemies, an end boss, clouds, background objects, and collectable objects.
 * @class
 */
 class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    collectableObjectCoin;
    collectableObjectBottle;
    level_end_x = 3200;

    constructor(enemies, endboss, clouds, backgroundObjects, collectableObjectCoin, collectableObjectBottle) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableObjectCoin = collectableObjectCoin;
        this.collectableObjectBottle = collectableObjectBottle;
    }
}