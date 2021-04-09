class Player extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame);
    this.scene = scene; // the scene this container will be added to
    this.velocity = 5; // the velocity when moving our player

    // enable physics
    this.scene.physics.world.enable(this);
    // set immovable if another object collides with our player
    this.setImmovable(false);
    // scale our player
    this.setScale(1);
    // collide with world bounds
    this.setCollideWorldBounds(true);
    // add the player to our existing scene
    this.scene.add.existing(this);
    

  }

  update(cursors) {
    this.body.setVelocity(0);


    const speed = 150;
    let playerVelocity = new Phaser.Math.Vector2();
    if(cursors.left.isDown) {
      playerVelocity.x = -1;
    } else if (cursors.right.isDown) {
      playerVelocity.x = 1;
    }
    if(cursors.up.isDown) {
      playerVelocity.y = -1;
    } else if (cursors.down.isDown) {
      playerVelocity.y = 1;
    }
    playerVelocity.normalize();
    playerVelocity.scale(speed);
    this.setVelocity(playerVelocity.x, playerVelocity.y);
    

  }
}
