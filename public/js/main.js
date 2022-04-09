
(()=>{

  // ----------------------------------------------- variables
  const canvas = document.querySelector('canvas');
  const c = canvas.getContext('2d');
  const mouse = {};
  mouse.x = 0;
  mouse.y = 0;
  mouse.down = false;

  // ----------------------------------------------- functions
  const randint = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  const demo = () => {
    
    const partHandler = new PartHandler([]);

    const loop = () => {

      // ------------------------------------------- add
      if (mouse.down) {
        for (let i = 0; i < 10; i++) {
          partHandler.add(new Part(
            mouse.x,
            mouse.y,
            randint(0, 59),
            1,
            Math.random() * Math.PI * 2,
            Math.random() * 5,
            -Math.random() * 0.1,
            Math.random() * 0.05,
            -0.05
          ));
        }
      }

      // ------------------------------------------- tick
      partHandler.tick();
    
      // ------------------------------------------- clear
      c.fillStyle = 'black';
      c.fillRect(0, 0, canvas.width, canvas.height);
    
      // ------------------------------------------- draw
      c.save();
      c.globalCompositeOperation = 'lighter';
      partHandler.draw(c);
      c.restore();
    
      // ------------------------------------------- loop
      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  };

  // ----------------------------------------------- event handlers
  addEventListener('load', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    demo();
  });

  addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  });

  addEventListener('mousemove', ({x, y}) => {
    mouse.x = x;
    mouse.y = y;
  });

  addEventListener('mousedown', () => {
    mouse.down = true;
  });

  addEventListener('mouseup', () => {
    mouse.down = false;
  });

  addEventListener('touchstart', ({touches}) => {
    const t = touches[0];
    mouse.x = t.clientX;
    mouse.y = t.clientY;
    mouse.down = true;
  });

  addEventListener('touchend', () => {
    mouse.down = false;
  });

  addEventListener('touchmove', ({touches}) => {
    const t = touches[0];
    mouse.x = t.clientX;
    mouse.y = t.clientY;
  });

})();