var clicouQuadrado = false;

var mudarPartida = false;
var ultimaPartida;

var tamanho = [30, 30];
var quadrados = [tamanho[0] * tamanho[1]];


function setup() {
  frameRate(24);
  createCanvas(1000, 800);
  criarMapa(30, 30);

}

function draw() {

  background(220);
  desenharMapa();



}

function mousePressed() {
  // for(var i = 0;i < quadrados.length;i++){
  //   quadrados[i].clicado(i)


  // }
}

function mouseDragged() {
  for (var i = 0; i < quadrados.length; i++) {

    if (mouseX > quadrados[i].x && mouseX < quadrados[i].x + quadrados[i].l && mouseY < quadrados[i].y + quadrados[i].l && mouseY > quadrados[i].y && quadrados[i].partida == true) {
      ultimaPartida = quadrados[i];
      mudarPartida = true
    }


  }
  if (mudarPartida) {
    for (var i = 0; i < quadrados.length; i++) {
      if (mouseX > quadrados[i].x && mouseX < quadrados[i].x + quadrados[i].l && mouseY < quadrados[i].y + quadrados[i].l && mouseY > quadrados[i].y) {
        ultimaPartida.partida = false;
        quadrados[i].partida = true
        ultimaPartida = quadrados[i]; 
      }
    }

  }
}

function mouseReleased() {
  mudarPartida = false;
}

function criarMapa() {

  for (var i = 0; i < tamanho[0]; i++) {
    for (var k = 0; k < tamanho[1]; k++) {


      if (i == tamanho[0] / 2 && k == 0) {
        quadrados[tamanho[0] * i + k] = new Quadrado(k * 20, i * 20, 20, false, true)
      } else {
        quadrados[(tamanho[0]) * i + k] = new Quadrado(k * 20, i * 20, 20, false, false)
      }

    }
  }
}

function desenharMapa() {

  for (var i = 0; i < quadrados.length; i++) {
    quadrados[i].draw()
  }
}

class Quadrado {
  constructor(x, y, l, cor, partida) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.cor = cor;
    this.partida = partida;
  }

  draw() {

    if (this.cor == true) {

      fill(color(255, 204, 0));

    } else { fill(color(255, 255, 255)) }
    square(this.x, this.y, this.l);

    if (this.partida) {
      triangle(this.x, this.y + this.l, this.x + this.l / 2, this.y, this.x + this.l, this.y + this.l);
    }

  }

  clicado(i) {
    if (mouseX > this.x && mouseX < this.x + this.l && mouseY < this.y + this.l && mouseY > this.y) {
      this.cor = true;
      console.log(i)
    }
  }

  mudarPartida() {
    
  }




}

