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
      const fromX = this.position.x + config.dotSize / 2;
      const fromY = this.position.y + config.dotSize / 2;
      let line;

      let toX = 0;
      let toY = 0;

      if (oriental === 'vertical') {
        toX = fromX;
        toY = fromY + move;
      }

      if (oriental === 'horizontal') {
        toX = fromX + move;
        toY = fromY
      }

      line = this.scene.add.line( 
        0,
        0,
        fromX,
        fromY,
        toX,
        toY,
        this.color,
        1,
      ).setOrigin(0, 0);

      line.setLineWidth(8);

      return line;
    }
  }
}
