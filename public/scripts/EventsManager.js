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
      this.scene.events.emit("updateSouls", prevSouls, this.scene.player.souls);
      console.log('inside event listener')
      //remove item
      this.scene.item.makeInactive(itemID);
    })
  }
}