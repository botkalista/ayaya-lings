

/**
 * @typedef LingsOptions
 * @property {number} number
 * @property {number} range
 * @property {number} minSize
 * @property {number} maxSize
 * @property {number} minTailSize
 * @property {number} maxTailSize
 * @property {number} maxSpeed
 * @property {number} maxForce
 */


/**
 * @param {LingsOptions} options 
 */
function createLings(options) {

    options.number = options.number || 6;
    options.range = options.range || 40

    options.maxSpeed = options.maxSpeed || 5;
    options.maxForce = options.maxForce || 0.25;

    options.minSize = options.minSize || 5;
    options.maxSize = options.maxSize || 12;

    options.minTailSize = options.minTailSize || 20;
    options.maxTailSize = options.maxTailSize || 30;


    const mousePos = { x: 0, y: 0 }
    const voidlings = [];

    // const script = document.createElement('script');
    // script.src = 'p5.js';
    // document.body.appendChild(script);

    document.addEventListener('mousemove', e => {
        mousePos.x = e.x;
        mousePos.y = e.y;
    });

    function setup() {
        const canvas = createCanvas(visualViewport.width, visualViewport.height);
        canvas.elt.style = 'position:fixed; top:0;left:0;width:100vw;height:100vh';


        background(110);
        for (let i = 0; i < options.number; i++) {
            voidlings.push(new Voidling(0, 0));
        }

        setInterval(() => {
            voidlings.forEach(v => {
                v.setTarget({
                    x: mousePos.x + random(options.range) - options.range / 2,
                    y: mousePos.y + random(options.range) - options.range / 2
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
            this.maxSpeed = options.maxSpeed;
            this.maxForce = options.maxForce;
            this.size = random(minSize, maxSize);
            this.tailLength = Math.floor(random(minTailSize, maxTailSize));
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

    window.setup = setup;
    window.draw = draw;
}



