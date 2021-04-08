import Player from "./Player.js"
import Enemy from "./Enemy.js"

export default class MainScene extends Phaser.Scene {
  constructor(){
    super("MainScene");
  }

  preload() {
    // console.log("preload")
    Player.preload(this);
    Enemy.preload(this);
    this.load.image('bottom_map', 'assets/map/bottom_map_test.png');
    this.load.image("obstacles", "assets/map/overlay_map_test.png");
    // this.load.tilemapTiledJSON('map','assets/images/FULLMAP.json')
  }

  create() {
    // console.log(this.textures.getTextureKeys());
    // console.log("create")

    // const map = this.make.tilemap({key: 'map'});
    // const tileset = map.addTilesetImage('FULLMAP', 'tiles',32,32,0,0)
    // const layer1 = map.createStaticLayer('BOTTOM',tileset,0,0);

    let layer1 = this.add.image(305, 150, "bottom_map");
    let layer2 = this.add.image(305, 150, "obstacles");




    // // // Enze map code?
    // let map = this.make.tilemap({ key: "map" });
    // let background = new Image(0);

    // // limit camera to map
    // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // this.cameras.main.startFollow(this.player);
    // this.cameras.main.roundPixels = true; // avoid tile bleed


    //player character
    this.player = new Player({scene:this,x:0,y:0,texture:'ashen_one',frame:'player_0'});



    //test collision character
    this.enemy = new Enemy({scene:this,x:100,y:100,texture:'skeleton',frame:'skele_idle0'});

    // character input keys
    this.player.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    })
  }

  update(){
    this.player.update();

    // something breaking enemy - Kevin
    // this.enemy.update();
  }
}