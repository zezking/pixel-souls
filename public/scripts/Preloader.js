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
  },

  create: function ()
  {
      this.cameras.main.fadeIn(1000, 0, 0, 0)
      this.loadingScreen = this.add.image(this.game.config.width/2, this.game.config.height/2, 'loadingScreen').setScale(0.5);

      this.input.keyboard.on('keydown', function () {

          this.scene.transition({
              target: 'Death',
              duration: 2000,
              moveBelow: false,
              onUpdate: this.transitionOut,
              data: { x: 400, y: 300 }
          });

      }, this);
  },

  transitionOut: function (progress)
  {
      this.loadingScreen.y = (600 * progress);
  }

});