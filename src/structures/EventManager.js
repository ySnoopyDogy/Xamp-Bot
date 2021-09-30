class EventManager {
  constructor(client) {
    this.client = client;
  }

  add(event) {
    event.run = event.run.bind(event);
    this.client.on(event.name, event.run);
  }
}

module.exports = EventManager