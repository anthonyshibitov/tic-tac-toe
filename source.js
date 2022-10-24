console.log('test');

const X_STATE = 1;
const O_STATE = 2;

const playerFactory = function(name_p, state_p) {
    let name = name_p;
    let state = state_p;
    const getName = () => name;
    const setName = (n) => {name = n};
    const getState = () => state;
    return {
        getName,
        setName,
        getState
    }
}

const Gameboard = (function() {
    // Create player objects
    const pOne = playerFactory('pOne', X_STATE);
    const pTwo = playerFactory('pTwo', O_STATE);

    // Initialize gameboard
    const board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]

    let gameTurn = 0;

    const getBoard = () => board;

    // ~~ is double NOT operator, which removes all decimals to get an integer
    const updateBoard = (position, player) => {
        if(board[~~(position / 3)][position % 3] != 0) {
            console.log('ERROR: Spot taken');
            return 1;
        }
        if(position >= 0 && position <= 8) {
            board[~~(position / 3)][position % 3] = player.getState();
        } else {
            console.log('ERROR: Position out of bounds');
        }
    }

    const init = () => {

    }

    const gameLoop = () => {

    }

    // There are 8 win conditions. 3 vertical, 3 horizontal, 2 diagonal
    // Return player object on win
    const checkWin = () => {
        // Horizontal
        if(board[0][0] == board[0][1] && board[0][1] == board[0][1]) return board[0][0] == pOne.getState() ? pOne : pTwo;
        if(board[1][0] == board[1][1] && board[1][1] == board[1][2]) return board[1][0] == pOne.getState() ? pOne : pTwo;
        if(board[2][0] == board[2][1] && board[2][1] == board[2][2]) return board[2][0] == pOne.getState() ? pOne : pTwo;

        // Vertical
        if(board[0][0] == board[1][0] && board[1][0] == board[2][0]) return board[0][0] == pOne.getState() ? pOne : pTwo;
        if(board[0][1] == board[1][1] && board[1][1] == board[2][1]) return board[0][1] == pOne.getState() ? pOne : pTwo;
        if(board[0][2] == board[1][2] && board[1][2] == board[2][2]) return board[0][2] == pOne.getState() ? pOne : pTwo;

        // Diagonal
        if(board[0][0] == board[1][1] && board[1][1] == board[2][2]) return board[0][0] == pOne.getState() ? pOne : pTwo;
        if(board[2][0] == board[1][1] && board[1][1] == board[0][2]) return board[2][0] == pOne.getState() ? pOne : pTwo;

        return {};
    }

    const reset = () => {

    }

    return {
        pOne,
        pTwo,
        getBoard,
        updateBoard,
        checkWin
    }
})();

Gameboard.pOne.setName('anthony');
Gameboard.pTwo.setName('sasha');

Gameboard.updateBoard(3, Gameboard.pTwo);
Gameboard.updateBoard(4, Gameboard.pTwo);
Gameboard.updateBoard(5, Gameboard.pTwo);

let winner = Gameboard.checkWin();
console.log(winner.getName());

console.log(Gameboard.getBoard());