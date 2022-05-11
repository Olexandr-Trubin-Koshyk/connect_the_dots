'use strict';
import { GameScene } from "./GameScene";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  dotSize: 140,
  dotColors: [
    0xffff00, 
    0x0000ff, 
    0x00ff00, 
    0xff0000, 
    0xff00ff
  ],
  rows: 6,
  cols: 6,
  scale: {
    mode: Phaser.Scale.CENTER_BOTH,
    width: 2560,
    height: 1440,
  },
  scene: new GameScene(),
};

const game = new Phaser.Game(config);

