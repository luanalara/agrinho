function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}let truck;
let products = [];
let obstacles = [];
let score = 0;
let gameOver = false;
let emojis = ["🥛", "🌽"]; // leite e milho
let timer = 30; // segundos
let gameEndedByTime = false;

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
  textSize(32);
  truck = new Truck();
  frameRate(60); // 60 frames = 1 segundo
}

function draw() {
  background(220, 250, 220); // verde claro

  if (!gameOver) {
    truck.update();
    truck.display();

    // Diminuir o tempo a cada segundo
    if (frameCount % 60 === 0 && timer > 0) {
      timer--;
      if (timer === 0) {
        gameOver = true;
        gameEndedByTime = true;
      }
    }

    if (frameCount % 60 === 0) {
      products.push(new Product());
    }

    if (frameCount % 90 === 0) {
      obstacles.push(new Obstacle());
    }

    // Produtos
    for (let i = products.length - 1; i >= 0; i--) {
      products[i].update();
      products[i].display();

      if (products[i].hits(truck)) {
        score += 10;
        products.splice(i, 1);
      } else if (products[i].offscreen()) {
        products.splice(i, 1);
      }
    }

    // Obstáculos
    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].update();
      obstacles[i].display();

      if (obstacles[i].hits(truck)) {
        gameOver = true;
      } else if (obstacles[i].offscreen()) {
        obstacles.splice(i, 1);
      }
    }

    // Pontuação e Tempo
    fill(0);
    textSize(20);
    textAlign(LEFT);
    text("Pontos: " + score, 10, 20);
    text("Tempo: " + timer + "s", 10, 45);
  } else {
    background(100);
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);

    if (gameEndedByTime) {
      text("⏱️ TEMPO ESGOTADO ⏱️", width / 2, height / 2 - 20);
    } else {
      text("🚫 FIM DE JOGO 🚫", width / 2, height / 2 - 20);
    }

    text("Pontos: " + score, width / 2, height / 2 + 20);
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    truck.move(-1);
  } else if (keyCode === RIGHT_ARROW) {
    truck.move(1);
  }
}

class Truck {
  constructor() {
    this.x = width / 2;
    this.y = height - 40;
    this.size = 40;
  }

  move(dir) {
    this.x += dir * 40;
    this.x = constrain(this.x, 0, width - this.size);
  }

  update() {}

  display() {
    textSize(40);
    text("🚛", this.x + this.size / 2, this.y + this.size / 2);
  }
}

class Product {
  constructor() {
    this.x = random(0, width - 20);
    this.y = 0;
    this.speed = 3;
    this.emoji = random(emojis);
  }

  update() {
    this.y += this.speed;
  }

  display() {
    text(this.emoji, this.x, this.y);
  }

  hits(truck) {
    return dist(this.x, this.y, truck.x + truck.size / 2, truck.y + truck.size / 2) < 30;
  }

  offscreen() {
    return this.y > height;
  }
}

class Obstacle {
  constructor() {
    this.x = random(0, width - 30);
    this.y = 0;
    this.speed = 4;
  }

  update() {
    this.y += this.speed;
  }

  display() {
    text("🏢", this.x, this.y);
  }

  hits(truck) {
    return dist(this.x, this.y, truck.x + truck.size / 2, truck.y + truck.size / 2) < 35;
  }

  offscreen() {
    return this.y > height;
  }
}
