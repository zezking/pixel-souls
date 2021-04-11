class EventsManager {
  constructor(scene, mapData) {
    this.scene = scene;
  }

  setupEventListener() {
    this.scene.events.on('pickupItem', (itemID) => {
      

    })
  }
}