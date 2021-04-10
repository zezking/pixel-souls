class Player extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let {scene,x,y,key,frame} = data;
    super(scene.matter.world,x,y,key,frame);
    this.scene.add.existing(this); // the scene this container will be added to
    const {Body, Bodies} = Phaser.Physics.Matter.Matter;
    let playerCollider = Bodies.circle(this.x,this.y,12,{isSensor:false, lable:'playerCollider'});
    let playerSensor = Bodies.circle(this.x,this.y,24, {isSensor:true, label: 'playerSensor'});
    const compoundBody = Body.create({
      parts:[playerCollider,playerSensor],
      frictiasdonAir: 0.35,
    });
    this.setExistingBody(compoundBody);
    this.setFixedRotation();
    // this.velocity = 5; // the velocity when moving our player


    // enable physics
    // this.scene.physics.world.enable(this);
    // set immovable if another object collides with our player
    // this.setImmovable(false);
    // scale our player

    // collide with world bounds
    // this.setCollideWorldBounds(true);
    // add the player to our existing scene
    // this.scene.add.existing(this);
  }


  static preload(scene) {
    scene.load.atlas('ashen_one','/public/assets/character_sprites/ashen_one.png','/public/assets/character_sprites/ashen_one_atlas.json')
    scene.load.animation('ashen_anim','/public/assets/character_sprites/ashen_one_anim.json')
  }

  get velocity() {
    return this.body.velocity;
  }

  update(inputKeys) {
    // this.body.setVelocity()sa
    if (inputKeys.left.isDown) {
      this.anims.play("player_left",true);
      this.flipX = false;
    } else if (inputKeys.right.isDown) {
      this.anims.play("player_right",true);
      this.flipX = false;
    } else if (inputKeys.up.isDown) {
      this.anims.play("player_up",true);
    } else if (inputKeys.down.isDown) {
      this.anims.play("player_down",true);
    } else {
      this.anims.stop();
    }
    
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
