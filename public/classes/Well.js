class Well extends Phaser.Physics.Matter.Sprite{
  constructor(data) {
    let {scene,x,y,key,frame} = data;
    super(scene.matter.world,x,y,key,frame);
    this.scene.add.existing(this); // the scene this container will be added to
    this.depthSorting = true;  //Allows this entity to be depth-sorted
    const {Body, Bodies} = Phaser.Physics.Matter.Matter;
    // let fireCollider = Bodies.circle(this.x,this.y,12,{isSensor:false, lable:'fireCollider'});
    let wellSensor = Bodies.circle(this.x,this.y,24, {isSensor:true, label: 'wellSensor'});
    const compoundBody = Body.create({
      parts:[wellSensor],
      frictiasdonAir: 0.35,
      isStatic:true
    });

    this.setExistingBody(compoundBody);
    this.setFixedRotation();

    this.setScale(1);

  }

  static preload(scene) {
    scene.load.spritesheet("well", "public/assets/entities/well.png", {
      frameWidth: 88,
      frameHeight: 56,
    });
  //   scene.load.animation('bonfire_anim','/public/assets/entities/bonfire_animation/bonfire_anim.json')
    
  // }
  
  // update() {
  //   this.anims.play('bonfire_lit',true)
  // }
  
}
}