class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.loadImages();
    this.loadSpriteSheets();
    // this.loadAudio();
    this.loadTilemap();
  }

  loadImages() {
    this.load.image('bottom', 'public/assets/map/FULLMAP_bottom.png');
    this.load.image('overlay', 'public/assets/map/FULLMAP_overlay.png');
    // this.load.image('collision', 'public/assets/map/FULLMAP_collision.png');
    
  }

  loadSpriteSheets() {
    // this.load.spritesheet('player', 'public/assets/sprites/PLAYER.png', { frameWidth: 32, frameHeight: 50 });
    this.load.atlas('sheet', 'public/assets/map/fullmap-collision-atlas.png', 'public/assets/map/fullmap-collision-atlas_atlas.json');
    // this.load.spritesheet('skele', 'public/assets/skele_sprites/skele_idle.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('bird', 'public/assets/sprites/bird.png',{ frameWidth: 128, frameHeight: 109 });
    this.load.spritesheet('petrus', 'public/assets/sprites/petrus.png',{ frameWidth: 34, frameHeight: 52 });
    this.load.spritesheet('reah', 'public/assets/sprites/reah.png',{ frameWidth: 23, frameHeight: 39 });
    this.load.spritesheet('laurentius', 'public/assets/sprites/laurentius.png',{ frameWidth: 26, frameHeight: 32 });
    this.load.spritesheet('bigHatLogan', 'public/assets/sprites/bigHatLogan.png',{ frameWidth: 40, frameHeight: 34 });
    this.load.spritesheet('fireKeeper', 'public/assets/sprites/fireKeeper.png',{ frameWidth: 96, frameHeight: 67 });
    this.load.spritesheet('griggs', 'public/assets/sprites/griggs.png',{ frameWidth: 32, frameHeight: 54 });
    this.load.spritesheet('crestfallenWarrior', 'public/assets/sprites/crestfallenWarrior.png',{ frameWidth: 70, frameHeight: 36 });
    this.load.spritesheet('lautrec', 'public/assets/sprites/lautrec.png',{ frameWidth: 25, frameHeight: 35 });
  }

  // loadAudio() {

  // }

  loadTilemap() {
    //bottom/overlay map JSON file
    this.load.tilemapTiledJSON('map','public/assets/map/Firelink_Shrine.json');
    
    //collision map JSON file
    this.load.json('shapes', 'public/assets/map/FULLMAP_collision.json');
  }

  create() {
    this.scene.start('Game');
  }
}