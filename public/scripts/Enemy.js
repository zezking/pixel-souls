export default class Enemy extends Phaser.Physics.Matter.Sprite {
  constructor(data){
    let {scene,x,y,texture,frame} = data;
    super(scene.matter.world,x,y,texture,frame);
    this.scene.add.existing(this);

    // creating custom collider
    const {Body, Bodies} = Phaser.Physics.Matter.Matter;
    let playerCollider = Bodies.circle(this.x,this.y,12,{isSensor:false, lable:'playerCollider'});
    let playerSensor = Bodies.circle(this.x,this.y,24, {isSensor:true, label: 'playerSensor'});
    const compoundBody = Body.create({
      parts:[playerCollider,playerSensor],
      frictionAir: 0.35,
    });
    this.setExistingBody(compoundBody);
    this.setFixedRotation();
  }

  static preload(scene) {
    scene.load.atlas('skeleton','assets/skele_sprites/skele_idle.png','assets/skele_sprites/skele_idle_atlas.json')
    scene.load.animation('skele_anim','assets/skele_sprites/skele_idle_anim.json')
  }

  get velocity() {
    return this.body.velocity;
  }



  update() {

    this.enemy.anims.play('skele_idle',true)
    // // Player Movement and Animations
    // if (this.inputKeys.left.isDown) {
    //   this.anims.play("player_left",true);
    //   this.flipX = false;
    // } else if (this.inputKeys.right.isDown) {
    //   this.anims.play("player_right",true);
    //   this.flipX = false;
    // } else if (this.inputKeys.up.isDown) {
    //   this.anims.play("player_up",true);
    // } else if (this.inputKeys.down.isDown) {
    //   this.anims.play("player_down",true);
    // } else {
    //   this.anims.stop();
    // }

    // Player Speed controls
    const speed = 2.5;
    let playerVelocity = new Phaser.Math.Vector2();
    if(this.inputKeys.left.isDown) {
      playerVelocity.x = -1;
    } else if (this.inputKeys.right.isDown) {
      playerVelocity.x = 1;
    }
    if(this.inputKeys.up.isDown) {
      playerVelocity.y = -1;
    } else if (this.inputKeys.down.isDown) {
      playerVelocity.y = 1;
    }
    playerVelocity.normalize();
    playerVelocity.scale(speed);
    this.setVelocity(playerVelocity.x, playerVelocity.y);
    

  }

}