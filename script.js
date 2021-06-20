const mousePos = { x: 0, y: 0 }
const voidlings = [];

const script = document.createElement('script');
script.src = 'p5.js';
document.body.appendChild(script);

document.addEventListener('mousemove', e => {
    mousePos.x = e.x;
    mousePos.y = e.y;
});

document.addEventListener('resize',e=>{

});

function setup() {
    const canvas = createCanvas(visualViewport.width, visualViewport.height);
    canvas.elt.style = 'position:fixed; top:0;left:0;width:100vw;height:100vh';


    background(110);
    voidlings.push(new Voidling(0, 0));
    voidlings.push(new Voidling(0, 0));
    voidlings.push(new Voidling(0, 0));
    voidlings.push(new Voidling(0, 0));
    voidlings.push(new Voidling(0, 0));
    voidlings.push(new Voidling(0, 0));


    setInterval(() => {
        voidlings.forEach(v => {
            v.setTarget({
                x: mousePos.x + random(40) - 20,
                y: mousePos.y + random(40) - 20
            })
        })
    }, 500)
}

function draw() {
    clear();
    tick();
    voidlings.forEach(v => v.render());
    noStroke();
    fill(0);
}

function tick() {
    voidlings.forEach(v => v.tick());
}


class Voidling {

    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed = 5;
        this.maxForce = 0.25;
        this.size = random(5, 12);
        this.tailLength = Math.floor(random(20, 30));
        this.tail = []
        this.target = { x: 0, y: 0 }
        this.color = color(0);
    }

    render() {
        push();

        noStroke();
        fill(this.color);
        circle(this.pos.x, this.pos.y, this.size);

        let lastPoint = this.pos;

        stroke(this.color);
        this.tail.forEach((p, i) => {
            strokeWeight(this.size / (this.tail.length + 1) * i);
            line(lastPoint.x, lastPoint.y, p.x, p.y);
            lastPoint = p;
        });

        pop();
    }

    applyForce(force) {
        this.acc.add(force);
    }

    tick() {
        const posVec = createVector(this.target.x, this.target.y);
        const force = p5.Vector.sub(posVec, this.pos);
        force.setMag(this.maxSpeed);
        force.sub(this.vel);
        force.limit(this.maxForce);
        this.applyForce(force);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
        this.tail.push(this.pos.copy());
        if (this.tail.length == this.tailLength) {
            this.tail.splice(0, 1);
        }
    }

    setTarget(target) {
        this.target = target;
    }
}