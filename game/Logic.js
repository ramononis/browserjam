const {N_COLORS} = require("./State");
const {highlight} = require("./Interface");
const MIN_MATCH_LENGTH = 3
const MIN_DIFF_LENGTH = N_COLORS - 2
function move(state, x1, y1, x2, y2) {
    // Check that selected cells are adjacent
    if (!_cellsAreAdjacent(state, x1, y1, x2, y2)) {
        // invalid move,
        // TODO: emit something?
        return state;
    }

    // Swap cells
    _swapCells(state, x1, y1, x2, y2)

    // While matches are detected:
    for (let matches = _findMatches(state); (matches.equal.length > 0 || matches.diff.length > 0); matches = _findMatches(state)) {
        let cellsToRemove = []
        matches.equal.forEach(m => {
            state.score1++
            m.forEach(c => {
                cellsToRemove.push(c)
            })
        })
        matches.diff.forEach(m => {
            state.score2++
            m.forEach(c => {
                cellsToRemove.push(c)
            })
        })
        //Remove cells
        _removeCells(state, cellsToRemove)
    }

    return state
}

// Check whether cells are allowed to be swapped
function _cellsAreAdjacent(state, x1, y1, x2, y2) {
    if (x1 === x2 && (y1 === y2-1 || y1 === y2 + 1)) { return true}
    if (y1 === y2 && (x1 === x2-1 || x1 === x2 + 1)) { return true}
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

    // Horizontal equal matches
    for (let y = 0; y < state.board.length; y++) {
        for (let x = 0; x < state.board.length - (MIN_MATCH_LENGTH - 1); x++) {
            let col = state.board[y][x]
            let end = x + 1
            let match = [{x: x, y: y}]
            while (end < state.board.length && state.board[y][end] === col) {
                match.push({x: end, y: y})
                end++
            }
            if (end - x >= MIN_MATCH_LENGTH) { // This is a match
                matches.equal.push(match)
            }
            x = end - 1
        }
    }

    // Vertical equal matches
    for (let x = 0; x < state.board.length; x++) {
        for (let y = 0; y < state.board.length - (MIN_MATCH_LENGTH - 1); y++) {
            let col = state.board[y][x]
            let end = y + 1
            let match = [{x: x, y: y}]
            while (end < state.board.length && state.board[end][x] === col) {
                match.push({x: x, y: end})
                end++
            }
            if (end - y >= MIN_MATCH_LENGTH) { // This is a match
                matches.equal.push(match)
            }
            y = end - 1
        }
    }

    // Horizontal diff matches
    for (let y = 0; y < state.board.length; y++) {
        for (let x = 0; x < state.board.length - (MIN_DIFF_LENGTH - 1); x++) {
            let cols = [state.board[y][x]]
            let end = x + 1
            let diff = [{x: x, y: y}]
            while (end < state.board.length && !cols.includes(state.board[y][end])) {
                diff.push({x: end, y: y})
                cols.push(state.board[y][end])
                end++
            }
            if (cols.length >= MIN_DIFF_LENGTH) {
                matches.diff.push(diff)
            }
            x = end - 1
        }
    }

    // Vertical diff matches
    for (let x = 0; x < state.board.length; x++) {
        for (let y = 0; y < state.board.length - (MIN_DIFF_LENGTH - 1); y++) {
            let cols = [state.board[y][x]]
            let end = y + 1
            let diff = [{x: x, y: y}]
            while (end < state.board.length && !cols.includes(state.board[end][x])) {
                diff.push({x: end, y: y})
                cols.push(state.board[y][end])
                end++
            }
            if (cols.length >= MIN_DIFF_LENGTH) {
                matches.diff.push(diff)
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
            if (state.board[y][x] === null) {
                for (let y2 = y; y2 >= 0; y2--) {
                    if (state.board[y2][x] !== null) {
                        state = _swapCells(state, x, y, x, y2)
                        break
                    }
                }
            }
        }
    }

    for (let y = state.board.length - 1; y >= 0; y--) {
        for (let x = state.board.length - 1; x >= 0; x--) {
            if (state.board[y][x] === null) {
                state.board[y][x] = Math.floor(Math.random() * N_COLORS)
            }
        }
    }

    return state
}

function isValid(state, cell1, cell2) {
    // TODO
    return true
}

exports.move = move
