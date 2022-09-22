const canvas  = document.getElementById('explosion');
const ctx     = canvas.getContext('2d');
const particlesArray = [];
let hue = 0;


canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
    canvas.width  = window.innerWidth; 
    canvas.height = window.innerHeight;
});

const mouse = {
    x:undefined,
    y:undefined
};

class Particles {
    constructor() {
        this.x      = mouse.x;
        this.y      = mouse.y;
        this.size   = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5; 
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > .2) {
            this.size -= .1;
        }
    }

    draw() {
        ctx.fillStyle = 'hsl('+hue+', 100%, 50%)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();      
    }
}



function handleParticles() {
    for(let i=0; i<particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if(particlesArray[i].size <= .3) {
            particlesArray.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, .1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    hue++;
    requestAnimationFrame(animate);    
}

animate();


canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i=0; i<10; i++) {
        particlesArray.push(new Particles());
    }
});