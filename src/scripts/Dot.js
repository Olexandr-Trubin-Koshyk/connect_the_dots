/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import Phaser from 'phaser';
import { config } from './main';

export class Dot extends Phaser.GameObjects.Sprite {
  constructor(scene, color, position) {
    super(scene, position.x, -position.y, 'dot');

    this.position = {
      x: position.x,
      y: position.y,
    }
    this.color = color;
    this.scene = scene;
    this.setOrigin(0);
    this.tint = color;
    this.scene.add.existing(this);
    this.setInteractive();
  }

  move() {
    this.scene.tweens.add({
      targets: this,
      x: this.position.x,
      y: this.position.y,
      delay: ((config.scale.height - this.position.y) / config.dotSize) * 100,
      ease: 'Linear',
      duration: 300,
    })
  }

  pickDot(boolean, oriental, move) {
    if (boolean) {
      const startFromX = this.position.x + config.dotSize / 2;
      const startFromY = this.position.y + config.dotSize / 2;
      let line;

      let endToX = 0;
      let endToY = 0;

      if (oriental === 'vertical') {
        endToX = startFromX;
        endToY = startFromY + move;
      }

      if (oriental === 'horizontal') {
        endToX = startFromX + move;
        endToY = startFromY
      }

      line = this.scene.add.line( 
        0,
        0,
        startFromX,
        startFromY,
        endToX,
        endToY,
        this.color,
        1,
      ).setOrigin(0, 0);

      line.setLineWidth(8);

      return line;
    }
  }
}
