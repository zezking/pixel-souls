let Preloader = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function Preloader ()
  {
      Phaser.Scene.call(this, { key: 'Preloader' });

      this.loadingScreen;
  },

  preload: function ()
  {
      this.load.image('loadingScreen', 'public/assets/entities/maxresdefault.jpg');
      this.load.image('fireStill', 'public/assets/entities/bonfire0.png');
  },

  create: function ()
  {
      this.cameras.main.fadeIn(1000, 0, 0, 0)
      this.loadingScreen = this.add.image(this.game.config.width/2, this.game.config.height/2, 'loadingScreen').setScale(0.5);
      this.arrow = this.add.sprite(170, 520, 'fireStill').setOrigin(0.5);


      // transition method with screen wipe down y axis, currently turned of with ZERO duration
      this.input.keyboard.on('keydown', function () {

          this.scene.transition({
              target: 'Death',
              duration: 0,
              moveBelow: false,
              onUpdate: this.transitionOut,
              data: { x: 400, y: 300 }
          });

      }, this);


      // other method of transitioning out
      // this.input.keyboard.on('keydown', function (event) {
    
      //     this.scene.transition({
      //         target: 'Death',
      //         duration: 3000
      //     });
    
      // }, this);
  },

  
  transitionOut: function (progress)
  {
      this.loadingScreen.y = (600 * progress);
  },

  // spinning motion
  update: function (time, delta)
  {
      this.arrow.rotation += 0.01;
  }

});