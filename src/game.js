import { CELL_SIZE } from "./constants.js";

export default class Game {
    constructor ({ view, world, level }) {
        this.level = level;
        this.view = view;
        this.world = world;

        this.activeKeys = new Set;

        //this.loop = this.loop.bind(this);
    }

    init() {
        var initPromise = this.view.init();

        document.addEventListener('keydown', ({ code }) => {
            switch (code) {
                case 'ArrowUp':
                case 'ArrowRight':
                case 'ArrowDown':
                case 'ArrowLeft':
                case 'Space':
                case 'Enter':
                    this.activeKeys.add(code);
            }
        })

        document.addEventListener('keyup', ({ code }) => {
            switch (code) {
                case 'ArrowUp':
                case 'ArrowRight':
                case 'ArrowDown':
                case 'ArrowLeft':
                case 'Space':
                case 'Enter':
                    this.activeKeys.delete(code);
            }
        })

        return initPromise;
    }

    start () {
        requestAnimationFrame(this.loop);
    }
    
    loop = () => { // bind this
        this.world.update(this.activeKeys, this.level);
        this.view.update(this.world.playerTank, this.level);
        requestAnimationFrame(this.loop);
    }
}