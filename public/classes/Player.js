class Player extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, key, frame } = data;
    super(scene.matter.world, x, y, key, frame);
    this.scene.add.existing(this);

    this.depthSorting = true;
    //Allows this entity to be depth-sorted
    // the scene this container will be added to
    const { Body, Bodies } = Phaser.Physics.Matter.Matter;

    let playerCollider = Bodies.rectangle(this.x, this.y + 20, 20, 20, {
      isSensor: false,
      lable: "playerCollider",
    });
    let playerSensor = Bodies.circle(this.x, this.y, 20, {
      isSensor: true,
      label: "playerSensor",
    });

    //You can also change the size of sensor to change the force of attraction.
    const compoundBody = Body.create({
      parts: [playerCollider, playerSensor],

      frictionAir: 0.35,

      plugin: {
        attractors: [
          function (bodyA, bodyB) {
            if (
              bodyA.position.x - bodyB.position.x < 125 &&
              bodyA.position.y - bodyB.position.y < 125
            ) {
              return {
                x: (bodyA.position.x - bodyB.position.x) * 0.000045, //You can change this value to adjust the force of X axis
                y: (bodyA.position.y - bodyB.position.y) * 0.000045, //You can change this value to adjust the force of Y axis
              };
            } else {
              return {
                x: (bodyA.position.x - bodyB.position.x) * 0.0, //You can change this value to adjust the force of X axis
                y: (bodyA.position.y - bodyB.position.y) * 0.0, //You can change this value to adjust the force of Y axis
              };
            }
          },
        ],
      },
    });
    this.setExistingBody(compoundBody);
    // scale our player
    this.setScale(1);
    // fixed rotation of character
    this.setFixedRotation();
    this.health = 5;
    this.souls = 0;
    this.atBonfire = false
  }

  static preload(scene) {
    scene.load.atlas(
      "ashen_one",
      "/public/assets/character_sprites/ashen_one.png",
      "/public/assets/character_sprites/ashen_one_atlas.json"
    );
    scene.load.animation(
      "ashen_anim",
      "/public/assets/character_sprites/ashen_one_anim.json"
    );
  }


  updateSouls(souls) {
    this.souls += souls;
  }

  get velocity() {
    return this.body.velocity;
  }

  update() {

    // if(!this.atBonfire){
    //   this.anims.play("player_spawn")
    // }
    // this.body.setVelocity()
    if (this.inputKeys.left.isDown) {
      this.anims.play("player_left", true);
      this.flipX = false;
    } else if (this.inputKeys.right.isDown) {
      this.anims.play("player_right", true);
      this.flipX = false;
    } else if (this.inputKeys.up.isDown) {
      this.anims.play("player_up", true);
    } else if (this.inputKeys.down.isDown) {
      this.anims.play("player_down", true);
    // } else if(this.atBonfire){
    //   this.anims.play("player_spawn", true)
    } else {
      this.anims.stop();
    }

    const speed = 4;
    let playerVelocity = new Phaser.Math.Vector2();
    if (this.inputKeys.left.isDown) {
      playerVelocity.x = -1;
    } else if (this.inputKeys.right.isDown) {
      playerVelocity.x = 1;
    }
    if (this.inputKeys.up.isDown) {
      playerVelocity.y = -1;
    } else if (this.inputKeys.down.isDown) {
      playerVelocity.y = 1;
    }
    // // normalized speed, HAS to be above sprinting
    playerVelocity.normalize();

    //sprinting speeds
    playerVelocity.normalize();
    if (this.inputKeys.shift.isDown & this.inputKeys.left.isDown) {
      playerVelocity.x = -1.5;
    } else if (this.inputKeys.shift.isDown & this.inputKeys.right.isDown) {
      playerVelocity.x = 1.5;
    }
    if (this.inputKeys.shift.isDown & this.inputKeys.up.isDown) {
      playerVelocity.y = -1.5;
    } else if (this.inputKeys.shift.isDown & this.inputKeys.down.isDown) {
      playerVelocity.y = 1.5;
    }

    playerVelocity.scale(speed);
    this.setVelocity(playerVelocity.x, playerVelocity.y);
  }
}
