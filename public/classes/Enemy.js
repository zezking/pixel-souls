class Enemy extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let {scene,x,y,key,frame} = data;
    super(scene.matter.world,x,y,key,frame);
    this.scene.add.existing(this); // the scene this container will be added to
    const {Body, Bodies} = Phaser.Physics.Matter.Matter;
    let enemyCollider = Bodies.circle(this.x,this.y,16,{isSensor:false, lable:'enemyCollider'});
    let enemySensor = Bodies.circle(this.x,this.y,24, {isSensor:true, label: 'enemySensor'});
    const compoundBody = Body.create({
      parts:[enemyCollider,enemySensor],
      frictionAir: 0.35,
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
    scene.load.atlas('skeleton','/public/assets/skele_sprites/skele_idle.png','/public/assets/skele_sprites/skele_idle_atlas.json')
    scene.load.animation('skele_anim','/public/assets/skele_sprites/skele_idle_anim.json')
  }

  get velocity() {
    return this.body.velocity;
  }

  update() {

    this.setFlipX(this.velocity.x < 0);
    // this.setFlipY(this.velocity.y < 0);


  }
}
