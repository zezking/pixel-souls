class NPC extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, key, frame } = data;
    super(scene.matter.world, x, y, key, frame);
    this.scene.add.existing(this); // the scene this container will be added to
    this.depthSorting = true; //Allows this entity to be depth-sorted
    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    // let NPCCollider = Bodies.circle(this.x,this.y,12,{isSensor:false, lable:'NPCCollider'});
    let NPCSensor = Bodies.circle(this.x, this.y, 24, {
      isSensor: true,
      label: "NPCSensor",
    });
    const compoundBody = Body.create({
      parts: [NPCSensor],
      frictiasdonAir: 0.35,
      isStatic: true,
    });


    this.setExistingBody(compoundBody);
    this.setFixedRotation();

    // this.velocity = 5; // the velocity when moving our NPC

    // enable physics
    // this.scene.physics.world.enable(this);
    // set immovable if another object collides with our NPC
    // this.setImmovable(false);
    // scale our NPC
    this.setScale(1);
    // collide with world bounds
    // this.setCollideWorldBounds(true);
    // add the NPC to our existing scene
    // this.scene.add.existing(this);

  }

  static preload(scene) {

    scene.load.atlas(
      "crestfallenWarrior",
      "/public/assets/sprites/crestfallenWarrior/crestfallenwarrior.png",
      "public/assets/sprites/crestfallenWarrior/crestfallenwarrior_atlas.json"
    );
    scene.load.animation(
      "crestfallenwarrior_anim",
      "/public/assets/sprites/crestfallenWarrior/crestfallenwarrior_anim.json"
    );

  }
  
  update() {
    this.anims.play(`crestfallenWarrior_idle`, true);
  }
}
