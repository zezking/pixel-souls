class Player extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame);
    this.scene = scene; // the scene this container will be added to
    
    // this.velocity = 5; // the velocity when moving our player


    // enable physics
    // this.scene.physics.world.enable(this);
    // set immovable if another object collides with our player
    // this.setImmovable(false);
    // scale our player
    this.setScale(1);
    // collide with world bounds
    // this.setCollideWorldBounds(true);
    // add the player to our existing scene
    // this.scene.add.existing(this);
  }

  update(inputKeys) {
    // this.body.setVelocity();

    
    const speed = 5;
    let playerVelocity = new Phaser.Math.Vector2();
    if(inputKeys.left.isDown) {
      playerVelocity.x = -1;
    } else if (inputKeys.right.isDown) {
      playerVelocity.x = 1;
    }
    if(inputKeys.up.isDown) {
      playerVelocity.y = -1;
    } else if (inputKeys.down.isDown) {
      playerVelocity.y = 1;
    }
    playerVelocity.normalize();
    playerVelocity.scale(speed);
    this.setVelocity(playerVelocity.x, playerVelocity.y);
    

  }
}
