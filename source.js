console.log('test');

const X_STATE = 1;
const O_STATE = 2;

const playerFactory = function(name_p, state_p) {
    let name = name_p;
    let state = state_p;
    const sayName = () => {console.log(name)};
    return {
        sayName
    }
}

const Gameboard = (function() {
    // Create player objects
    const pOne = playerFactory('bob', X_STATE);
    const pTwo = playerFactory('jim', O_STATE);

    // Initialize gameboard
    const board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]

    const getBoard = () => { return board };

    const updateBoard = (position, player) => {

    }

    return {
        pOne,
        pTwo,
        getBoard
    }
})();

Gameboard.pOne.sayName();
Gameboard.pTwo.sayName();
console.log(Gameboard.getBoard());