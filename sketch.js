let x = 250;
let y = 0;
let state = 6;
let imgs = [];
let bg;
let offsetX = 0, offsetY = 0;
let speed = 3.7;
let play = false;
let keyCount = 0;
let returning = false;

// for end screen
let fade;
let fadeAmt = 1;
let scroll = true;
let bridge = false;

// for collection game
let collectItems = [];
let collected = false;
let finished = false;

// roundup game
let critterX = 250;
let critterY = 250;
let critters = [];
let counter = 0;
let rounded = false;
let cats = [];

// finding game
let boxes = [];
let rX = 50;
let rY = 60;
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;
let entered = false;
let idex = 0;
let fishFound = false;

// particle game
let particles = [];
let particlePoint = 0;
let particleImg;
let jar;

function preload() {
    // background
    bg = loadImage('images/bg2.png');
    bg2 = loadImage('images/bg.png');

    // fonts
    font = loadFont('VPPixel-Simplified.otf');

    // for map
    girl = loadImage('images/girl.gif');
    keyImg = loadImage('images/key.png');
    keyImg2 = loadImage('images/key.png');
    pond = loadImage("images/pond.png");
    house = loadImage('images/roundup/house.png');
    box1 = loadImage('images/find/box.png');
    jarImg = loadImage('images/particle/jar.png');
    rainbow = loadImage('images/rainbow.png');

    // character sprite images
    for (let i = 0; i < 3; i++) {
        imgs[i] = loadImage('images/' + i + '.png');
    }

    // roundup game
    roundupBackground = loadImage('images/roundup/roundBack.png');
    houseImg = loadImage('images/roundup/house.png');

    for (let i = 0; i < 10; i++) {
        cats[i] = loadImage("images/roundup/cat" + (i + 1) + ".png");
    }

    // collection game
    sardine = loadImage("images/collect/sardine.png");
    puff = loadImage("images/collect/puff.gif");
    hook = loadImage("images/collect/hook.png");
    chestClosed = loadImage("images/collect/chestClosed.png");
    chestOpen = loadImage("images/collect/chestOpen.png");
    water = loadImage("images/collect/water.png");

    // particle game
    particleImg = loadImage('images/particle/spriteMove.png');
    jar = loadImage('images/particle/jar.png');

    // find game
    boxImg = loadImage('images/find/box.png');
    fish = loadImage('images/find/anchovy.png');
    fish2 = loadImage('images/find/anchovy.png');

    // sounds
    meow = loadSound("sounds/meow.mp3");
    pops = loadSound("sounds/pop.mp3");
    music = loadSound("sounds/bgMusic.mp3");
    steps = loadSound("sounds/footsteps.wav");
    underwater = loadSound("sounds/underwater.wav");
    bell = loadSound("sounds/bell.wav");
    ending = loadSound("sounds/ending.mp3");
}

function setup() {
    let c = createCanvas(600, 500);
    c.parent("#container");

    // for end screen
    fade = 0;

    // setup for collecting game
    for (let i = 0; i < 100; i++) {
        if (i === 0) {
            collectItems.push(new Collectible(puff, random(100, width), random(0, 400), true, 5, 5));
        }
        else {
            collectItems.push(new Collectible(sardine, random(100, width), random(0, 400), false, random(-5, 5), random(-5, 5)));
        }
    }

    // for roundup game
    let catidex = 0;
    for (let i = 0; i < 10; i++) {
        // generate starting point
        critterX = random(85, width - 90);
        critterY = random(100, height - 90);

        // for changing images later
        if (catidex > 5) {
            catidex = 0;
        }
        critters[i] = new Critter(critterX, critterY, 80, 50, cats[i], cats[i + 5]);
    }

    // for finding game
    let randCol = int(random(4));
    let randRow = int(random(5))
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 5; x++) {
            let xpos = x * 125;
            let ypos = y * 125;
            if (y == randRow && x == randCol) {
                boxes.push(new Box(xpos + 50, ypos + 60, true));
            }
            else {
                boxes.push(new Box(xpos + 50, ypos + 60, false));
            }
        }
    }

    // particle game
    for (let i = 0; i < 50; i++) {
        let temp = new Particle(width / 2, height / 2, random(-5, 5), random(-5, 5));
        particles.push(temp);
    }

    // user object
    cat = new Cat(width / 2 - 30, height / 2, 68, 40, imgs[1], imgs);
    backgroundMusic();
}

function draw() {
    if (state === 0) {
        steps.stop();

        imageMode(CENTER);
        image(bg2, width / 2, height / 2);

        // instructions
        textSize(18);
        textFont(font);
        textAlign(CENTER);
        text('Collection', width / 2, height / 3);

        textSize(14);
        text('Instructions: using your mouse, catch the pufferfish\n and drag it to the chest in the lower left corner', width / 2, height / 2);

        textSize(18);
        text('PRESS SPACE TO PLAY', width / 2, 400);

        if (play === true) {
            if (underwater.isPlaying() == false) {
                underwater.play();
                underwater.setLoop(true);
            }

            image(water, width / 2, height / 2);

            if (dist(mouseX, mouseY, 50, 450) < 50) {
                image(chestOpen, 38.5, 444);
            }
            else {
                image(chestClosed, 50, 450);
            }

            collectItems[0].display();
            collectItems[0].move();

            for (let i = 1; i < collectItems.length; i++) {
                collectItems[i].display();
                collectItems[i].move();
            }

            // changing mouse
            noCursor();
            image(hook, mouseX + 3, mouseY - 12);

            if (finished === true) {
                state = 7;
                underwater.stop();
            }
        }
    }
    if (state === 1) {
        steps.stop();
        cursor();
        imageMode(CENTER);
        image(bg2, width / 2, height / 2);

        // instructions
        textSize(18);
        textFont(font);
        textAlign(CENTER);
        text('Round Up', width / 2, height / 3);

        textSize(14);
        text('Instructions: use your mouse to guide all the cats into the house', width / 2, height / 2);

        textSize(18);
        text('PRESS SPACE TO PLAY', width / 2, 400);

        if (play === true) {
            // use your mouse to herd the animals to the house
            // background and house
            imageMode(CORNER);
            image(roundupBackground, 0, 0);
            image(houseImg, 225, 10);

            // displaying cats
            for (let i = 0; i < 5; i++) {
                critters[i].display();
                critters[i].move();
                rounded = critters[i].round();

                // increment counter if cat goes home
                if (rounded === true) {
                    counter++;
                    meow.play();
                }
            }

            // game complete
            if (counter === 5) {
                state = 7;
            }
        }
    }
    if (state === 2) {
        steps.stop();
        imageMode(CENTER);
        image(bg2, width / 2, height / 2);

        // instructions
        textSize(18);
        textFont(font);
        textAlign(CENTER);
        text('Find the Fish', width / 2, height / 3);

        textSize(14);
        text('Instructions: use the arrow keys to choose a box and find the hidden object. \nPress enter to reveal what is in each box', width / 2, height / 2);

        textSize(18);
        text('PRESS SPACE TO PLAY', width / 2, 400);

        if (play === true) {
            // press ENTER to lift a box. Use the keyboard arrow keys to move the selector (the green square)
            background(238);

            for (let i = 0; i < boxes.length; i++) {
                boxes[i].display();
            }
            strokeWeight(1);

            noFill();
            stroke(108, 118, 91);
            strokeWeight(2);
            rectMode(CENTER);
            rect(rX, rY, 100);

            if (entered === true) {
                fishFound = boxes[idex].collision(rX, rY);
            }
            entered = false;

            if (leftPressed === true && rX > 50) {
                rX -= 125;
                rect(rX, rY, 100);
                idex--;
            }
            leftPressed = false;

            if (rightPressed === true && rX < 550) {
                rX += 125;
                rect(rX, rY, 100);
                idex++;
            }
            rightPressed = false;

            if (upPressed === true && rY > 60) {
                rY -= 125;
                rect(rX, rY, 100);
                idex -= 5;
            }
            upPressed = false;

            if (downPressed === true && rY < 435) {
                rY += 125;
                rect(rX, rY, 100);
                idex += 5;
            }
            downPressed = false;

            if (fishFound === true) {
                state = 7;
            }
        }
    }
    if (state === 3) {
        steps.stop();
        imageMode(CENTER);
        image(bg2, width / 2, height / 2);

        // instructions
        textSize(18);
        textFont(font);
        textAlign(CENTER);
        text('Sprites', width / 2, height / 3);

        textSize(14);
        text('Instructions: Press and hold the mouse to collect all the sprites', width / 2, height / 2);

        textSize(18);
        text('PRESS SPACE TO PLAY', width / 2, 400);

        if (play === true) {
            // press and hold the mouse to collect the sprites in your jar
            background(173, 135, 98);
            noCursor();

            drawBox();
            // changing cursor to jar image
            imageMode(CENTER);
            image(jar, mouseX, mouseY);

            for (let i = 0; i < particles.length; i++) {
                let status = particles[i].moveAndDisplay();
                if (status === "done") {
                    particles.splice(i, 1);
                    i = i - 1;
                }
            }

            if (particlePoint === 50) {
                state = 7;
            }
        }
    }
    if (state === 4) {
        state = 4;
        play = false;
        cursor();
        background(128);
        imageMode(CENTER);
        image(bg, offsetX, offsetY);

        // collection game
        image(pond, offsetX - 1000, offsetY - 1200);
        if (dist(cat.x, cat.y, offsetX - 1000, offsetY - 1200) < 100 && dist(cat.x, cat.y, offsetX - 1000, offsetY - 1200) < 50 && finished == false) {
            clear();
            state = 0;
        }

        // roundup game
        image(house, offsetX + 1000, offsetY + 1200);
        if (dist(cat.x, cat.y, offsetX + 1000, offsetY + 1200) < 50 && counter != 5) {
            clear();
            state = 1;
        }

        // finding game
        fish2.resize(40, 40);
        image(fish2, offsetX + 1000, offsetY - 1200);
        if (dist(cat.x, cat.y, offsetX + 1000, offsetY - 1200) < 45 && dist(cat.x, cat.y, offsetX + 1000, offsetY - 1200) > 25 && fishFound == false) {
            clear();
            state = 2;
        }

        // particle game
        box1.resize(53.5, 50.5);
        image(box1, offsetX - 1000, offsetY + 1200);
        if (dist(cat.x, cat.y, offsetX - 1000, offsetY + 1200) > 20 && dist(cat.x, cat.y, offsetX - 1000, offsetY + 1200) < 30 && particlePoint != 50) {
            clear();
            state = 3;
        }

        if (offsetX < -1200) {
            offsetX = -1200;
        }
        if (offsetX > 1750) {
            offsetX = 1750;
        }
        if (offsetY < -1200) {
            offsetY = -1200;
        }
        if (offsetY > 1750) {
            offsetY = 1750;
        }

        // moving character
        cat.display();
        cat.move();

        // footsteps sound effect
        if (keyIsDown(LEFT_ARROW)) {
            if (steps.isPlaying() == false) {
                steps.play();
                steps.setLoop(true);
            }
        }
        else if (keyIsDown(RIGHT_ARROW)) {
            if (steps.isPlaying() == false) {
                steps.play();
                steps.setLoop(true);
            }
        }
        else if (keyIsDown(UP_ARROW)) {
            if (steps.isPlaying() == false) {
                steps.play();
                steps.setLoop(true);
            }
        }
        else if (keyIsDown(DOWN_ARROW)) {
            if (steps.isPlaying() == false) {
                steps.play();
                steps.setLoop(true);
            }
        }
        else {
            steps.stop();
        }

        // background movement
        if (keyIsDown(LEFT_ARROW)) {
            offsetX += speed;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            offsetX -= speed;
        }
        if (keyIsDown(UP_ARROW)) {
            offsetY += speed;
        }
        if (keyIsDown(DOWN_ARROW)) {
            offsetY -= speed;
        }

        if (cat.y < -1200) {
            speed = 0;
        }

        if (keyCount === 4) {
            state = 8;

            offsetX = 0;
            offsetY = 0;
        }
    }
    if (state === 5) {
        music.stop();

        if (ending.isPlaying() == false) {
            ending.play();
            ending.setLoop(true);
        }
        speed = 3.9;
        imageMode(CENTER);
        image(bg2, width / 2, height / 2);
        image(rainbow, width / 2, height / 2 - 30);

        cat.display();
        cat.move();

        textFont(font);
        textAlign(LEFT);
        fill(0);
        text('Just this side of heaven is a place called Rainbow Bridge. \t\t\t\t\t\t When an animal dies that has been especially close to someone here, that pet goes to Rainbow Bridge. There are meadows and hills for all of our special friends so they can run and play together. There is plenty of food, water and sunshine, and our friends are warm and comfortable. \t\t\t\t\t\t They all run and play together, but the day comes when one suddenly stops and looks into the distance. His bright eyes are intent. His eager body quivers. Suddenly he begins to run from the group, flying over the green grass, his legs carrying him faster and faster. You have been spotted, and when you and your special friend finally meet, you cling together in joyous reunion, never to be parted again. The happy kisses rain upon your face; your hands again caress the beloved head, and you look once more into the trusting eyes of your pet, so long gone from your life but never absent from your heart. \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t Then you cross Rainbow Bridge together.',  offsetX + 150, 150);

        image(girl, offsetX + 6500, 220);

        if (scroll === true) {
            if (keyIsDown(LEFT_ARROW)) {
                offsetX += speed;
            }
            if (keyIsDown(RIGHT_ARROW)) {
                offsetX -= speed;
            }
        }

        textAlign(CENTER);
        text('Press the right arrow key', width / 2, 480);

        if (dist(cat.x, 0, offsetX + 6470, 0) < 20) {
            imageMode(CENTER);
            image(bg2, width / 2, height / 2);
            image(rainbow, width / 2, height / 2 - 30);

            cat.display();
            image(girl, offsetX + 6500, 220);

            scroll = false;
            textAlign(CENTER);
            fill(0, 0, 0, fade);
            textSize(25);
            text('Rainbow Bridge', width / 2, 400)
            if (fade < 0) {
                fadeAmt = 1;
            }
            fade += fadeAmt;
        }
    }
    if (state === 6) {
        // instructions
        imageMode(CENTER);
        image(bg2, width / 2, height / 2);

        textFont(font);
        textAlign(CENTER);
        textSize(20);
        text('RAINBOW BRIDGE', width / 2, 180);
        textSize(14);
        text('Use the arrow keys to move around. \nExplore the map and interact with the environment to play all four minigames and win !', width / 2, 350);
        text('Press 0 to start the game . . .', width / 2, 400)


        cat.display();
        cat.move();
    }
    if (state === 8) {
        music.stop();
        imageMode(CENTER);
        image(bg2, width / 2, height / 2);
        textAlign(CENTER);
        textFont(font);
        text('You have collected all the keys.\nPress E to enter the Rainbow Bridge', width / 2, height / 2);

        if (bridge === true) {
            state = 5;
            offsetX = 0;
            offsetY = 0;
        }
    }
    if (state === 7) {
        if (bell.isPlaying() == false) {
            bell.play();
            bell.setLoop(false);
        }

        imageMode(CENTER);
        image(bg2, width / 2, height / 2);

        offsetX -= 1;
        offsetY -= 1;

        // instructions
        textSize(18);
        fill(0);
        noStroke();
        textFont(font);
        textAlign(CENTER);
        text('Minigame completed', width / 2, height / 3);

        textSize(14);
        text('You have obtained', width / 2, height / 2);
        image(keyImg, width / 2, 300);

        text('Press D to continue', width / 2, 400);
    }
    if (state == 4) {
        keyImg2.resize(40, 17.6);
        image(keyImg2, 20, 20)
        text('x ' + keyCount, 75, 33);
    }
}

function mousePressed() {
    collected = true;
}

function mouseReleased() {
    collected = false;
}

function drawBox() {
    // drawing inside of the box
    fill(128, 101, 74);
    noStroke();
    beginShape();
    vertex(0, 0);
    vertex(0, height);
    vertex(100, 400);
    vertex(100, 100)
    endShape();

    beginShape();
    vertex(width, 0);
    vertex(500, 100);
    vertex(500, 400);
    vertex(width, height);
    endShape();

    fill(115, 89, 63);
    noStroke();
    beginShape();
    vertex(0, 0);
    vertex(100, 100);
    vertex(500, 100);
    vertex(width, 0);
    endShape();

    beginShape();
    vertex(0, height);
    vertex(100, 400);
    vertex(500, 400);
    vertex(width, height);
    endShape();
}

function keyPressed() {
    if (keyCode == LEFT_ARROW) {
        leftPressed = true;
    }
    if (keyCode == RIGHT_ARROW) {
        rightPressed = true;
    }
    if (keyCode == DOWN_ARROW) {
        downPressed = true;
    }
    if (keyCode == UP_ARROW) {
        upPressed = true;
    }
    if (keyCode == ENTER) {
        entered = true;
    }
    if (keyCode == 32) {
        play = true;
    }
    if (keyCode == 48) {
        state = 4;
    }
    if (keyCode === 68) {
        if (state != 4 && state != 6) {
            state = 4;
            keyCount++;
        }
    }

    if (keyCode === 69) {
        bridge = true;
        offsetX = 0;
        offsetY = 0;
    }
}

function backgroundMusic() {
    if (state != 5) {
        music.play();
        music.setLoop(true);
    }
}