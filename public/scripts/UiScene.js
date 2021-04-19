class UiScene extends Phaser.Scene {
  constructor() {
    super("Ui");
  }

  init() {
    //Scene references for event listening
    this.gameScene = this.scene.get("Game");
    this.combatScene = this.scene.get("Combat");
    this.bossCombatScene = this.scene.get("BossCombat");
  }

  create() {
    this.setupUiElements();
    this.setupEvents();
    this.createSoulSuckSFX();
  }

  //----------Initial UI Setup---------------
  setupUiElements() {
    //Health Hearts
    this.hearts = this.add.group({
      classType: Phaser.GameObjects.Image,
    });
    this.hearts.createMultiple({
      key: "ui-heart-full",
      setXY: { x: 20, y: 20, stepX: 40 },
      quantity: 5,
    });

    //Soul Counter
    this.soulCounter = this.add.image(725, 770, "soul-counter");
    this.soulText = this.add.text(0, 0, "0", {
      fontSize: "16px",
      fill: "#fff",
    });

    Phaser.Display.Align.In.Center(this.soulText, this.soulCounter);

    // Estus Flask
    this.estusFlask = this.add.image(75, 725, "estus-full");
  }
  //-----------------------------------------
  //-----------------------------------------

  setupEvents() {
    // listen for the updateSouls event from the game scene
    this.gameScene.events.on("updateSouls", (prevSouls, newSouls) => {
      this.soulGet.play();
      let counter = prevSouls;
      let timer = 0;
      for (let i = counter; i < newSouls; i++) {
        setTimeout(() => {
          this.soulText.setText(`${i + 1}`);
        }, (timer += 5));
      }
    });
    // listen for healthCount event from COMBAT
    this.combatScene.events.on("updateHealth", (health) => {
      this.hearts.children.each((gameObj, index) => {
        const heart = gameObj;
        if (index < health) {
          heart.setTexture("ui-heart-full");
        } else {
          heart.setTexture("ui-heart-empty");
        }
      });
      this.healthUpdater(health);
    });
    this.bossCombatScene.events.on("updateHealth", (health) => {
      this.hearts.children.each((gameObj, index) => {
        const heart = gameObj;
        if (index < health) {
          heart.setTexture("ui-heart-full");
        } else {
          heart.setTexture("ui-heart-empty");
        }
      });
      this.healthUpdater(health);
    });
    //-------------------------------------------
    //Health and Estus flasks from GAMESCENE:
    this.gameScene.events.on("updateHealth", (health, estus) => {
      //Health hearts
      this.hearts.children.each((gameObj, index) => {
        const heart = gameObj;
        if (index < health) {
          heart.setTexture("ui-heart-full");
        } else {
          heart.setTexture("ui-heart-empty");
        }
      });
      this.healthUpdater(health);
      //Estus flask
      if (estus === 3) {
        this.estusFlask.setTexture("estus-full");
      } else if (estus === 2) {
        this.estusFlask.setTexture("estus-half");
      } else if (estus === 1) {
        this.estusFlask.setTexture("estus-quarter");
      } else {
        this.estusFlask.setTexture("estus-empty");
      }
    });
    //Health and Estus flasks from BOSS-SCENE:
    this.gameScene.events.on("updateHealth", (health, estus) => {
      //Health hearts
      this.hearts.children.each((gameObj, index) => {
        const heart = gameObj;
        if (index < health) {
          heart.setTexture("ui-heart-full");
        } else {
          heart.setTexture("ui-heart-empty");
        }
      });
      this.healthUpdater(health);
      //Estus flask
      if (estus === 3) {
        this.estusFlask.setTexture("estus-full");
      } else if (estus === 2) {
        this.estusFlask.setTexture("estus-half");
      } else if (estus === 1) {
        this.estusFlask.setTexture("estus-quarter");
      } else {
        this.estusFlask.setTexture("estus-empty");
      }
    });
  }

  healthUpdater(health) {
    this.events.emit("healthUpdated", health);
  }

  createSoulSuckSFX() {
    this.soulGet = this.sound.add("soul-get", {
      volume: 0.04,
    });
  }

  displayHelper(scene, obj) {
    if (obj.texture.key === "bonfire") {
      scene.helperText = scene.add
        .text(
          485, // x position of text
          1800, // y position of text
          "E: Rest at bonfire", //this will generate a random conversation with NPC
          {
            fill: "#FFFFFF",
            fontSize: "10px",
            wordWrap: { width: 400, useAdvancedWrap: true }, //change here to make dialogues text wrap
          }
        )
        .setFontFamily("HonokaMincho");

      scene.tweens.add({
        targets: scene.helperText,
        alpha: { from: 1, to: 0, ease: "Linear" },
        delay: 2000,
        duration: 1000,
      });
    }

    if (obj.texture.key === "eventTrigger") {
      scene.helperText = scene.add
        .text(
          1177, // x position of text
          850, // y position of text
          "E: Use lift", //this will generate a random conversation with NPC
          {
            fill: "#FFFFFF",
            fontSize: "10px",
            wordWrap: { width: 400, useAdvancedWrap: true }, //change here to make dialogues text wrap
          }
        )
        .setFontFamily("HonokaMincho")
        .setDepth(3000);

      scene.tweens.add({
        targets: scene.helperText,
        alpha: { from: 1, to: 0, ease: "Linear" },
        delay: 1000,
        duration: 500,
      });
    }

    if (obj.texture.key === "well") {
      scene.helperText = scene.add
        .text(735, 1750, "?", {
          fill: "#FFFFFF",
          fontSize: "10px",
          wordWrap: { width: 400, useAdvancedWrap: true },
        })
        .setFontFamily("HonokaMincho")
        .setDepth(3000);

      scene.tweens.add({
        targets: scene.helperText,
        alpha: { from: 1, to: 0, ease: "Linear" },
        delay: 250,
        duration: 250,
      });
    }
  }
}
