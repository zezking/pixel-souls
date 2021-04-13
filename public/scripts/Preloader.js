var Preloader = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

  function Preloader ()
  {
      Phaser.Scene.call(this, { key: 'Preloader' });

      this.crow;
  },

  preload: function ()
  {
      this.load.image('crow', 'public/assets/sprites/bird.png');
  },

  create: function ()
  {
      this.crow = this.add.image(0, 0, 'crow').setOrigin(0);

      this.input.once('pointerdown', function () {

          this.scene.transition({
              target: 'Death',
              duration: 2000,
              moveBelow: true,
              onUpdate: this.transitionOut,
              data: { x: 400, y: 300 }
          });

      }, this);
  },

  transitionOut: function (progress)
  {
      this.crow.y = (600 * progress);
  }

});