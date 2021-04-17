class Boss extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, key, frame, id } = data;
    super(scene.matter.world, x, y, key, frame);
    this.scene.add.existing(this);
    this.id = id;
    const { Body, Bodies } = Phaser.Physics.Matter.Matter;

    this.depthSorting = true; //Allows this entity to be depth-sorted

    let bossCollider = Bodies.circle(this.x, this.y + 12, 12, {
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
    this.health = 10
  }

  // static preload(scene) {
  //   scene.load.atlas(
  //     "skeleton_sprite",
  //     "/public/assets/skele_sprites/skeleton_sprite.png",
  //     "/public/assets/skele_sprites/skeleton_sprite_atlas.json"
  //   );
  //   scene.load.animation(
  //     "skele_anim",
  //     "/public/assets/skele_sprites/skeleton_sprite_anim.json"
  //   );
  // }

  // get velocity() {
  //   return this.body.velocity;
  // }

  update() {
    // const speed = 0;
    let bossVelocity = new Phaser.Math.Vector2();

    // this.setFlipX(this.velocity.x > 0);

    // this.setFlipX(this.velocity.x > 0);
    // // this.setFlipY(this.velocity.y < 0);

    // if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
    //   this.anims.play(`skeleton_walk`, true);
    // } else {
    //   this.anims.play(`skeleton_idle`, true);
    // }

    bossVelocity.normalize();
    // bossVelocity.scale(speed);
    // this.setVelocity(bossVelocity.x, bossVelocity.y);
  }

  bossKilled() {
    this.destroy();
  }
}
