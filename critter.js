class Critter {
    constructor(x, y, w, h, image, index) {
        this.img = image;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = 3;
        this.image = image;
        this.index = index;

        // current frame and total frames
        this.totalFrames = int(this.img.width / this.w);
        this.currentFrame = 0;

        // slowing animation
        this.pauseCounter = 0;
        this.pauseCounterMax = 20;
    }

    display() {
        image(this.img, this.x, this.y, this.w, this.h,
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
    }

    move() {
        // moves according to mouse position
        if (dist(mouseX, mouseY, this.x + 40, this.y + 25) < 20) {
            if (mouseX > this.x + 40) {
                this.x -= this.speed;
                this.img = this.index;
            }
            if (mouseX < this.x + 40) {
                this.x += this.speed;
                this.img = this.image;
            }
            if (mouseY > this.y + 25) {
                this.y -= this.speed;
            }
            if (mouseY < this.y + 25) {
                this.y += this.speed;
            }
        }
    }

    round() {
        if (this.x > 270 && this.x < 335 && this.y < 108) {
            this.x = -100;
            this.y = -100;
            return true;
        }
        return false;
    }
}