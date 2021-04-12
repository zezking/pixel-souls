let deathStrokeThickness = 50;
let deathFontSize = 40;

class BattleScene extends Phaser.Scene {
  constructor() {
    super("Battle");
    
  }
  
  prelaod() {}
  
  
  create() {
    let camera = this.cameras.main;
    // Transition fade effect
    camera.fade(1000);
    camera.fadeIn(1000);
    camera.flash(2000);
    
    


    

    // create title text
  
    // this.logo=this.add.image()
    this.deathText = this.add
      .text(this.scale.width / 2, this.scale.height / 2, "YOU DIED", {
        fontFamily: "titleFont",
        fontSize: 20,
        fill: "#ff0000",
      })
      .setStroke("#ff0000", deathStrokeThickness)
      .setFontSize(20)
    this.deathText.setOrigin(0.5);

  
    this.tweens.add({
      targets: this.deathText.style,
      strokeThickness: { value: 1, duration: 2000, ease: "Linear"},

    });
  
    
    
    // this.dialogsTimer = this.time.addEvent({
    //   delay: 4000,
    //   callback: () => {
    //     this.scene.remove("Battle");
    //     // this.scene.start("Game");
    //   },
    // });
    
    this.input.keyboard.on("keydown", () => {
      this.scene.start("Game");
    });
  
  }
    
  
  
  update() {
    if (deathStrokeThickness < 100) {
      this.deathText
        .setFontSize(deathFontSize++);
    }

  //   if (titleText.fontSize < 250)
	// {
	// 	titleText.fontSize += 1;
	// }
  }


  
  startScene(targetScene) {
    this.scene.start(targetScene);
  }

}
