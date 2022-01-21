const MIN_MATCH_LENGTH = 3
function move(state, x1, y1, x2, y2) {
    // Check that selected cells are adjacent
    if !_cellsAreAdjacent(state, x1, y1, x2, y2) {
        // invalid move,
        // TODO: emit something?
        return;
    }

    // Swap cells
    _swapCells(state, x1, y1, x2, y2)

    // While matches are detected:
    for (let matches = _findMatches(state); matches.length > 0; matches = _findMatches(state)) {
        let cellsToRemove = []
        matches.forEach(m => {
            console.log(m)
            // Assign score
        })
        //Remove cells
        _removeCells(state, cellsToRemove)
    }

    return state
}

// Check whether cells are allowed to be swapped
function _cellsAreAdjecent(state, x1, y1, x2, y2) {
    if (x1 === x2 && (y1 === y2-1 || y1 == y2 + 1)) { return true}
    if (y1 === y2 && (x1 === x2-1 || x1 == x2 + 1)) { return true}
    return false
}

// Swap cells (changes the state!)
function _swapCells(state, x1, y1, x2, y2) {
    let cell1 = state.board[y1][x1]
    let cell2 = state.board[y2][x2]
    state.board[y2][x2] = cell1
    state.board[y1][x1] = cell2
    return state
}

// Return a list of matches found in the current state
function _findMatches(state) {
    let matches = {}
    matches['equal'] = []
    matches['diff'] = []

    // Horizontal matches
    for (let y = 0; y < state.board.length - (MIN_MATCH_LENGTH - 1); y++) {
        for (let x = 0; x < state.board.lenght - (MIN_MATCH_LENGTH - 1); x++) {
            let col = state.board[y][x]
            let end = x + 1
            let match = []
            while (end < state.board.lenght && state.board[y][end] === col) {
                match.push({x: end, y: y})
                end++
            }
            if (end - x >= MIN_MATCH_LENGTH) { // This is a match
                matches.equal.push(match)
            }
            x = end - 1
        }
    }

    // Horizontal matches
    for (let x = 0; x < state.board.length - (MIN_MATCH_LENGTH - 1); x++) {
        for (let y = 0; y < state.board.lenght - (MIN_MATCH_LENGTH - 1); y++) {
            let col = state.board[y][x]
            let end = y + 1
            let match = []
            while (end < state.board.lenght && state.board[end][x] === col) {
                match.push({x: x, y: end})
                end++
            }
            if (end - y >= MIN_MATCH_LENGTH) { // This is a match
                matches.equal.push(match)
            }
            y = end - 1
        }
    }

    return matches
}

// Removes the provided cells from the states, moves remaining cells 'down', fills empty space with new cells.
function _removeCells(state, cellsToRemove) {
    // Clear cells
    cellsToRemove.forEach(c => {
        state.board[c.y][c.x] = null
    })

    // Move cells down
    for (let y = state.board.length - 1; y >= 0; y--) {
        for (let x = state.board.length - 1; x >= 0; x--) {
            if (board.state[y][x] === null) {
                for (let y2 = y; y <= 0; y--) {
                    if (board.state[y2][x] !== null) {
                        state = _swapCells(state, x, y, x, y2)
                        break
                    }
                }
            }
        }
    }

    for (let y = state.board.length - 1; y >= 0; y--) {
        for (let x = state.board.length - 1; x >= 0; x--) {
            if (board.state[y][x] === null) {
                board.state[y][x] = Math.floor(Math.random(0, N_COLORS))
            }
        }
    }

    return state
}

exports.move = move
