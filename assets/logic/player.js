export class Player {
    constructor({
        parent = document.body,
        width,
        height,
        frameCount,
        frameSpeed = 24,
    }) {

        this.parent = parent;

        this.element = document.createElement("div");
        this.element.id = "player";
        parent.appendChild(this.element);
        this.width = width;
        this.height = height;
        this.frameWidth = width;
        this.frameHeight = height;
        this.frameCount = frameCount;
        this.frameDuration = 1 / frameSpeed;
        this.frameDistance = 91;
        this.currentFrame = 0;
        this.frameTimer = 0;
        console.log(parent);
        this.x = 100;
        this.y = 300;
        this.yVelocity = 0;
        this.xVelocity = 0;
        this.speed = 200;
        this.gravity = 800;
        this.jumpForce = -400;
        this.groundY = 300;
        this.onGround = true;
        this.moving = false;
        this.lives = 3;
        this.mouseDown = false;

        this.element.style.position = "absolute";
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.style.backgroundImage = "url('/assets/img/logo.png')";
        this.element.style.backgroundRepeat = "no-repeat";
        this.element.style.backgroundPosition = "0px 0px";

        this.keys = {};
        document.addEventListener("keydown", (e) => (this.keys[e.code] = true));
        document.addEventListener("keyup", (e) => (this.keys[e.code] = false));
        document.addEventListener("mousedown", () => {this.mouseDown = true;});
        document.addEventListener("mouseup", () => {this.mouseDown = false;});

    }

    update(deltaTime) {
        this.xVelocity = 0;
        const containerWidth = this.parent.clientWidth;
        const containerHeight = this.parent.clientHeight;

        if (this.keys["ArrowLeft"] || this.keys["KeyA"]) {
            this.xVelocity = -this.speed
            this.moving = true;
        }
        if (this.keys["ArrowRight"] || this.keys["KeyD"]) {
            this.xVelocity = this.speed
            this.moving = true;
        }
        if ((this.keys["Space"] || this.mouseDown) && this.onGround) { 
            this.jump();
        }
        
        this.x += this.xVelocity * deltaTime;
        this.yVelocity += this.gravity * deltaTime;
        this.y = this.y + (this.yVelocity * deltaTime);

        if (this.y >= this.groundY) {
            this.y = this.groundY;
            this.yVelocity = 0;
            this.onGround = true;
        }


        if (this.x < 0) this.x = 0;
        if (this.x + this.width > containerWidth)
            this.x = containerWidth - this.width;
        if (this.y < 0) this.y = 0;
        if (this.y + this.height > containerHeight)
            this.y = containerHeight - this.height;


        this.frameTimer += deltaTime;
        if (this.moving == true) {
            if (this.frameTimer >= this.frameDuration) {
                this.frameTimer = 0;
                this.currentFrame = (this.currentFrame + 1) % this.frameCount;
            }
        }

        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.moving = false;
    }

    loseLife() {
        this.lives--;
        console.log("Lives:", this.lives);

        if (this.lives <= 0) {
            console.log("gameover");
        }
    }


    jump(){
        this.yVelocity = this.jumpForce;
        this.onGround = false;
        this.moving = true;
    }
    draw() {
        this.element.style.backgroundPositionX =
            this.currentFrame * (this.frameWidth + this.frameDistance) * -1 + "px";
    }
}
