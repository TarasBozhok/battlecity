export default class Sprite {
    constructor (src, spriteLevelMap) {
        this.src = src;
        this.image = new Image;
        this.loadedImg = null;
        this.spriteLevelMap = spriteLevelMap;
    }

    load() {
        return new Promise((resolve) => {
            var that = this;
            this.image.src = this.src;
            this.image.onload = () => {
                //console.log('sprite: onload');
                that.loadedImg = this.image; 
                resolve();
            }
        });
    }
}