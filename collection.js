class Collectible {
    constructor(graphic, x, y, target, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.target = target;
        this.speedX = speedX;
        this.speedY = speedY;
        this.graphic = graphic;
    }

    display() {
        imageMode(CENTER);
        image(this.graphic, this.x, this.y);
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;

        // constraints
        if (this.x < 25 || this.x > width - 25) {
            this.speedX *= -1;
        }
        if (this.y < 25 || this.y > height - 25) {
            this.speedY *= -1;
        }

        this.speed += 0.01;

        if (this.target === true && dist(this.x, this.y, mouseX, mouseY) < 20) {
            if (collected === true) {
                this.x = mouseX;
                this.y = mouseY;
            }
        }

        if (dist(this.x, this.y, 50, 450) < 10 && dist(mouseX, mouseY, 50, 450) < 10 && collected === true) {
            finished = true;
        }
    }
}