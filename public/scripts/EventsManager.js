class EventsManager {
  constructor(scene, mapData) {
    this.scene = scene;
    this.mapData = mapData;
  }
  setup() {
    this.setupEventListener();
  }
  
}