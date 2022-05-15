/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import Phaser from 'phaser';
import { Dot } from './Dot';
import { config } from './main';

const BG_URL = 'https://img3.akspic.ru/crops/6/7/6/5/6/165676/165676-opticheskij_obman-abstraktnoe_iskusstvo-illyuziya-sinij-purpur-2560x1440.jpg';
const DOT_URL = 'https://i.ibb.co/n0Swyq4/dot.png';

export class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');

    this.selectedDot = null;
    this.selectedDots = [];
    this.lines = [];
  }

  preload() {
    this.load.image('bg', BG_URL);
    this.load.image('dot', DOT_URL);
  }

  createBackground() {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
  }

  createDots() {
    this.dots = [];
    const positions = this.getDotsPositions();

    for (const position of positions) {
      const dotColor = Phaser.Utils.Array.GetRandom(config.dotColors);

      this.dots.push(new Dot(this, dotColor, position));
    }

    this.input.on('gameobjectdown', this.onDotSelected, this);
    this.input.on('gameobjectmove', this.onChainDots, this);
    this.input.on('gameobjectup', this.onDotsRemove, this);
  }

  createDotsField() {
    this.dotsField = this.add.group();
    this.dotsField.x = (this.sys.game.config.width - config.dotSize * config.cols) / 2;
    this.dotsField.y = (this.sys.game.config.height - config.dotSize * config.rows) / 2;

    const dotsField = this.add.graphics(this.dotsField.x, this.dotsField.y);
    dotsField.fillStyle(0xffffff, 0.5);
    dotsField.lineStyle(8, 0x000000, 1.0);

    dotsField
      .fillRect(
        this.dotsField.x,
        this.dotsField.y,
        config.dotSize * config.cols,
        config.dotSize * config.rows,
      );

    dotsField
      .strokeRect(
        this.dotsField.x,
        this.dotsField.y,
        config.dotSize * config.cols,
        config.dotSize * config.rows,
      );

    this.dotsField.mask = dotsField;
  }

  createText() {
    this.pointsText = this.add.text((this.sys.game.config.width - 300), 50, '', {
      font: '40px Helvetica',
      fill: '#fff',
    });
  }

  createPointCounter() {
    this.pointCounter = 0;

    this.pointsText.setText(`Points: ${this.pointCounter}`);
  }

  onDotSelected(pointer, dot) {
    this.selectedDot = dot;
    this.selectedDots = [...this.selectedDots, this.selectedDot];
    console.log(this.selectedDot);
  }

  onChainDots(pointer, dot) {
    this.equalDot = dot;

    if (this.selectedDot.color === this.equalDot.color) {
      if (
        this.selectedDot.position.x === this.equalDot.position.x 
        && this.selectedDot.position.y !== this.equalDot.position.y
      ) {
        this.lines.push(this.selectedDot
          .pickDot(true, 'vertical', this.equalDot.position.y - this.selectedDot.position.y));
          this.selectedDot = this.equalDot;
          this.selectedDots = [...this.selectedDots, this.equalDot];
      }
      
      if (
        this.selectedDot.position.y === this.equalDot.position.y
        && this.selectedDot.position.x !== this.equalDot.position.x
      ) {
        this.lines.push(this.selectedDot
          .pickDot(true, 'horizontal', this.equalDot.position.x - this.selectedDot.position.x));
          this.selectedDot = this.equalDot;
          this.selectedDots = [...this.selectedDots, this.equalDot];
      }
    }
  }

  onDotsRemove() {
    console.log(this.selectedDots.length);
    if (this.selectedDots.length > 1) {
      for (const dot of this.selectedDots) {
        dot.destroy();
      }

      this.selectedDots.length = 0;
  
      for (const line of this.lines) {
        line.destroy();
      }

      this.lines.length = 0;
    }
  }

  create() {
    this.createBackground();
    this.createDotsField();
    this.createDots();
    this.createText();
    this.createPointCounter();
  }

  getDotsPositions() {
    const positions = [];
    const dotTexture = this.textures.get('dot').getSourceImage();
    const dotSize = dotTexture.height;
    const offsetX = (this.sys.game.config.width - dotSize * config.cols) / 2;
    const offsetY = (this.sys.game.config.height - dotSize * config.rows) / 2;

    for (let row = 0; row < config.rows; row++) {
      for (let col = 0; col < config.cols; col++) {
        positions.push({
          x: offsetX + col * dotSize,
          y: offsetY + row * dotSize,
        });
      }
    }

    return positions;
  }
}
