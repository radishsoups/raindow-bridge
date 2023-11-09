let show = true;

class Box {
    constructor(x, y, fish) {
        this.x = x;
        this.y = y;
        this.saveX = x;
        this.saveY = y;
        this.fish = fish;
    }

    display() {
        if (this.fish === true) {
            fish.resize(50, 50)
            imageMode(CENTER);
            image(fish, this.saveX, this.saveY);
        }

        imageMode(CENTER);
        boxImg.resize(100, 100);
        image(boxImg, this.x, this.y);
    }

    collision(rX, rY) {
        // determine if collision exists
        if (dist(rX, rY, this.x, this.y) < 50) {
            this.x = -100;
            this.y = -100;
            if (this.fish == true) {
                return true;
            }
        }
    }
}