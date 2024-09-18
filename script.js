// Define o tamanho de cada espaço da grade
const gridSpace = 30;

// Declara variáveis
let fallingPiece;  // Peça que está caindo
let gridPieces = []; // Peças que estão na grade
let lineFades = []; // Linhas que estão desaparecendo
let gridWorkers = []; // Trabalhadores da grade

let currentScore = 0; // Pontuação atual
let currentLevel = 1; // Nível atual
let linesCleared = 0; // Linhas limpadas

let ticks = 0; // Contador para atualizações
let updateEvery = 15; // Intervalo de atualizações
let updateEveryCurrent = 15; // Intervalo de atualizações atual
let fallSpeed = gridSpace * 0.5; // Velocidade de queda
let pauseGame = false; // Estado do jogo (pausado ou não)
let gameOver = false; // Estado do jogo (game over ou não)

// Define as bordas da área de jogo
const gameEdgeLeft = 150;
const gameEdgeRight = 450;

// Define as cores para as peças
const colors = [
    '#FF1493',
    '#000000',
    '#8A2BE2',
    '#556B2F',
    '#7CFC00',
    '#800000',
    '#0000CD',
];

// Função de configuração chamada uma vez no início
function setup() {
    createCanvas(600, 540);

    // Cria uma nova peça que está caindo
    fallingPiece = new PlayPiece();
    fallingPiece.resetPiece();

    // Define a fonte para o texto
    textFont('Ubuntu');
}

// Função de desenho chamada repetidamente
function draw() {
    // Define as cores usadas no jogo
    const colorDark = '#00BFFF'; // Cor escura
    const colorLight = '#304550'; // Cor clara
    const colorBackground = '#E0FFFF'; // Cor de fundo

    // Define a cor de fundo
    background(colorBackground);

 // Desenha o painel de informações do lado direito
    fill(25); // Cor preta
    noStroke();
    rect(gameEdgeRight, 0, 150, height);

     // Desenha o painel de informações do lado esquerdo
    rect(0, 0, gameEdgeLeft, height);

    // Desenha o retângulo da pontuação
    fill(colorBackground);
    rect(450, 80, 150, 70);

    // Desenha o retângulo da próxima peça
    rect(460, 405, 130, 130, 5, 5);

    // Desenha o retângulo do nível
    rect(460, 210, 130, 60, 5, 5);

    // Desenha o retângulo das linhas
    rect(460, 280, 130, 60, 5, 5);

    // Desenha as linhas de pontuação
    fill(colorLight);
    rect(450, 85, 150, 20);
    rect(450, 110, 150, 4);
    rect(450, 140, 150, 4);

    // Desenha o banner de pontuação
    fill(colorBackground);
    rect(460, 60, 130, 35, 5, 5);

    // Desenha o retângulo interno do banner de pontuação
    strokeWeight(3);
    noFill();
    stroke(colorLight);
    rect(465, 65, 120, 25, 5, 5);

    // Desenha o retângulo interno da próxima peça
    stroke(colorLight);
    rect(465, 410, 120, 120, 5, 5);

    // Desenha o retângulo interno do nível
    rect(465, 215, 120, 50, 5, 5);

    // Desenha o retângulo interno das linhas
    rect(465, 285, 120, 50, 5, 5);

    // Desenha os rótulos de informações
    fill(25); // Cor preta
    noStroke();
    textSize(24); // Tamanho da fonte
    textAlign(CENTER); // Alinhamento do texto
    text("Pontos", 525, 85);
    text("Nivel", 525, 238);
    text("Linha", 525, 308);

   // Desenha as informações reais
    textSize(24);
    textAlign(RIGHT);
    text(currentScore, 560, 135);
    text(currentLevel, 560, 260);
    text(linesCleared, 560, 330);

      // Desenha a borda do jogo
      stroke(colorDark);
      line(gameEdgeRight, 0, gameEdgeRight, height);
  
      // Mostra a peça que está caindo
      fallingPiece.show();
  
      // Aumenta a velocidade da peça que está caindo se a seta para baixo for pressionada
      if (keyIsDown(DOWN_ARROW)) {
          updateEvery = 2;
      } else {
          updateEvery = updateEveryCurrent;
      }
  
      // Atualiza o estado do jogo
      if (!pauseGame) {
          ticks++;
          if (ticks >= updateEvery) {
              ticks = 0;
              fallingPiece.fall(fallSpeed);
          }
      }
  
      // Mostra as peças da grade
      for (let i = 0; i < gridPieces.length; i++) {
          gridPieces[i].show();
      }
  
      // Mostra as linhas que estão desaparecendo
      for (let i = 0; i < lineFades.length; i++) {
          lineFades[i].show();
      }
  
      // Processa os trabalhadores da grade
      if (gridWorkers.length > 0) {
          gridWorkers[0].work();
      }
  
      // Explica os controles
      textAlign(CENTER);
      fill(255); // Cor branca
      noStroke();
      textSize(14);
      text("Controle:\n↑\n← ↓ →\n", 75, 155);
      text("Esquerda e direita:\nmove para os lados", 75, 230);
      text("Cima:\nrotacionar", 75, 280);
      text("Baixo:\nfazer cair mais rápido", 75, 330);
      text("R:\nreiniciar o jogo", 75, 380);


     // Verifica se o jogo acabou
    if (gameOver) {
        fill(colorDark); // Define a cor de preenchimento
        textSize(54); // Define o tamanho do texto
        textAlign(CENTER); // Alinha o texto ao centro
        text("Game Over!!!", 300, 270); // Mostra a mensagem de fim de jogo
    }

     // Desenha a borda do jogo
    strokeWeight(3);  // Define a espessura da borda
    stroke('#304550'); // Define a cor da borda
    noFill(); // Não preenche o retângulo, apenas desenha a borda
    rect(0, 0, width, height); // Desenha o retângulo que serve como borda do jogo
}

// Função chamada quando uma tecla é pressionada
function keyPressed() {
    if (keyCode === 82) { // Verifica se a tecla pressionada é 'R'
        // 'R' para reiniciar o jogo
        resetGame(); // Chama a função para reiniciar o jogo
    }
    if (!pauseGame) { // Verifica se o jogo não está pausado
        if (keyCode === LEFT_ARROW) { // Verifica se a tecla pressionada é a seta para a esquerda
            fallingPiece.input(LEFT_ARROW); // Move o bloco para a esquerda
        } else if (keyCode === RIGHT_ARROW) { // Verifica se a tecla pressionada é a seta para a direita
            fallingPiece.input(RIGHT_ARROW); // Move o bloco para a direita
        }
        if (keyCode === UP_ARROW) {  // Verifica se a tecla pressionada é a seta para cima
            fallingPiece.input(UP_ARROW); // Rotaciona o bloco
        }
    }
}

// Classe para a peça que está caindo
class PlayPiece {
    constructor() {
        this.pos = createVector(0, 0); // Posição da peça
        this.rotation = 0; // Rotação da peça
        this.nextPieceType = Math.floor(Math.random() * 7); // Tipo da próxima peça (aleatório de 0 a 6)
        this.nextPieces = []; // Lista das peças seguintes
        this.pieceType = 0; // Tipo da peça atual
        this.pieces = []; // Lista das peças da peça atual
        this.orientation = []; // Orientação atual da peça
        this.fallen = false; // Verifica se a peça já caiu
    }

    // Gera a próxima peça
    nextPiece() {
        this.nextPieceType = pseudoRandom(this.pieceType); // Determina o próximo tipo de peça
        this.nextPieces = []; // Limpa a lista de próximas peças

        const points = orientPoints(this.nextPieceType, 0); // Obtém os pontos da nova peça
        let xx = 525, yy = 490; // Posição inicial para a próxima peça

        // Ajusta a posição inicial dependendo do tipo da peça
        if (this.nextPieceType !== 0 && this.nextPieceType !== 3 && this.nextPieceType !== 5) {
            xx += (gridSpace * 0.5);
        }

        if (this.nextPieceType == 5) {
            xx -= (gridSpace * 0.5);
        }

        // Cria a nova peça e adiciona à lista de próximas peças
        for (let i = 0; i < 4; i++) {
            this.nextPieces.push(new Square(xx + points[i][0] * gridSpace, yy + points[i][1] * gridSpace, this.nextPieceType));
        }
    }

    // Faz a peça cair
    fall(amount) {
        // Verifica se há colisão e move a peça
        if (!this.futureCollision(0, amount, this.rotation)) {
            this.addPos(0, amount);
            this.fallen = true;
        } else {
            if (!this.fallen) {
                // Se a peça não caiu ainda, pausa o jogo e marca como game over
                pauseGame = true;
                gameOver = true;
            } else {
                // Se a peça já caiu, confirma a forma e a adiciona ao grid
                this.commitShape();
            }
        }
    }

    // Reseta a peça atual
    resetPiece() {
        this.rotation = 0; // Reset da rotação
        this.fallen = false; // Marca a peça como não caída
        this.pos.x = 330; // Posição inicial X
        this.pos.y = -60; // Posição inicial Y

        this.pieceType = this.nextPieceType; // Atualiza o tipo da peça

        this.nextPiece(); // Gera a próxima peça
        this.newPoints(); // Atualiza os pontos da peça atual
    }

    // Gera os pontos para a peça atual
    newPoints() {
        const points = orientPoints(this.pieceType, this.rotation); // Obtém os pontos da peça atual
        this.orientation = points;
        this.pieces = []; // Limpa a lista de peças

        // Cria as peças baseadas nos pontos
        for (let i = 0; i < points.length; i++) {
            this.pieces.push(new Square(this.pos.x + points[i][0] * gridSpace, this.pos.y + points[i][1] * gridSpace, this.pieceType));
        }
    }

    // Atualiza a posição da peça atual
    updatePoints() {
        if (this.pieces) {
            const points = orientPoints(this.pieceType, this.rotation); // Obtém os pontos da peça atual
            this.orientation = points;
            for (let i = 0; i < 4; i++) {
                this.pieces[i].pos.x = this.pos.x + points[i][0] * gridSpace; // Atualiza posição X
                this.pieces[i].pos.y = this.pos.y + points[i][1] * gridSpace; // Atualiza posição Y
            }
        }
    }

    // Adiciona um deslocamento à posição da peça atual
    addPos(x, y) {
        this.pos.x += x; // Atualiza a posição X
        this.pos.y += y; // Atualiza a posição Y

        if (this.pieces) {
            // Atualiza a posição das peças individuais
            for (let i = 0; i < 4; i++) {
                this.pieces[i].pos.x += x;
                this.pieces[i].pos.y += y;
            }
        }
    }

    // Verifica se haverá colisão no futuro
    futureCollision(x, y, rotation) {
        let xx, yy, points = 0;
        if (rotation !== this.rotation) {
            points = orientPoints(this.pieceType, rotation); // Obtém os pontos da peça para a nova rotação
        }

        // Verifica colisão com as bordas do jogo e com outras peças
        for (let i = 0; i < this.pieces.length; i++) {
            if (points) {
                xx = this.pos.x + points[i][0] * gridSpace;
                yy = this.pos.y + points[i][1] * gridSpace;
            } else {
                xx = this.pieces[i].pos.x + x;
                yy = this.pieces[i].pos.y + y;
            }
            if (xx < gameEdgeLeft || xx + gridSpace > gameEdgeRight || yy + gridSpace > height) {
                return true; // Colidiu com as bordas
            }
            for (let j = 0; j < gridPieces.length; j++) {
                if (xx === gridPieces[j].pos.x) {
                    if (yy >= gridPieces[j].pos.y && yy < gridPieces[j].pos.y + gridSpace) {
                        return true; // Colidiu com outra peça
                    }
                    if (yy + gridSpace > gridPieces[j].pos.y && yy + gridSpace <= gridPieces[j].pos.y + gridSpace) {
                        return true; // Colidiu com outra peça
                    }
                }
            }
        }
    }

    // Trata a entrada do usuário
    input(key) {
        switch (key) {
            case LEFT_ARROW:
                // Move a peça para a esquerda se não houver colisão
                if (!this.futureCollision(-gridSpace, 0, this.rotation)) {
                    this.addPos(-gridSpace, 0);
                }
                break;
            case RIGHT_ARROW:
                // Move a peça para a direita se não houver colisão
                if (!this.futureCollision(gridSpace, 0, this.rotation)) {
                    this.addPos(gridSpace, 0);
                }
                break;
            case UP_ARROW:
                // Rotaciona a peça se não houver colisão
                let newRotation = this.rotation + 1;
                if (newRotation > 3) {
                    newRotation = 0;
                }
                if (!this.futureCollision(0, 0, newRotation)) {
                    this.rotation = newRotation;
                    this.updatePoints();
                }
                break;
        }
    }

    // Rotaciona a peça atual
    rotate() {
        this.rotation += 1;
        if (this.rotation > 3) {
            this.rotation = 0;
        }
        this.updatePoints(); // Atualiza os pontos após a rotação
    }

    // Mostra a peça atual e a próxima peça
    show() {
        for (let i = 0; i < this.pieces.length; i++) {
            this.pieces[i].show(); // Mostra as peças atuais
        }
        for (let i = 0; i < this.nextPieces.length; i++) {
            this.nextPieces[i].show(); // Mostra as próximas peças
        }
    }

    // Confirma a forma da peça atual no grid
    commitShape() {
        for (let i = 0; i < this.pieces.length; i++) {
            gridPieces.push(this.pieces[i]); // Adiciona a peça ao grid
        }
        this.resetPiece(); // Reseta a peça atual
        analyzeGrid(); // Analisa o grid para possíveis linhas completas
    }
}


// Classe para cada quadrado na peça
class Square {
    constructor(x, y, type) {
        this.pos = createVector(x, y); // Posição do quadrado
        this.type = type; // Tipo da peça (cor)
    }

    // Mostra o quadrado
    show() {
        strokeWeight(2); // Espessura da borda
        const colorDark = '#092e1d'; // Cor escura (não utilizada aqui)
        const colorMid = colors[this.type]; // Cor média baseada no tipo da peça

        fill(colorMid); // Preenche o quadrado com a cor média
        stroke(25); // Cor da borda
        rect(this.pos.x, this.pos.y, gridSpace - 1, gridSpace - 1); // Desenha o quadrado

        noStroke(); // Desliga a borda para os detalhes internos
        fill(255); // Cor branca para os detalhes
        rect(this.pos.x + 6, this.pos.y + 6, 18, 2); // Detalhe superior
        rect(this.pos.x + 6, this.pos.y + 6, 2, 16); // Detalhe lateral
        fill(25); // Cor escura para detalhes inferiores
        rect(this.pos.x + 6, this.pos.y + 20, 18, 2); // Detalhe inferior
        rect(this.pos.x + 22, this.pos.y + 6, 2, 16); // Detalhe lateral direito
    }
}

// Gera um número pseudo-aleatório para a próxima peça
function pseudoRandom(previous) {
    let roll = Math.floor(Math.random() * 8); // Gera um número aleatório de 0 a 7
    // Garante que o novo número não seja o mesmo que o anterior, exceto para o caso 7
    if (roll === previous || roll === 7) {
        roll = Math.floor(Math.random() * 7); // Gera um novo número aleatório de 0 a 6
    }
    return roll; // Retorna o número gerado
}

// Analisa o grid e limpa as linhas completas se necessário
function analyzeGrid() {
    let score = 0; // Pontuação inicial
    while (checkLines()) { // Enquanto houver linhas completas
        score += 100; // Incrementa a pontuação
        linesCleared += 1; // Incrementa o número de linhas limpas
        if (linesCleared % 10 === 0) { // A cada 10 linhas limpas
            currentLevel += 1; // Aumenta o nível atual
            if (updateEveryCurrent > 2) { // Reduz a frequência de atualização do jogo
                updateEveryCurrent -= 10;
            }
        }
    }
    // Dobra a pontuação se for maior que 100
    if (score > 100) {
        score *= 2;
    }
    currentScore += score; // Atualiza a pontuação atual
}

// Verifica se há linhas completas no grid
function checkLines() {
    for (let y = 0; y < height; y += gridSpace) { // Percorre cada linha do grid
        let count = 0; // Contador de quadrados na linha
        for (let i = 0; i < gridPieces.length; i++) {
            if (gridPieces[i].pos.y === y) { // Verifica se a peça está na linha atual
                count++;
            }
        }
        if (count === 10) { // Se a linha estiver completa
            // Remove as peças na linha completa
            gridPieces = gridPieces.filter(piece => piece.pos.y !== y);
            // Move para baixo as peças acima da linha completa
            for (let i = 0; i < gridPieces.length; i++) {
                if (gridPieces[i].pos.y < y) {
                    gridPieces[i].pos.y += gridSpace;
                }
            }
            return true; // Retorna true indicando que uma linha foi limpa
        }
    }
    return false; // Retorna false se nenhuma linha foi limpa
}

// Classe para o trabalhador do grid
class Worker {
    constructor(y, amount) {
        this.amountActual = 0; // Quantidade atual de trabalho realizado
        this.amountTotal = amount; // Quantidade total de trabalho a ser realizado
        this.yVal = y; // Valor Y da linha onde o trabalho deve ser realizado
    }

    // Realiza o trabalho no grid
    work() {
        if (this.amountActual < this.amountTotal) { // Enquanto não tiver concluído o trabalho
            for (let j = 0; j < gridPieces.length; j++) {
                if (gridPieces[j].pos.y < y) { // Move para baixo as peças acima da linha Y
                    gridPieces[j].pos.y += 5;
                }
            }
            this.amountActual += 5; // Incrementa a quantidade de trabalho realizado
        } else {
            gridWorkers.shift(); // Remove o trabalhador quando o trabalho estiver completo
        }
    }
}


// Função de reinicialização do jogo
function resetGame() {
    fallingPiece = new PlayPiece(); // Cria uma nova peça que está caindo
    fallingPiece.resetPiece(); // Reinicializa a peça atual
    gridPieces = []; // Limpa a lista de peças no grid
    lineFades = []; // Limpa a lista de efeitos de desvanecimento de linhas
    gridWorkers = []; // Limpa a lista de trabalhadores do grid
    currentScore = 0; // Reseta a pontuação atual para 0
    currentLevel = 1; // Define o nível atual como 1
    linesCleared = 0; // Reseta o número de linhas limpas para 0
    ticks = 0; // Reseta o contador de ticks (atualizações de jogo) para 0
    updateEvery = 15; // Define a frequência de atualização do jogo
    updateEveryCurrent = 15; // Define a frequência de atualização atual
    fallSpeed = gridSpace * 0.5; // Define a velocidade de queda das peças
    pauseGame = false; // Define o estado do jogo como não pausado
    gameOver = false; // Define o estado do jogo como não terminado
}
