import { CELL_SIZE, DIRECTION } from './constants.js';
export default class Tank {
    constructor (color, type) {
        type = type < 0 || type > 7 ? 0 : type;
        var modificatorX  = color === 'grey' || color === 'purple' ? 8 * CELL_SIZE : 0;
        var modificatorY = color === 'green' || color === 'purple'?  type + 8 : type;

        this.sprites = {
            up: {
                0: [0 * CELL_SIZE + modificatorX, modificatorY * CELL_SIZE],
                1: [1 * CELL_SIZE + modificatorX, modificatorY * CELL_SIZE ]
            },
            left:  {
                0: [2 * CELL_SIZE + modificatorX, modificatorY * CELL_SIZE],
                1: [3 * CELL_SIZE + modificatorX, modificatorY * CELL_SIZE]
            },
            down:  {
                0: [4 * CELL_SIZE + modificatorX, modificatorY * CELL_SIZE],
                1: [5 * CELL_SIZE + modificatorX, modificatorY * CELL_SIZE]
            },
            right:  {
                0: [6 * CELL_SIZE + modificatorX, modificatorY * CELL_SIZE],
                1: [7 * CELL_SIZE + modificatorX, modificatorY * CELL_SIZE]
            }
        }
        this.spriteCode = this.sprites.up[0];  
        this.direction = DIRECTION.UP;
    }
    position = {
        x: 0,
        y: 0
    }
    animationFrame = 0;
    velocity = 2;
    obstacleHitBox = {};

    updatePosition (activeKeys) {
        var isMoving = false;
        switch (true) {
            case activeKeys.has('ArrowUp'):
                this.position.y -= this.velocity;
                this.direction = DIRECTION.UP;
                isMoving = true;
                break;
            case activeKeys.has('ArrowDown'):
                this.position.y += this.velocity;
                this.direction = DIRECTION.DOWN;
                isMoving = true;
                break;
            case activeKeys.has('ArrowRight'):
                this.position.x += this.velocity;
                this.direction = DIRECTION.RIGHT;
                isMoving = true;
                break;
            case activeKeys.has('ArrowLeft'):
                this.position.x -= this.velocity;
                this.direction = DIRECTION.LEFT;
                isMoving = true;
                break;
        }
        if (isMoving) {
            this.spriteCode = this.sprites[this.direction][this.animationFrame];
            this.animationFrame ^= 1;
        } else {
            this.direction = '';
        } 
    }

    getHitBoxPosition() {
        return {
            left: this.position.x,
            right: this.position.x + CELL_SIZE,
            top: this.position.y,
            bottom: this.position.y + CELL_SIZE
        }
    }
}