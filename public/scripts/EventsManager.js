class EventsManager {
  constructor(scene, mapData) {
    this.scene = scene;
  }
  setup() {
    this.setupEventListener();
  }
  setupEventListener() {
    this.scene.events.on("pickupItem", (itemID) => {
      //update Soul Counter
      let prevSouls = this.scene.player.souls;
      this.scene.player.updateSouls(300);  //currently all soulItems give a hard-coded 300 souls.
      console.log("pickup? ", this.scene.player);
      this.scene.events.emit("updateSouls", prevSouls, this.scene.player.souls);
      //remove item
      this.scene.item.makeInactive(itemID);
    })

    this.scene.events.on("deathClear", () => {
      console.log("before? ", this.scene.player);
      this.scene.player.souls = 0;
      this.scene.player.health = 5;
      console.log("After? ", this.scene.player);


    })
  }
}