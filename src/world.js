import Tank from './tank.js';
import { CELL_SIZE, DIRECTION } from './constants.js';

export default class World {
    grid = [];
    playerTank = new Tank('grey', 0);
    enemyTanks = [];
    level = null;

    update(activeKeys, level) {
        this.playerTank.updatePosition(activeKeys);
        this.limitTankPositionToMap(level);
        this.limitTankCollision(level, this.playerTank);
    }

    limitTankPositionToMap({ outerLimits }) {
        if (this.playerTank.position.x < outerLimits.minX) {
            this.playerTank.position.x = 0;
        } 
        if (this.playerTank.position.x > outerLimits.maxX) {
            this.playerTank.position.x = outerLimits.maxX;
        }
        if (this.playerTank.position.y < outerLimits.minY) {
            this.playerTank.position.y = 0;
        }
        if (this.playerTank.position.y > outerLimits.maxY) {
            this.playerTank.position.y = outerLimits.maxY;
        }
    }

    limitTankCollision(level, playerTank) {
        var tankHitBoxPosition = playerTank.getHitBoxPosition();
        var obstacleLineHitBoxes = level.getObstacleLineHitBoxes(tankHitBoxPosition);
        playerTank.obstacleHitBox = {};

        if (playerTank.direction === DIRECTION.UP) {
            var obstacleHitBox = obstacleLineHitBoxes.find((elHitBox) => {
                var xCond = (
                    (tankHitBoxPosition.right > elHitBox.left && tankHitBoxPosition.right <= elHitBox.right)
                    || (tankHitBoxPosition.left >= elHitBox.left && tankHitBoxPosition.left < elHitBox.right)
                );
                var yCond = tankHitBoxPosition.top <= elHitBox.bottom && tankHitBoxPosition.bottom > elHitBox.bottom;
    
                return xCond && yCond;
            })
            
            if (obstacleHitBox) {
                playerTank.position.y = tankHitBoxPosition.top < obstacleHitBox.bottom ? obstacleHitBox.bottom : playerTank.position.y;
                if (obstacleLineHitBoxes.length >0) {
                    playerTank.position.x -= 1;
                }

                playerTank.obstacleHitBox = obstacleHitBox; //logging
            }
        }
        if (playerTank.direction === DIRECTION.DOWN) {
            var obstacleHitBox = obstacleLineHitBoxes.find((elHitBox) => {
                var xCond = (
                    (tankHitBoxPosition.left < elHitBox.left && tankHitBoxPosition.right > elHitBox.left)
                    || (tankHitBoxPosition.left >= elHitBox.left && tankHitBoxPosition.left < elHitBox.right)
                );
                var yCond = elHitBox.top <= tankHitBoxPosition.bottom && tankHitBoxPosition.top < elHitBox.top;
    
                return xCond && yCond;
            })
            
            if (obstacleHitBox) {
                playerTank.position.y =  tankHitBoxPosition.bottom > obstacleHitBox.top ? obstacleHitBox.top - CELL_SIZE : playerTank.position.y;
                playerTank.obstacleHitBox = obstacleHitBox; //logging
            }
        }
        if (playerTank.direction === DIRECTION.LEFT) {
            var obstacleHitBox = obstacleLineHitBoxes.find((elHitBox) => {
                var yCond = (
                    (tankHitBoxPosition.top < elHitBox.top && tankHitBoxPosition.bottom > elHitBox.top)
                    || (tankHitBoxPosition.bottom == elHitBox.bottom && tankHitBoxPosition.top < elHitBox.bottom)
                );
                var xCond = tankHitBoxPosition.left <= elHitBox.right && tankHitBoxPosition.right > elHitBox.right;
    
                return yCond && xCond;
            })
            
            if (obstacleHitBox) {
                playerTank.position.x = tankHitBoxPosition.left < obstacleHitBox.right ? obstacleHitBox.right : playerTank.position.x;
                playerTank.obstacleHitBox = obstacleHitBox; //logging
            }
        }
        if (playerTank.direction === DIRECTION.RIGHT) {
            var obstacleHitBox = obstacleLineHitBoxes.find((elHitBox) => {
                var yCond = (
                    (tankHitBoxPosition.bottom >= elHitBox.bottom && tankHitBoxPosition.top < elHitBox.bottom)
                    || (tankHitBoxPosition.top <= elHitBox.top && tankHitBoxPosition.bottom > elHitBox.top)
                );

                var xCond = tankHitBoxPosition.right >= elHitBox.left && tankHitBoxPosition.left < elHitBox.left;

                return yCond && xCond; 
            })
            
            if (obstacleHitBox) {
                playerTank.position.x = tankHitBoxPosition.right > obstacleHitBox.left ? obstacleHitBox.left - CELL_SIZE : playerTank.position.x;
                playerTank.obstacleHitBox = obstacleHitBox; //logging
            }
        }
    }
}