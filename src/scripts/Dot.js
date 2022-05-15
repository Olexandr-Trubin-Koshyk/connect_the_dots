/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import Phaser from 'phaser';

export class Dot extends Phaser.GameObjects.Sprite {
  constructor(scene, color, position) {
    super(scene, position.x, position.y, 'dot');
    this.scene = scene;
    this.setOrigin(0);
    this.tint = color;
    this.scene.add.existing(this);
  }
}
