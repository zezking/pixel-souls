class Player extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    super(scene, x, y, key, frame);
    this.scene = scene;
    this.souls = souls; // the amount of souls this item is valued at
    this.id = id;
    this.scene.add.existing(this);

    this.depthSorting = true; //Allows this entity to be depth-sorted


  }
}