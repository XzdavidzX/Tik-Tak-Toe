//------------------------VARIABLES------------------------//
let body   = document.querySelector("body");

let square = document.querySelectorAll(".tikTak");

let title = document.querySelector("h1");

let startGame = false

let container  = document.querySelector(".tikTakToe");

let reset = document.querySelector("button");

let turn = 1;

let board = ['', '', '', '', '', '', '', '', ''];

let currentPlayer = 'X';

let gameActive = true;

//-----------------------------------------------START GAME-----------------------------------------------------//



//------------------------FUNCTIONS------------------------//
function changeTurn() {
    if (turn === 1) {
        turn = 2;
    } else {
        turn = 1;
    }
}

//-----------------------------------clICK FUNCTION------------------------------------------//

for (let i = 0; i < square.length; i++) {
    square[i].addEventListener("click", () => {
        if (gameActive == true) {
            
        
        if (turn == 1) {
            if (square[i].classList.contains("o") || square[i].classList.contains("x")) {
                alert("Already played");
                return;
            }else{
                square[i].classList.add("x");
                changeTurn();
            }
            
    
        }else if (turn === 2) {
            if (square[i].classList.contains("o") || square[i].classList.contains("x")) {
                alert("Already played");
                return;
            }else{
                square[i].classList.add("o");
                changeTurn();
            }
        }
        }
    })
    
}

// Variables

// Función para verificar si hay un ganador
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6] // Diagonales
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return null;
}

// Función para manejar los clics en los cuadros del tablero
function handleSquareClick(squareIndex) {
    if (!gameActive || board[squareIndex] !== '') return;

    board[squareIndex] = currentPlayer;
    document.querySelector(`.tikTak:nth-child(${squareIndex + 1})`).classList.add(currentPlayer.toLowerCase());

    const winner = checkWinner();
// Funcion ganadora        
    if (winner) {
        gameActive = false;
        if (winner === 'X') {
            title.style.color = "rgba(255, 0, 0, 0.651)"
        } else if (winner === 'O') {
            title.style.color = "rgba(4, 0, 255, 0.39)"
        }
        title.innerHTML = `Player ${winner} wins!`;
        title.style.transform = "translateY(-10px)"
        reset.classList.add("fade-in-up")
        container.classList.add("tikTakToi")
        reset.disabled = false
// Función de empate
    } else if (!board.includes('')) {
        gameActive = false;
        title.innerHTML = 'It\'s a draw!';
        reset.classList.add("fade-in-up")
        container.classList.add("tikTakToi")
        title.style.transform = "translateY(-10px)"
        reset.disabled = false
// Cambiar turno
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

// Asignar evento de clic a cada cuadro del tablero
square.forEach((square, index) => {
    square.addEventListener('click', () => handleSquareClick(index));
});


// funcion para reiniciar el juego
reset.addEventListener('click', function () {
    turn = 1;
    currentPlayer = 'X';
    gameActive = true;
    board = ['', '', '', '', '', '', '', '', ''];
    title.innerHTML = 'Tik Tak Toe';
    square.forEach((square) => {
        square.classList.remove('x', 'o');
    });
    reset.disabled = true
    reset.classList.remove("fade-in-up")
    container.classList.remove("tikTakToi")
    title.style.color = "#6721eb"
    title.style.transform = "translateY(0px)"
    resetGame()
});
    

// Función para reiniciar el juego
function resetGame() {
    // Reiniciar variables
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;

    // Reiniciar cuadros del tablero
    square.forEach((square) => {
        square.classList.remove('x', 'o');
    });
}
