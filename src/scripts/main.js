import Phaser from 'phaser';
// eslint-disable-next-line import/no-cycle
import { GameScene } from './GameScene';

// eslint-disable-next-line import/prefer-default-export
export const config = {};

if (GameScene) {
  // eslint-disable-next-line import/prefer-default-export
  config.type = Phaser.AUTO;
  config.width = 800;
  config.height = 600;
  config.dotSize = 140;
  config.dotColors = [
    0xffff00,
    0x0000ff,
    0x00ff00,
    0xff0000,
    0xff00ff,
  ];
  config.rows = 6;
  config.cols = 6;
  config.scale = {
    mode: Phaser.Scale.CENTER_BOTH,
    width: 2560,
    height: 1440,
  };
  config.scene = new GameScene();

  // eslint-disable-next-line no-unused-vars
  const game = new Phaser.Game(config);
}
