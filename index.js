import Level from './src/level.js';
import View from './src/view.js';
import Game from './src/game.js';
import World from './src/world.js';
import Sprite from './src/sprite.js';
import spriteLevelMap from './data/spriteLevelMap.js';
import levels from './data/levels.js';

const canvas = document.querySelector('canvas');
const sprite = new Sprite('./assets/sprite-2x-AI.jpeg', spriteLevelMap);

const currentLevelInd = 0;

const game = new Game({
    world: new World,
    level: new Level(currentLevelInd, levels),
    view: new View(canvas, sprite)
});


//game.init().then(() => game.start());
await game.init();
game.start();

console.log(game);