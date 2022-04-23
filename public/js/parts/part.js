
// ----------------------------------------------- chache

const generateImage = (r, h) => {
  const image = document.createElement('canvas');
  const imageContext = image.getContext('2d');

  image.width = 500;
  image.height = 500;

  // ----------------------------------------------- draw shadow
  imageContext.shadowColor = `hsl(${h}, 100%, 50%)`;
  imageContext.shadowBlur = r * 2;

  // ----------------------------------------------- draw square
  imageContext.beginPath();
  imageContext.rect(
    image.width / 2 - r,
    image.height / 2 - r,
    r * 2,
    r * 2
  );
  imageContext.closePath();
  imageContext.fillStyle = `hsl(${h}, 100%, 50%)`;
  imageContext.fill();

  return image;
};

const CACHE = [];

for (let h = 0; h < 60; h++) {
  CACHE[h] = generateImage(20, h); // 15
}

// ----------------------------------------------- class
class Part {

  constructor(x, y, h, a, d, m, aa, dd, mm) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.a = a;
    this.d = d;
    this.m = m;
    this.aa = aa;
    this.dd = dd;
    this.mm = mm;
    this.dead = false;
  }

  die() {
    this.dead = true;
  }

  tick() {
    this.x += Math.cos(this.d) * this.m;
    this.y += Math.sin(this.d) * this.m;

    this.a += this.aa;
    this.d += this.dd;
    this.m += this.mm;

    if (
      this.m < 0 ||
      this.a < 0) {
      this.die();
    }
  }

  draw(c) {
    c.save();
    c.globalAlpha = this.a;
    c.translate(
      this.x,
      this.y
    );
    c.rotate(this.d);
    c.drawImage(
      CACHE[this.h],
      -CACHE[this.h].width / 2,
      -CACHE[this.h].height / 2
    );
    c.restore();
  }
}