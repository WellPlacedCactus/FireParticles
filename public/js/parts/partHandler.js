
class PartHandler {

  constructor(parts) {
    this.parts = parts;
  }

  add(p) {
    if (p instanceof Part) {
      this.parts.push(p);
    }
  }

  tick() {
    for (let i = this.parts.length - 1; i >= 0; --i) {
      const p = this.parts[i];
      p.tick();
      if (p.dead) {
        this.parts.splice(i, 1);
      }
    }
  }

  draw(c) {
    for (let i = this.parts.length - 1; i >= 0; --i) {
      const p = this.parts[i];
      p.draw(c);
    }
  }
}