'use strict';

export class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('bg', 'assets/sprites/background.jpg');
    this.load.image('dot', 'assets/sprites/dot.png');
  }

  createBackground() {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
  }

  createDot(row, col) {
    const positionX = this.dotsGroup.x + (col * config.dotSize);
    const positionY = this.dotsGroup.y + (row * config.dotSize);
    const dot = this.add.sprite(positionX, positionY, 'dot').setOrigin(0, 0);
    dot.tint = Phaser.Utils.Array.GetRandom(config.dotColors);
  }

  createDotsField() {
    this.dots = [];
    this.dotsGroup = this.add.group();
    this.dotsGroup.x = (this.sys.game.config.width - config.dotSize * config.cols) / 2;
    this.dotsGroup.y = (this.sys.game.config.height - config.dotSize * config.rows) / 2;;

    const dotsMask = this.add.graphics(this.dotsGroup.x, this.dotsGroup.y);
    dotsMask.fillStyle(0xffffff, 0.5);
    dotsMask.lineStyle(8, 0x000000, 1.0);
    dotsMask.fillRect(this.dotsGroup.x, this.dotsGroup.y, config.dotSize * config.cols, config.dotSize * config.rows);
    dotsMask.strokeRect(this.dotsGroup.x, this.dotsGroup.y, config.dotSize * config.cols, config.dotSize * config.rows);
    this.dotsGroup.mask = dotsMask;

    for (let row = 0; row < config.rows; row++) {
      for (let col = 0; col < config.cols; col++) {
        this.createDot(row, col);
      }
    }
  }

  create() {
    this.createBackground();
    this.createDotsField();
  }
}


