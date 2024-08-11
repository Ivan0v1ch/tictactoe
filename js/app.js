const tableGame = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
]
const table = document.querySelector('.table')
const btn=document.querySelector('.btn-restart')
const winLine=document.getElementById('winElement')

let ticCount = 0;
let tacCount = 0;



const createTicTac = (style) => {
    const tictac = document.createElement('p')
    tictac.classList.add(`${style}`);
    if (style === 'tic') {
        tictac.innerText = "X";
        return tictac;
    } else {
        tictac.innerText = "O";
        return tictac;
    }
}

const createMessage = () => {

}

const choiceTicTac = (isFull, element) => {
    if (isFull !== "") return;

    if (tacCount > ticCount) {
        const shape = createTicTac('tic');
        element.appendChild(shape)
        ticCount++;

    } else {
        const shape = createTicTac('tac');
        element.appendChild(shape)
        tacCount++;
        return 'tac';
    }
}

const addPosition = (column, row, tictac) => {
    if (tictac === 'tac') {
        tableGame[row][column] = 1
        return tableGame;
    } else {
        tableGame[row][column] = 2
        return tableGame;
    }
}

const horizontalWin = (tableGame) => {
    const firstRow = tableGame[0];
    const secondRow = tableGame[1];
    const thirdRow = tableGame[2];
    if ((firstRow[0] === 1) && (firstRow[1] === 1) && (firstRow[2] === 1) || (firstRow[0] === 2) && (firstRow[1] === 2) && (firstRow[2] === 2)) {        
        table.classList.add('disable-table')
        winLine.classList.add('firstRowWin')
    } else if ((secondRow[0] === 1) && (secondRow[1] === 1) && (secondRow[2] === 1) || (secondRow[0] === 2) && (secondRow[1] === 2) && (secondRow[2] === 2)) {
        table.classList.add('disable-table')
        winLine.classList.add('secondRowWin')
    } else if ((thirdRow[0] === 1) && (thirdRow[1] === 1) && (thirdRow[2] === 1) || (thirdRow[0] === 2) && (thirdRow[1] === 2) && (thirdRow[2] === 2)) {
        table.classList.add('disable-table')
        winLine.classList.add('thirdRowWin')
    }
}


const verticalWin = (tableGame) => {
    const firstRow = tableGame[0]
    const secondRow = tableGame[1]
    const thirdRow = tableGame[2]
    if ((firstRow[0] === 1) && (secondRow[0] === 1) && (thirdRow[0] === 1) || (firstRow[0] === 2) && (secondRow[0] === 2) && (thirdRow[0] === 2)) {
        table.classList.add('disable-table')
        winLine.classList.add('firstColumnWin')
    } else if ((firstRow[1] === 1) && (secondRow[1] === 1) && (thirdRow[1] === 1) || (firstRow[1] === 2) && (secondRow[1] === 2) && (thirdRow[1] === 2)) {
        table.classList.add('disable-table')
        winLine.classList.add('secondColumnWin')
    } else if ((firstRow[2] === 1) && (secondRow[2] === 1) && (thirdRow[2] === 1) || (firstRow[2] === 2) && (secondRow[2] === 2) && (thirdRow[2] === 2)) {
        table.classList.add('disable-table')
        winLine.classList.add('thirdColumnWin')
    }
}

const crossedWin = (tableGame) => {
    const firstRow = tableGame[0]
    const secondRow = tableGame[1]
    const thirdRow = tableGame[2]
    if ((firstRow[0] === 1) && (secondRow[1] === 1) && (thirdRow[2] === 1) || (firstRow[0] === 2) && (secondRow[1] === 2) && (thirdRow[2] === 2)) {
        table.classList.add('disable-table')
        winLine.classList.add('crossed-one')
    } else if ((firstRow[2] === 1) && (secondRow[1] === 1) && (thirdRow[0] === 1) || (firstRow[2] === 2) && (secondRow[1] === 2) && (thirdRow[0] === 2)) {
        table.classList.add('disable-table')
        winLine.classList.add('crossed-two')
    }
}

const winMatch = (tableGame) => {
    horizontalWin(tableGame)
    verticalWin(tableGame)
    crossedWin(tableGame)
}


const addTicTac = (e) => {
    const element = e.target.className;
    const full = e.target.innerText;
    const box = document.querySelector(`.${element}`);
    const column = parseInt(e.target.dataset.col);
    const row = parseInt(e.target.dataset.row);
    const tictac = choiceTicTac(full, box);
    const matchGame = addPosition(column, row, tictac);
    winMatch(matchGame)
}


const resetGame = () => {    
    for (let i = 0; i < tableGame.length; i++) {
        tableGame[i] = [0, 0, 0];
    }    

    const cells = table.querySelectorAll('td p');
    cells.forEach(cell => cell.remove());    
    table.classList.remove('disable-table');
    winLine.classList.remove('firstRowWin', 'secondRowWin', 'thirdRowWin', 
                               'firstColumnWin', 'secondColumnWin', 'thirdColumnWin',
                               'crossed-one', 'crossed-two');
    
    ticCount = 0;
    tacCount = 0;
}



table.addEventListener('click', addTicTac)
table.addEventListener('click', winMatch)
btn.addEventListener('click', resetGame);
