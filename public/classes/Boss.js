class Boss extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, key, frame, id } = data;
    super(scene.matter.world, x, y, key, frame);
    this.scene.add.existing(this);
    this.id = id;
    const { Body, Bodies } = Phaser.Physics.Matter.Matter;

    this.depthSorting = false; //Allows this entity to be depth-sorted

    let bossCollider = Bodies.circle(this.x, this.y, 12, {
      isSensor: false,
      lable: "bossCollider",
    });
    let bossSensor = Bodies.circle(this.x, this.y, 16, {
      isSensor: true,
      label: "bossSensor",
    });

    const compoundBody = Body.create({
      parts: [bossCollider, bossSensor],
      frictionAir: 0.2,
    });
    this.setExistingBody(compoundBody);
    // scale the character
    this.setScale(1.25);
    // fixed rotation of character
    this.setFixedRotation();
    this.health = 20
  }


  update() {
    let bossVelocity = new Phaser.Math.Vector2();

    bossVelocity.normalize();
  }

  bossKilled() {
    this.destroy();
  }
}
