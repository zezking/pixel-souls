class NPC extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, key, frame, name } = data;
    super(scene.matter.world, x, y, key, frame);
    this.scene.add.existing(this); // the scene this container will be added to
    this.name = name;
    this.depthSorting = true; //Allows this entity to be depth-sorted
    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
 
    let NPCSensor = Bodies.circle(this.x, this.y, 12, {
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

    // scale our NPC
    this.setScale(1);

  }

  static preload(scene) {

    scene.load.atlas(
      "crestfallenWarrior",
      "/public/assets/sprites/crestfallenWarrior/crestfallenwarrior.png",
      "public/assets/sprites/crestfallenWarrior/crestfallenwarrior_atlas.json",      
    );
    scene.load.animation(
      "crestfallenwarrior_anim",
      "/public/assets/sprites/crestfallenWarrior/crestfallenwarrior_anim.json",
    );

    scene.load.atlas(
      "griggs",
      "/public/assets/sprites/griggs/griggs.png",
      "public/assets/sprites/griggs/griggs_atlas.json"
    );
    scene.load.animation(
      "griggs_anim",
      "/public/assets/sprites/griggs/griggs_anim.json"
    );

    scene.load.atlas(
      "bigHatLogan",
      "public/assets/sprites/bigHatLogan/bighatlogan.png",
      "public/assets/sprites/bigHatLogan/bighatlogan_atlas.json"
    );
    scene.load.animation(
      "bigHatLogan_anim",
      "public/assets/sprites/bigHatLogan/bighatlogan_anim.json"
    );

    scene.load.atlas(
      "laurentius",
      "public/assets/sprites/laurentius/laurentius.png",
      "public/assets/sprites/laurentius/laurentius_atlas.json"
    );
    scene.load.animation(
      "laurentius_anim",
      "public/assets/sprites/laurentius/laurentius_anim.json"
    );

    scene.load.atlas(
      "petrus",
      "public/assets/sprites/petrus/petrus.png",
      "public/assets/sprites/petrus/petrus_atlas.json"
    );
    scene.load.animation(
      "petrus_anim",
      "public/assets/sprites/petrus/petrus_anim.json"
    );

    scene.load.atlas(
      "fireKeeper",
      "public/assets/sprites/fireKeeper/firekeeper.png",
      "public/assets/sprites/fireKeeper/firekeeper_atlas.json"
    );
    scene.load.animation(
      "firekeeper_anim",
      "public/assets/sprites/fireKeeper/firekeeper_anim.json"
    );

    scene.load.atlas(
      "lautrec",
      "public/assets/sprites/lautrec/lautrec.png",
      "public/assets/sprites/lautrec/lautrec_atlas.json"
    );
    scene.load.animation(
      "lautrec_anim",
      "public/assets/sprites/lautrec/lautrec_anim.json"
    );
  }
  
  update() {
    this.anims.play(`${this.name}_idle`, true);

  }
}
