let deathStrokeThickness = 50;
let deathFontSize = 40;

class BattleScene extends Phaser.Scene {
  constructor() {
    super("Battle");
    
  }
  
  prelaod() {

  }
  
  
  create() {
    let camera = this.cameras.main;
    // Transition fade effect
    camera.fade(1000);
    camera.fadeIn(1000);
    camera.flash(1000);
    
    


    

    // create title text
  
    // this.logo=this.add.image()
    this.deathText = this.add
      .text(this.scale.width / 2, this.scale.height / 2, "YOU DIED", {
        fontFamily: "titleFont",
        fontSize: 20,
        fill: "#ff0000",
      })
      .setAlpha(1);
    this.deathText.setOrigin(0.5);

  
    this.tweens.add({
      targets: this.deathText,
      alpha: { value: 0, duration: 5000, ease: "Linear" },
    });
  
    // time to end and return to Title
    this.dialogsTimer = this.time.addEvent({
      delay: 5000,
      callback: () => {
        // this.scene.remove("Battle");
        this.scene.start("Title");
      },
    });
    
    // Title frozen if Pressing directly to title, and too soon
    this.input.keyboard.on("keydown", () => {
      this.scene.start("Game");
    });
  
  }
    
  
  
  update() {
    if (deathStrokeThickness < 100 ) {
      this.deathText
        .setFontSize(deathFontSize++);
    }



  // console.log(this)
  }

  
  startScene(targetScene) {
    this.scene.start(targetScene);
  }

}
