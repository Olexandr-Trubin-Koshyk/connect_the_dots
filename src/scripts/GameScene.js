/* eslint-disable import/prefer-default-export */
import Phaser from 'phaser';
// eslint-disable-next-line import/no-cycle
import { config } from './main';

const BG_URL = 'https://img3.akspic.ru/crops/6/7/6/5/6/165676/165676-opticheskij_obman-abstraktnoe_iskusstvo-illyuziya-sinij-purpur-2560x1440.jpg';
const DOT_URL = 'https://i.ibb.co/n0Swyq4/dot.png';

export class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('bg', BG_URL);
    this.load.image('dot', DOT_URL);
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
    this.dotsGroup.y = (this.sys.game.config.height - config.dotSize * config.rows) / 2;

    const dotsMask = this.add.graphics(this.dotsGroup.x, this.dotsGroup.y);
    dotsMask.fillStyle(0xffffff, 0.5);
    dotsMask.lineStyle(8, 0x000000, 1.0);
    dotsMask
      .fillRect(
        this.dotsGroup.x,
        this.dotsGroup.y,
        config.dotSize * config.cols,
        config.dotSize * config.rows,
      );
    dotsMask
      .strokeRect(
        this.dotsGroup.x,
        this.dotsGroup.y,
        config.dotSize * config.cols,
        config.dotSize * config.rows,
      );
    this.dotsGroup.mask = dotsMask;

    for (let row = 0; row < config.rows; row += 1) {
      for (let col = 0; col < config.cols; col += 1) {
        this.createDot(row, col);
      }
    }
  }

  create() {
    this.createBackground();
    this.createDotsField();
  }
}
