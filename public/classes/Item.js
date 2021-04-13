class Item extends Phaser.Physics.Matter.Sprite{
  constructor(data) {
    let {scene, x, y, key, frame, id} = data;
    super(scene.matter.world, x, y, key, frame);
    this.scene.add.existing(this); // the scene this container will be added to
    this.depthSorting = false;  //Allows this entity to be depth-sorted
    this.setDepth(1771);
    this.value = 300;
    this.id = id;
    const {Body, Bodies} = Phaser.Physics.Matter.Matter;

    let itemSensor = Bodies.circle(this.x,this.y,1, {isSensor:true, label: 'itemSensor'});
    const compoundBody = Body.create({
      parts:[itemSensor],
      frictionAir: 0.35,
      isStatic:true
    });

    this.setExistingBody(compoundBody);
    this.setFixedRotation();

    this.setScale(1);

  }

  makeInactive() {
    this.setActive(false);
    this.setVisible(false);
    this.destroy();
  }
}