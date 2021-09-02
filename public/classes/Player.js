class Player extends Phaser.Physics.Matter.Sprite {
  constructor(data) {
    let { scene, x, y, key, frame } = data;
    super(scene.matter.world, x, y, key, frame);
    this.scene.add.existing(this);

    this.depthSorting = true;
    //Allows this entity to be depth-sorted
    // the scene this container will be added to
    const { Body, Bodies } = Phaser.Physics.Matter.Matter;

    let playerCollider = Bodies.rectangle(this.x, this.y + 20, 28, 28, {
      isSensor: false,
      lable: "playerCollider",
    });
    let playerSensor = Bodies.circle(this.x, this.y, 18, {
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
              bodyB.position.x - bodyA.position.x < 125 &&
              bodyA.position.y - bodyB.position.y < 125 &&
              bodyB.position.y - bodyA.position.y < 125
            ) {
              return {
                // adjusts the enemy chase speeds
                x: (bodyA.position.x - bodyB.position.x) * 0.000300, //You can change this value to adjust the force of X axis
                y: (bodyA.position.y - bodyB.position.y) * 0.000300, //You can change this value to adjust the force of Y axis
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
    this.estus = 3;
    this.atBonfire = false;
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

  update(delta) {

    // this.body.setVelocity()
    if (this.inputKeys.left.isDown && this.inputKeys.up.isDown) {
      this.anims.play("player_nw", true);
      this.flipX = false;
    } else if (this.inputKeys.left.isDown && this.inputKeys.down.isDown) {
      this.anims.play("player_sw", true);
      this.flipX = false;
    } else if (this.inputKeys.right.isDown && this.inputKeys.up.isDown) {
      this.anims.play("player_ne", true);
      this.flipX = false;
    } else if (this.inputKeys.right.isDown && this.inputKeys.down.isDown) {
      this.anims.play("player_se", true);
      this.flipX = false;
    } else if (this.inputKeys.left.isDown) {
      this.anims.play("player_left", true);
      this.flipX = false;
    } else if (this.inputKeys.right.isDown) {
      this.anims.play("player_right", true);
      this.flipX = false;
    } else if (this.inputKeys.up.isDown) {
      this.anims.play("player_up", true);
    } else if (this.inputKeys.down.isDown) {
      this.anims.play("player_down", true);
    } else if (this.atBonfire) {
      this.anims.play("player_spawn", true);
    } else {
      this.anims.stop();
    }

    const speed = 0.25 * delta;
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

    //Estus Logic
    if (this.inputKeys.drink.isDown) {
      if (this.estus > 0) {
        this.health = 5;
        this.estus -= 1;
        this.scene.AudioScene.playEstus();
        this.inputKeys.drink.reset();
        this.scene.events.emit("updateHealth", this.health, this.estus);
        console.log("Drank an estus. Estus remaining: ", this.estus);
      } else {
        this.inputKeys.drink.reset();
        console.log("Out of estus :(");
      }
    }
  }

  playerKilled() {
    this.setActive(false);
    this.setVisible(false);
    this.destroy();
  }
}
