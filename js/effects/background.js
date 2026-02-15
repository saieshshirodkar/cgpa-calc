const canvas = document.getElementById('bg-canvas');

let width, height;
let dots = [];
const spacing = 30;
let mouse = { x: -1000, y: -1000 };
let ctx = null;
let animationId = null;

function initCanvas() {
  if (!canvas || !ctx) return;
  
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  dots = [];
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      dots.push({
        baseX: x,
        baseY: y,
        x: x,
        y: y
      });
    }
  }
}

function animate() {
  if (!ctx || !canvas) return;
  
  ctx.clearRect(0, 0, width, height);

  dots.forEach(dot => {
    const dx = mouse.x - dot.baseX;
    const dy = mouse.y - dot.baseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 100;

    if (dist < maxDist) {
      const force = (maxDist - dist) / maxDist;
      dot.x = dot.baseX - dx * force * 0.1;
      dot.y = dot.baseY - dy * force * 0.1;
      ctx.fillStyle = `rgba(150, 150, 150, ${0.3 + force * 0.4})`;
    } else {
      dot.x = dot.baseX;
      dot.y = dot.baseY;
      ctx.fillStyle = 'rgba(70, 70, 70, 0.2)';
    }

    ctx.beginPath();
    ctx.arc(dot.x, dot.y, 0.8, 0, Math.PI * 2);
    ctx.fill();
  });

  animationId = requestAnimationFrame(animate);
}

export function initBackground() {
  if (!canvas) {
    console.warn('Canvas element #bg-canvas not found, background animation disabled');
    return;
  }
  
  try {
    ctx = canvas.getContext('2d');
    if (!ctx) {
      console.warn('Could not get 2D context for canvas');
      return;
    }
  } catch (e) {
    console.error('Error initializing canvas context:', e);
    return;
  }
  
  window.addEventListener('resize', initCanvas);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  initCanvas();
  animate();
}

export function destroyBackground() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}
