const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let dots = [];
const spacing = 30;
let mouse = { x: -1000, y: -1000 };

function initCanvas() {
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

window.addEventListener('resize', initCanvas);
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function animate() {
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

    requestAnimationFrame(animate);
}

initCanvas();
animate();
