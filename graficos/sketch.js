var clicouQuadrado = false;

var mudarPartida = false;
var ultimaPartida;

var mudarFinal = false;
var ultimoFinal;

var tamanho = [30, 30];
var quadrados = [tamanho[0] * tamanho[1]];
var algo;

var comecar = false

pintar2 = false;

function setup() {
  frameRate(100);
  createCanvas(1000, 800);
  criarMapa(30, 30);
  button = createButton('Iniciar');
  button.position(tamanho[0] * 20, 0);
  button.mousePressed(comecou)
  algo = new algoritimos((quadrados));
  
  
}

function draw() {
  background(220);
  if(comecar){
    algo.pintarCaminho()
    if(pintar2){
      algo.pintarCaminho2()
    }
  }
  


  desenharMapa();
}

function comecou() {
  algo.aux = algo.returnfinal()
  algo.buscaLargura()
  comecar = true
  
}


function mousePressed() {
  
}

function mouseDragged() {
  arrastarPartida();
  arrastarFinal();
}

//arrasta o triangulo
function arrastarPartida() {
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
      } '                                                '
    }

  }

}

//arrasta a bolinha da posicao final
function arrastarFinal() {
  for (var i = 0; i < quadrados.length; i++) {

    if (mouseX > quadrados[i].x && mouseX < quadrados[i].x + quadrados[i].l && mouseY < quadrados[i].y + quadrados[i].l && mouseY > quadrados[i].y && quadrados[i].final == true) {
      ultimoFinal = quadrados[i];
      mudarFinal = true
      
    }


  }
  if (mudarFinal) {
    for (var i = 0; i < quadrados.length; i++) {
      if (mouseX > quadrados[i].x && mouseX < quadrados[i].x + quadrados[i].l && mouseY < quadrados[i].y + quadrados[i].l && mouseY > quadrados[i].y) {
        ultimoFinal.final = false;
        quadrados[i].final = true
        ultimoFinal = quadrados[i];
      } '                                                '
    }

  }

}

function mouseReleased() {
  mudarPartida = false;
  mudarFinal = false;
}

function criarMapa() {
//coloca o ponto de partida e o ponto final 
  for (var i = 0; i < tamanho[0]; i++) {
    for (var k = 0; k < tamanho[1]; k++) {
      if (i == 0 && k == 0) {
        quadrados[tamanho[0] * i + k] = new Quadrado(k * 20, i * 20, 20, false, true, [], false)
      } else if (i == 1 && k == 1) {

        quadrados[(tamanho[0]) * i + k] = new Quadrado(k * 20, i * 20, 20, false, false, [], true)
      }
      else {
        quadrados[(tamanho[0]) * i + k] = new Quadrado(k * 20, i * 20, 20, false, false, [], false)
      }

    }
  }

// popula as arestas de cada quadrado
  for (var i = 0; i < tamanho[0]; i++) {
    for (var k = 0; k < tamanho[1]; k++) {
      var quad = [];
      var cont = 0;
      if (k > 0) {
        quad[cont] = quadrados[((tamanho[0]) * i + k) - 1];
        cont++;
      }
      if (k < tamanho[1] - 1) {
        quad[cont] = quadrados[((tamanho[0]) * i + k) + 1];
        cont++;
      }
      if (i > 0) {
        quad[cont] = quadrados[((tamanho[0]) * i + k) - tamanho[1]];
        cont++;
      }
      if (i < tamanho[0] - 1) {
        quad[cont] = quadrados[((tamanho[0]) * i + k) + tamanho[1]];
        cont++;
      }
      quadrados[tamanho[0] * i + k].quadrados = quad;
    }
  }
}

function desenharMapa() {
  for (var i = 0; i < quadrados.length; i++) {
    quadrados[i].draw()
  }
}

class algoritimos {
  constructor(lista) {
    this.lista = lista;
    this.fila = [];
    this.filaAux = [];
    this.caminho = [];
    this.aux = this.returnfinal();    
  }

  expandirLargura(lista,pai) {
    for (var i = 0; i < lista.quadrados.length; i++) {
     if(lista.quadrados[i].final == true){
      lista.quadrados[i].pai = pai;
      this.fila.push(lista.quadrados[i])
      this.filaAux.push(lista.quadrados[i])
     }else{
      if (lista.quadrados[i].expandido) {
      } else {
        lista.quadrados[i].pai = pai;
        lista.quadrados[i].expandido = true;
        this.fila.push(lista.quadrados[i])
        this.filaAux.push(lista.quadrados[i])
      }
     }
    }
  }

  returnPartida() {
    for (var i = 0; i < this.lista.length; i++) {
      if (this.lista[i].partida == true) {
        return this.lista[i]
      }
    }
  }

  returnfinal() {
    for (var i = 0; i < this.lista.length; i++) {
      if (this.lista[i].final == true) {
        return this.lista[i]
      }
    }
  }

  buscaLargura() {
    var pai = this.returnPartida();
    this.fila.push(pai);
    this.filaAux.push(pai);
    pai.expandido = true;
    while (true) {
      this.expandirLargura(this.fila[0],pai)
      this.fila.shift()
      pai = this.fila[0];
     
      if (pai.final == true) {
        
        break;
      }
    }
    
  }

  pintarCaminho() {
    if(this.filaAux.length > 0 && this.filaAux[0].final != true){
    this.filaAux[0].cor = true;
    this.filaAux.shift();}
    else{
    pintar2 = true
    }
    
  }

  pintarCaminho2(){
        
    if(this.aux != null){
        this.aux.cor2 = true;
        this.aux = this.aux.pai 
    }
       

  }
}

class Quadrado {
  constructor(x, y, l, cor, partida, quadrados, final) {
    this.x = x;
    this.y = y;
    this.l = l;
    this.cor = cor;
    this.cor2 = false;
    this.final = final;
    this.partida = partida;
    this.quadrados = quadrados;
    this.expandido = false;
    this.pai = null;
  }

  draw() {

    if (this.cor2 == true) {

      fill(color(255, 0, 0));

    } else if(this.cor == true){
      fill(color(71, 140, 245));
    }
    else { fill(color(255, 255, 255)) }
    square(this.x, this.y, this.l);

    if (this.partida) {
      triangle(this.x, this.y + this.l, this.x + this.l / 2, this.y, this.x + this.l, this.y + this.l);
    }

    if (this.final) {
      circle(this.x + this.l / 2, this.y + this.l / 2, this.l * 0.8);
    }

  }

  clicado(i) {
    if (mouseX > this.x && mouseX < this.x + this.l && mouseY < this.y + this.l && mouseY > this.y) {
      this.cor = true;
      console.log(i)
    }
  }

  pintarFilhos() {
    if (mouseX > this.x && mouseX < this.x + this.l && mouseY < this.y + this.l && mouseY > this.y) {
      for (var i = 0; i < this.quadrados.length; i++) {
        this.quadrados[i].cor = true;

      }
    }
  }




}

