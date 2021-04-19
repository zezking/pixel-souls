class CombatPromptScene extends Phaser.Scene {
  constructor() {
    super("Prompt");
  }

  init() {}

  displayWinLoseDraw(scene, msg) {
    //create player damage text
    if (msg === "enemy") {
      scene.damageText = scene.add
        .text(this.scale.width / 2 - 220, this.scale.width / 2 - 250, "HP -1", {
          fontFamily: "HonokaMincho",
          fontSize: "30px",
        })
        .setDepth(501);
      //create player damage heart
      scene.damageHeart = scene.make
        .image({
          key: "damage",
          x: this.scale.width / 2 - 220,
          y: this.scale.width / 2 - 340,
          add: true,
        })
        .setDepth(500);
      //show player damage text
      scene.tweens.add({
        targets: scene.damageText,
        alpha: {
          start: 0,
          from: 1,
          to: 0,
          duration: 3000,
          ease: "Cubic",
        },
      });
      //show player damage heart
      scene.tweens.add({
        targets: scene.damageHeart,

        alpha: {
          start: 0,
          from: 1,
          to: 0,
          duration: 2300,
          ease: "Cubic",
        },
      });
      scene.tweens.add({
        targets: scene.damageHeart,
        y: {
          from: this.scale.height / 2 - 90,
          to: this.scale.height / 2 - 120,
        },
        duration: 2500,
      });
      return;
    }

    //display enemy damange
    if (msg === "player") {
      //load kana as damage icon for Lord Andy
      if (scene.scene.key === "BossCombat") {
        scene.damageText = scene.add
          .text(
            this.scale.width / 2 + 70,
            this.scale.height / 2 - 300,
            "HP -1",
            {
              fontFamily: "HonokaMincho",
              fontSize: "30px",
            }
          )
          .setDepth(501);
        scene.damageKana = scene.make
          .image({
            key: "kana",
            x: this.scale.width / 2 + 330,
            y: this.scale.height / 2 - 330,
            add: true,
          })
          .setDepth(500);

        scene.tweens.add({
          targets: scene.damageText,

          alpha: {
            start: 0,
            from: 1,
            to: 0,
            duration: 3000,
            ease: "Cubic",
          },
        });
        scene.tweens.add({
          targets: scene.damageKana,

          alpha: {
            start: 0,
            from: 1,
            to: 0,
            duration: 2300,
            ease: "Cubic",
          },
        });
        scene.tweens.add({
          targets: scene.damageKana,
          y: {
            from: this.scale.height / 2 - 330,
            to: this.scale.height / 2 - 370,
          },
          duration: 2500,
        });

        return;
      }
      scene.damageText = scene.add
        .text(this.scale.width / 2 + 70, this.scale.height / 2 - 300, "HP -1", {
          fontFamily: "HonokaMincho",
          fontSize: "30px",
        })
        .setDepth(501);
      scene.damageHeart = scene.make
        .image({
          key: "damage",
          x: this.scale.width / 2 + 250,
          y: this.scale.height / 2 - 300,
          add: true,
        })
        .setDepth(500);

      scene.tweens.add({
        targets: scene.damageText,

        alpha: {
          start: 0,
          from: 1,
          to: 0,
          duration: 3000,
          ease: "Cubic",
        },
      });
      scene.tweens.add({
        targets: scene.damageHeart,

        alpha: {
          start: 0,
          from: 1,
          to: 0,
          duration: 2300,
          ease: "Cubic",
        },
      });
      scene.tweens.add({
        targets: scene.damageHeart,
        y: {
          from: this.scale.height / 2 - 300,
          to: this.scale.height / 2 - 340,
        },
        duration: 2500,
      });
      return;
    }
    //load kana as damage icon for Lord Andy
    if (scene.scene.key === "BossCombat") {
      scene.damageText = scene.add
        .text(this.scale.width / 2 + 70, this.scale.height / 2 - 300, "HP -1", {
          fontFamily: "HonokaMincho",
          fontSize: "30px",
        })
        .setDepth(501);
      scene.damageKana = scene.make
        .image({
          key: "kana",
          x: this.scale.width / 2 + 130,
          y: this.scale.height / 2 - 320,
          add: true,
        })
        .setDepth(500);

      scene.tweens.add({
        targets: scene.damageText,

        alpha: {
          start: 0,
          from: 1,
          to: 0,
          duration: 3000,
          ease: "Cubic",
        },
      });
      scene.tweens.add({
        targets: scene.damageKana,

        alpha: {
          start: 0,
          from: 1,
          to: 0,
          duration: 2300,
          ease: "Cubic",
        },
      });
      scene.tweens.add({
        targets: scene.damageKana,
        y: {
          from: this.scale.height / 2 - 320,
          to: this.scale.height / 2 - 360,
        },
        duration: 2500,
      });
    }

    scene.damageHeart1 = scene.make
      .image({
        key: "damage",
        x: this.scale.width / 2 - 220,
        y: this.scale.height / 2,
        add: true,
      })
      .setDepth(500);

    scene.damageText1 = scene.add
      .text(this.scale.width / 2 - 220, this.scale.width / 2 - 250, "HP -1", {
        fontFamily: "HonokaMincho",
        fontSize: "40px",
      })
      .setDepth(501);

    scene.damageHeart2 = scene.make
      .image({
        key: "damage",
        x: this.scale.width / 2 + 250,
        y: this.scale.height / 2 - 240,
        add: true,
      })
      .setDepth(500);

    scene.tweens.add({
      targets: scene.damageHeart2,

      alpha: {
        start: 0,
        from: 1,
        to: 0,
        duration: 2300,
        ease: "Cubic",
      },
    });
    scene.tweens.add({
      targets: scene.damageHeart2,
      y: {
        from: this.scale.height / 2 - 240,
        to: this.scale.height / 2 - 280,
      },
      duration: 2500,
    });

    scene.damageText2 = scene.add
      .text(this.scale.width / 2 + 70, this.scale.height / 2 - 300, "HP -1", {
        fontFamily: "HonokaMincho",
        fontSize: "30px",
      })
      .setDepth(501);

    scene.tweens.add({
      targets: scene.damageHeart1,

      alpha: {
        start: 0,
        from: 1,
        to: 0,
        duration: 2300,
        ease: "Cubic",
      },
    });
    scene.tweens.add({
      targets: scene.damageText1,

      alpha: {
        start: 0,
        from: 1,
        to: 0,
        duration: 2300,
        ease: "Cubic",
      },
    });
    scene.tweens.add({
      targets: scene.damageHeart1,
      y: {
        from: this.scale.height / 2 - 100,
        to: this.scale.height / 2 - 130,
      },
      duration: 2500,
    });

    scene.tweens.add({
      targets: scene.damageText2,

      alpha: {
        start: 0,
        from: 1,
        to: 0,
        duration: 2300,
        ease: "Cubic",
      },
    });

    return;
  }

  healthDecreaseEffect() {
    this.damageText = this.add.text();
  }

  bossName(scene) {
    scene.enemyNameUi = scene.make
      .image({
        key: "enemy-name",
        x: this.scale.width / 2 + 170,
        y: this.scale.height / 2 - 29,
        scale: {
          x: 1.5,
          y: 1.5,
        },
        add: true,
      })
      .setDepth(300);

    scene.bossName = scene.add
      .text(
        this.scale.width / 2 + 50,
        this.scale.height / 2 - 40,
        "King Andy Lord of Cinder",
        {
          fontFamily: "titleFont",
          fontSize: "20px",
        }
      )
      .setDepth(500);
  }

  enemyName(scene, name) {
    scene.enemyNameUi = scene.make
      .image({
        key: "skeleton-name",
        x: this.scale.width / 2 + 260,
        y: this.scale.height / 2 - 110,
        scale: {
          x: 1,
          y: 1,
        },
        add: true,
      })
      .setDepth(300);
    scene.bossName = scene.add
      .text(
        this.scale.width / 2 + 225,
        this.scale.height / 2 - 120,
        `${name}`,
        {
          fontFamily: "titleFont",
          fontSize: "18px",
        }
      )
      .setDepth(500);
  }
  displayEnemyChose(scene, enemyChoice) {
    //obj is either enmey or player

    if (enemyChoice === "sword") {
      scene.swordChosen = scene.make
        .image({ x: 500, y: 200, key: "sword_chosen", add: true })
        .setDepth(100)
        .setScale(0.5);

      scene.tweens.add({
        targets: scene.swordChosen,
        scale: {
          from: 0.5,
          to: 0.8,
          duration: 800,
          ease: "Expo.easeInOut",
        },

        alpha: {
          from: 1,
          to: 0,
          delay: 1000,
          duration: 1000,
          ease: "Cubic",
        },
      });
      return;
    }
    if (enemyChoice === "shield") {
      scene.swordChosen = scene.make
        .image({ x: 500, y: 200, key: "shield_chosen", add: true })
        .setDepth(100)
        .setScale(0.5);

      scene.tweens.add({
        targets: scene.swordChosen,
        scale: {
          from: 0.5,
          to: 0.8,
          duration: 800,
          ease: "Expo.easeInOut",
        },

        alpha: {
          from: 1,
          to: 0,
          delay: 1000,
          duration: 1000,
          ease: "Cubic",
        },
      });
      return;
    }
    if (enemyChoice === "magic") {
      scene.swordChosen = scene.make
        .image({ x: 500, y: 200, key: "magic_chosen", add: true })
        .setDepth(100)
        .setScale(0.5);

      scene.tweens.add({
        targets: scene.swordChosen,
        scale: {
          from: 0.5,
          to: 0.8,
          duration: 800,
          ease: "Expo.easeInOut",
        },

        alpha: {
          from: 1,
          to: 0,
          delay: 1000,
          duration: 1000,
          ease: "Cubic",
        },
      });
      return;
    }
  }

  displayPlayerChose(scene, playerChoice) {
    if (playerChoice === "sword") {
      scene.swordPlayerChosen = scene.make
        .image({ x: 340, y: 300, key: "sword_chosen", add: true })
        .setDepth(100)
        .setScale(1.2);
      scene.tweens.add({
        targets: scene.swordPlayerChosen,
        scale: {
          from: 1.2,
          to: 1.5,
          duration: 800,
          ease: "Expo.easeInOut",
        },

        alpha: {
          from: 1,
          to: 0,
          delay: 1000,
          duration: 1000,
          ease: "Cubic",
        },
      });

      return;
    }
    if (playerChoice === "magic") {
      scene.swordPlayerChosen = scene.make
        .image({ x: 340, y: 300, key: "magic_chosen", add: true })
        .setDepth(100)
        .setScale(1.2);
      scene.tweens.add({
        targets: scene.swordPlayerChosen,
        scale: {
          from: 1.2,
          to: 1.5,
          duration: 800,
          ease: "Expo.easeInOut",
        },

        alpha: {
          from: 1,
          to: 0,
          delay: 1000,
          duration: 1000,
          ease: "Cubic",
        },
      });
      return;
    }
    if (playerChoice === "shield") {
      scene.swordPlayerChosen = scene.make
        .image({ x: 340, y: 300, key: "shield_chosen", add: true })
        .setDepth(100)
        .setScale(1.2);
      scene.tweens.add({
        targets: scene.swordPlayerChosen,
        scale: {
          from: 1.2,
          to: 1.5,
          duration: 800,
          ease: "Expo.easeInOut",
        },

        alpha: {
          from: 1,
          to: 0,
          delay: 1000,
          duration: 1000,
          ease: "Cubic",
        },
      });
      return;
    }
  }
}
