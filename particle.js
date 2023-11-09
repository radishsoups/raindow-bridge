class Particle {
    constructor(x, y, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.w = 54;
        this.h = 24;

        // current frame and total frames
        this.totalFrames = int(particleImg.width / this.w);
        this.currentFrame = 0;

        // slowing animation
        this.pauseCounter = 0;
        this.pauseCounterMax = 20;
    }

    moveAndDisplay() {
        image(particleImg, this.x, this.y, this.w, this.h,
            this.currentFrame * this.w, 0, this.w, this.h);

        // decrease pause counter
        this.pauseCounter--;

        // refresh animation
        if (this.pauseCounter <= 0) {
            this.currentFrame += 1;
            if (this.currentFrame >= this.totalFrames) {
                this.currentFrame = 0;
            }
            this.pauseCounter = this.pauseCounterMax;
        }

        // movement
        this.x += this.speedX;
        this.y += this.speedY;

        // bounce off the walls
        if (this.x < 50 || this.x > width - 50) {
            this.speedX *= -1;
        }

        if (this.y < 50 || this.y > height - 50) {
            this.speedY *= -1;
        }
        
        // were the sprites collected?
        if (mouseIsPressed && (dist(this.x + (this.w / 2), this.y + (this.h / 2), mouseX, mouseY) < 30)) {
            pops.play();
            this.x = -100;
            this.y = -100;
            this.speed = 0;
            particlePoint++;
            return "done";
        }
    }
}