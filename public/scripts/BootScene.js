class BootScene extends Phaser.Scene {

  constructor() {

    super('Boot');

  }

  preload() {

    // load images
    this.loadImages();
    // load spritesheets
    this.loadSpriteSheets();
    // load audio
    // this.loadAudio();
    //load tilemap
    this.loadTilemap();

    // this.loadPlayersJsonFiles();

  
  }

  loadImages() {
    this.load.image('button1', 'public/assets/entities/blue_button01.png');
    this.load.image('button2', 'public/assets/entities/blue_button02.png');
    this.load.image('bottom', 'public/assets/map/FULLMAP_bottom.png');
    this.load.image('overlay', 'public/assets/map/FULLMAP_overlay.png');
    this.load.image('collision', 'public/assets/map/FULLMAP_collision.png');
  }

  loadSpriteSheets() {
    this.load.spritesheet('player', 'public/assets/sprites/PLAYER.png', { frameWidth: 32, frameHeight: 50 });
  }

  loadPlayersJsonFiles(){
    this.load.atlas('player2','public/assets/character_sprites/ashen_one.png','public/assets/character_sprites/ashen_one_atlas.json')
    this.load.animation('player2','public/assets/character_sprites/ashen_one_anim.json')

  }

  // loadAudio() {

  // }

  loadTilemap() {
    //map JSON file
    this.load.tilemapTiledJSON('map','public/assets/map/Firelink_Shrine.json');
  }

  create() {
    this.scene.start('Game');
  }
}