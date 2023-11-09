class Cat {
    constructor(x, y, w, h, img, imgs) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
        this.imgs = imgs;

        // compute how many frames we have by computing the overall width
        // of the sprite and dividing by the cell width
        this.totalFrames = int(this.img.width / this.w);

        // keep track of which frame / cell we are going to render
        this.currentFrame = 0;

        // a pause counter to slow down the animation (optional)
        this.pauseCounter = 0;
        this.pauseCounterMax = 7;
    }

    display() {
        imageMode(CORNER);
        image(this.img, this.x, this.y, this.w, this.h,
            this.currentFrame * this.w, 0, this.w, this.h);
    }

    move() {
        if (keyIsDown(LEFT_ARROW)) {
            this.img = this.imgs[0];
        }
        if (keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW) || keyIsDown(RIGHT_ARROW) || keyIsDown(LEFT_ARROW)) {
            this.animation();
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.img = this.imgs[1];
        }
    }

    animation() {
        // decrease our pause counter
        this.pauseCounter--;

        // if we have counted down enough we can trigger another animation
        // frame cycle
        if (this.pauseCounter <= 0) {
            this.currentFrame += 1;
            if (this.currentFrame >= this.totalFrames) {
                this.currentFrame = 0;
            }
            this.pauseCounter = this.pauseCounterMax;
        }
    }
}