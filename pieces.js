// Função que define a orientação das peças no jogo Tetris com base no tipo da peça e na rotação atual.
function orientPoints(pieceType, rotation) {
    let results = []; // Array para armazenar as coordenadas da peça após aplicar a rotação.

    // A estrutura switch decide como orientar a peça com base no tipo da peça (pieceType).
    switch (pieceType) {
        case 0: // Peça em forma de linha (I)
            switch (rotation) {
                case 0: // Rotação 0 (horizontal)
                    results = [
                        [-2, 0], // Coordenadas de cada parte da peça
                        [-1, 0],
                        [0, 0],
                        [1, 0]
                    ];
                    break;
                case 1: // Rotação 1 (vertical)
                    results = [
                        [0, -1],
                        [0, 0],
                        [0, 1],
                        [0, 2]
                    ];
                    break;
                case 2: // Rotação 2 (inversa horizontal)
                    results = [
                        [-2, 1],
                        [-1, 1],
                        [0, 1],
                        [1, 1]
                    ];
                    break;
                case 3: // Rotação 3 (inversa vertical)
                    results = [
                        [-1, -1],
                        [-1, 0],
                        [-1, 1],
                        [-1, 2]
                    ];
                    break;
            }
            break;
        case 1: // Peça em forma de L (L)
            switch (rotation) {
                case 0:
                    results = [
                        [-2, -1],
                        [-2, 0],
                        [-1, 0],
                        [0, 0]
                    ];
                    break;
                case 1:
                    results = [
                        [-1, -1],
                        [-1, 0],
                        [-1, 1],
                        [0, -1]
                    ];
                    break;
                case 2:
                    results = [
                        [-2, 0],
                        [-1, 0],
                        [0, 0],
                        [0, 1]
                    ];
                    break;
                case 3:
                    results = [
                        [-1, -1],
                        [-1, 0],
                        [-1, 1],
                        [-2, 1]
                    ];
                    break;
            }
            break;
        case 2: // Peça em forma de L invertido (J)
            switch (rotation) {
                case 0:
                    results = [
                        [-2, 0],
                        [-1, 0],
                        [0, 0],
                        [0, -1]
                    ];
                    break;
                case 1:
                    results = [
                        [-1, -1],
                        [-1, 0],
                        [-1, 1],
                        [0, 1]
                    ];
                    break;
                case 2:
                    results = [
                        [-2, 0],
                        [-2, 1],
                        [-1, 0],
                        [0, 0]
                    ];
                    break;
                case 3:
                    results = [
                        [-2, -1],
                        [-1, -1],
                        [-1, 0],
                        [-1, 1]
                    ];
                    break;
            }
            break;
        case 3: // Peça quadrada (O)
            // A peça quadrada não rotaciona, então o resultado é sempre o mesmo.
            results = [
                [-1, -1],
                [0, -1],
                [-1, 0],
                [0, 0]
            ];
            break;
        case 4: // Peça em forma de Z (S)
            switch (rotation) {
                case 0:
                    results = [
                        [-1, -1],
                        [-2, 0],
                        [-1, 0],
                        [0, -1]
                    ];
                    break;
                case 1:
                    results = [
                        [-1, -1],
                        [-1, 0],
                        [0, 0],
                        [0, 1]
                    ];
                    break;
                case 2:
                    results = [
                        [-1, 0],
                        [-2, 1],
                        [-1, 1],
                        [0, 0]
                    ];
                    break;
                case 3:
                    results = [
                        [-2, -1],
                        [-2, 0],
                        [-1, 0],
                        [-1, 1]
                    ];
                    break;
            }
            break;
        case 5: // Peça em forma de T
            switch (rotation) {
                case 0:
                    results = [
                        [-1, 0],
                        [0, 0],
                        [1, 0],
                        [0, -1]
                    ];
                    break;
                case 1:
                    results = [
                        [0, -1],
                        [0, 0],
                        [0, 1],
                        [1, 0]
                    ];
                    break;
                case 2:
                    results = [
                        [-1, 0],
                        [0, 0],
                        [1, 0],
                        [0, 1]
                    ];
                    break;
                case 3:
                    results = [
                        [0, -1],
                        [0, 0],
                        [0, 1],
                        [-1, 0]
                    ];
                    break;
            }
            break;
        case 6: // Peça em forma de Z invertido (Z)
            switch (rotation) {
                case 0:
                    results = [
                        [-2, -1],
                        [-1, -1],
                        [-1, 0],
                        [0, 0]
                    ];
                    break;
                case 1:
                    results = [
                        [-1, 0],
                        [-1, 1],
                        [0, 0],
                        [0, -1]
                    ];
                    break;
                case 2:
                    results = [
                        [-2, 0],
                        [-1, 0],
                        [-1, 1],
                        [0, 1]
                    ];
                    break;
                case 3:
                    results = [
                        [-2, 0],
                        [-2, 1],
                        [-1, 0],
                        [-1, -1]
                    ];
                    break;
            }
            break;
    }
    // Retorna as coordenadas da peça com a rotação especificada.
    return results;
}
