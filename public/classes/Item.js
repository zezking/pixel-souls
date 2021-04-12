class Item extends Phaser.Physics.Matter.Sprite{
  constructor(data) {
    let {scene,x,y,key,frame, id} = data;
    super(scene.matter.world, x, y, key, frame);
    this.scene.add.existing(this); // the scene this container will be added to
    this.depthSorting = true;  //Allows this entity to be depth-sorted
    this.value = 300;
    this.id = id;
    const {Body, Bodies} = Phaser.Physics.Matter.Matter;

    let playerSensor = Bodies.circle(this.x,this.y,1, {isSensor:true, label: 'playerSensor'});
    const compoundBody = Body.create({
      parts:[playerSensor],
      frictionAir: 0.35,
      isStatic:true
    });

    this.setExistingBody(compoundBody);
    this.setFixedRotation();

    this.setScale(1);

  }

  makeActive() {
    this.setActive(true);
    this.setVisible(true);
    this.playerSensor = {isSensor: true};
  }

  makeInactive(itemID) {
    if (this.id === itemID) {
      this.setActive(false);
      this.setVisible(false);
      this.body.destroy();
    }
  }
}