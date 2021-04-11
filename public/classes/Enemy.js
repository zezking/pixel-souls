class Enemy extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, key, frame } = data;
    super(scene.matter.world, x, y, key, frame);
    this.scene.add.existing(this);

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;

    this.depthSorting = true; //Allows this entity to be depth-sorted


    let enemyCollider = Bodies.circle(this.x,this.y + 12,12,{
      isSensor: false,
      lable: "enemyCollider",
    });
    let enemySensor = Bodies.circle(this.x, this.y, 16, {
      isSensor: true,
      label: "enemySensor",
    });

    const compoundBody = Body.create({
      parts: [enemyCollider, enemySensor],
      frictionAir: 0.2,
    });
    this.setExistingBody(compoundBody);
    // scale our player
    this.setScale(1.25);
    // fixed rotation of character
    this.setFixedRotation();
    // this.velocity = 5; // the velocity when moving our player

    // enable physics
    // this.scene.physics.world.enable(this);
    // set immovable if another object collides with our player
    // this.setImmovable(false);

    // collide with world bounds
    // this.setCollideWorldBounds(true);
    // add the player to our existing scene
    // this.scene.add.existing(this);
  }

  static preload(scene) {

    scene.load.atlas(
      "skeleton_sprite",
      "/public/assets/skele_sprites/skeleton_sprite.png",
      "/public/assets/skele_sprites/skeleton_sprite_atlas.json"
    );
    scene.load.animation(
      "skele_anim",
      "/public/assets/skele_sprites/skeleton_sprite_anim.json"
    );

  }

  get velocity() {
    return this.body.velocity;
  }

  update() {

    // const speed = 10;
    let enemyVelocity = new Phaser.Math.Vector2();

    this.setFlipX(this.velocity.x > 0);

    this.setFlipX(this.velocity.x > 0);
    // this.setFlipY(this.velocity.y < 0);

    if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
      this.anims.play(`skeleton_walk`, true);
    } else {
      this.anims.play(`skeleton_idle`, true);
    }


    enemyVelocity.normalize();
    // enemyVelocity.scale(speed);
    // this.setVelocity(enemyVelocity.x, enemyVelocity.y);

  }
}
