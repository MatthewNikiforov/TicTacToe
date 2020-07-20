const gameState = {

    turn: 'X',
    turnDisplay: document.querySelector('.turn-display'),

    checkVictory(turn) {
        if ((field.cells[1] === turn && field.cells[2] === turn && field.cells[3] === turn) || 
            (field.cells[4] === turn && field.cells[5] === turn && field.cells[6] === turn) ||
            (field.cells[7] === turn && field.cells[8] === turn && field.cells[9] === turn) ||
            (field.cells[1] === turn && field.cells[4] === turn && field.cells[7] === turn) ||
            (field.cells[2] === turn && field.cells[5] === turn && field.cells[8] === turn) ||
            (field.cells[3] === turn && field.cells[6] === turn && field.cells[9] === turn) ||
            (field.cells[1] === turn && field.cells[5] === turn && field.cells[9] === turn) ||
            (field.cells[3] === turn && field.cells[5] === turn && field.cells[7] === turn)) {          
            return true
        } else {
            return false
        }
    }, 

    checkDraw() {
        let fieldIsFilled = true
        for (let cell in field.cells) {
            if (field.cells[cell] === '') {
                fieldIsFilled = false
                break
            }
        }
        return (fieldIsFilled && (this.checkVictory('X') === false) && (this.checkVictory('0') === false))
    },

    startGame() {
        field.addEventListenersCells()
        restartButton.addRestartEventListener()
    }
}

const field = {

    cells: {1: '', 2: '', 3: '', 4: '', 5: '', 6: '', 7: '', 8: '', 9: ''},

    makeTurn(cell, cellNumber) {
        return function() {
            if ((cell.textContent !== ' ') && (cell.textContent !== 'X') && (cell.textContent !== '0')) {
                cell.textContent = gameState.turn
                field.cells[cellNumber] = gameState.turn

                if (gameState.checkVictory(gameState.turn)) {
                    statistics.renewStats(gameState.turn)
                    setTimeout(alert, 500, `${gameState.turn} has won!`)
                    setTimeout(restartButton.clearCells(), 500)
                } else if (gameState.checkDraw()) {
                    statistics.renewStats('draw')
                    setTimeout(alert, 500, 'Draw')
                    setTimeout(restartButton.clearCells(), 500)
                } else {
                    gameState.turn = (gameState.turn === '0') ? 'X' : '0'
                    document.querySelector('.turn-display').textContent = gameState.turn
                }
            }
        }
    },
    
    addEventListenersCells() {
        for (let cellNumber in this.cells) {
            let cellClass = '.cell-' + cellNumber
            let cell = document.querySelector(cellClass)
            cell.addEventListener('click', this.makeTurn(cell, cellNumber))
        }
    }
}

const restartButton = {

    clearCells() {
        return function() {
            for (let cellNumber in field.cells) {
                let cellClass = '.cell-' + cellNumber
                let cell = document.querySelector(cellClass)
                cell.textContent = ''
                field.cells[cellNumber] = ''
            }
            gameState.turn = 'X'
            gameState.turnDisplay.textContent = gameState.turn
        }
    },

    addRestartEventListener() {
        let restartButton = document.querySelector('.restart-button')
        restartButton.addEventListener('click', this.clearCells())
    }
}

const statistics = {

    renewStats(counter) {
        let counterClass

        switch (counter) {
            case 'X':
                counterClass = '.x-wins'
                break
            
            case '0': 
                counterClass = '.o-wins'
                break
            
            case 'draw':
                counterClass = '.draws'
                break
        }

        let counterElement = document.querySelector(counterClass).querySelector('.count')
        counterElement.textContent = (parseInt(counterElement.textContent) + 1).toString()
    }   
}


gameState.startGame()