import { CELL_SIZE, COLLISION_BLOCKS } from './constants.js'

export default class Level {
    constructor (currentLevelInd, levels) {
        this.currentLevelInd = currentLevelInd;
        this.levelMap = levels[currentLevelInd];
        this.outerLimits = {
            minX: 0,
            minY: 0,
            maxX: this.levelMap[0].length * CELL_SIZE - CELL_SIZE,
            maxY: this.levelMap.length * CELL_SIZE - CELL_SIZE
        }
    }

    getObstacleLineHitBoxes (tankHitBoxPosition) {
        var obstacleLineHitBoxes = [];

        this.levelMap.forEach((row, rowInd) => {
            row.forEach((blockEl, blockElementInd) => {
                if (COLLISION_BLOCKS.includes(blockEl)) {
                    var elHitBox = {
                        left: blockElementInd * CELL_SIZE,
                        right: blockElementInd * CELL_SIZE + CELL_SIZE,
                        bottom: rowInd * CELL_SIZE + CELL_SIZE,
                        top: rowInd * CELL_SIZE
                    }
                    if (blockEl === 10 || blockEl === 5) {
                        // decrease Y half cell - half bottom black
                        elHitBox.bottom -= CELL_SIZE / 2;
                    }
                    if (blockEl === 6 || blockEl === 7) {
                        // decrease x half cell - half top black
                        elHitBox.top -= CELL_SIZE / 2;
                    }
                    if (blockEl === 3) {
                        // decrease Y half cell - half top black
                        elHitBox.top += CELL_SIZE / 2;
                    }
                    if (blockEl === 2) {
                        // decrease X half cell - left half black
                        elHitBox.left += CELL_SIZE / 2;
                    }
                    if (blockEl === 4) {
                        // decrease X half cell - right half black
                        elHitBox.right -= CELL_SIZE / 2;
                    }
                    if (this.checkHitBoxIsAround(tankHitBoxPosition, elHitBox)) {
                        obstacleLineHitBoxes.push(elHitBox);
                    }
                }

            })
        });

        return obstacleLineHitBoxes;
    }

    checkHitBoxIsAround(tankHitBoxPosition, elHitBox) {
        var isAround = false;

        if (
            elHitBox.bottom >= tankHitBoxPosition.top - CELL_SIZE &&
            elHitBox.bottom <= tankHitBoxPosition.bottom + CELL_SIZE &&
            elHitBox.right >= tankHitBoxPosition.left - CELL_SIZE &&
            elHitBox.right <= tankHitBoxPosition.right + CELL_SIZE
        ) {
            isAround = true;
        }

        return isAround;
    }
}