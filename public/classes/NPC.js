class NPC extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, key, frame } = data;
    super(scene.matter.world, x, y, key, frame);
    this.scene.add.existing(this); // the scene this container will be added to
    this.depthSorting = true; //Allows this entity to be depth-sorted
    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    // let playerCollider = Bodies.circle(this.x,this.y,12,{isSensor:false, lable:'playerCollider'});
    let playerSensor = Bodies.circle(this.x, this.y, 24, {
      isSensor: true,
      label: "playerSensor",
    });
    const compoundBody = Body.create({
      parts: [playerSensor],
      frictiasdonAir: 0.35,
      isStatic: true,
    });


    this.setExistingBody(compoundBody);
    this.setFixedRotation();

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
}
