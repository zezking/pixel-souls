class Bonfire extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, key, frame } = data;
    super(scene.matter.world, x, y, key, frame);
    this.scene.add.existing(this); // the scene this container will be added to
    this.depthSorting = true; //Allows this entity to be depth-sorted
    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    let fireSensor = Bodies.circle(this.x, this.y, 24, {
      isSensor: true,
      label: "fireSensor",
    });
    const compoundBody = Body.create({
      parts: [fireSensor],
      frictiasdonAir: 0.35,
      isStatic: true,
    });

    this.setExistingBody(compoundBody);
    this.setFixedRotation();

    this.setScale(1);
  }

  static preload(scene) {
    scene.load.atlas(
      "bonfire",
      "/public/assets/entities/bonfire_animation/bonfire.png",
      "/public/assets/entities/bonfire_animation/bonfire_atlas.json"
    );
    scene.load.animation(
      "bonfire_anim",
      "/public/assets/entities/bonfire_animation/bonfire_anim.json"
    );
  }

  update() {
    this.anims.play("bonfire_lit", true);
  }
}
