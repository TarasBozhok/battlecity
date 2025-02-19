import { CELL_SIZE } from './constants.js';
export default class View {
    constructor (canvas, sprite) {
        this.canvas = canvas;
        this.sprite = sprite;
        this.context = canvas.getContext('2d');
    }

    init() {
        return this.sprite.load();
    }

    update(playerTank, level) {
        this.context.clearRect(0, 0 , this.canvas.width, this.canvas.height);
        this.drawMap(level);
        this.drawPlayerTank(playerTank);



        var tankHitBoxPosition = playerTank.getHitBoxPosition();
        var obstacleLineHitBoxes = level.getObstacleLineHitBoxes(tankHitBoxPosition);
        //console.log('hit boxes length: ', obstacleLineHitBoxes.length);
        this.context.strokeStyle = 'white';
        obstacleLineHitBoxes.map((hitBlock) => {
            //this.context.strokeRect(hitBlock.left, hitBlock.top, CELL_SIZE, CELL_SIZE);
        })
        this.context.strokeStyle = 'yellow';
        this.context.strokeRect(playerTank.obstacleHitBox.left, playerTank.obstacleHitBox.top, (playerTank.obstacleHitBox.right - playerTank.obstacleHitBox.left), (playerTank.obstacleHitBox.bottom - playerTank.obstacleHitBox.top));
    }

    drawPlayerTank(playerTank) {
        //console.log('drawing tank');
        this.context.drawImage(
            this.sprite.loadedImg,
            ...playerTank.spriteCode,
            CELL_SIZE, CELL_SIZE,
            playerTank.position.x, playerTank.position.y,
            CELL_SIZE, CELL_SIZE);
    }

    drawMap({ levelMap }) {
        levelMap.map((horLine, lineIndex) => {
            horLine.map((singleEntry, entryNumber) => {
                if (singleEntry > 0) {
                    this.context.drawImage(
                        this.sprite.loadedImg,
                        ...this.sprite.spriteLevelMap[singleEntry], 
                        CELL_SIZE, CELL_SIZE,
                        entryNumber * CELL_SIZE, lineIndex * CELL_SIZE,
                        CELL_SIZE, CELL_SIZE
                    );
                }
            })
        })
    }
}