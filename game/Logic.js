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
function _swapCells(state, cell1, cell2) {
    return state
}

// Return a list of matches found in the current state
function _findMatches(state) {
    return []
}

// Removes the provided cells from the states, moves remaining cells 'down', fills empty space with new cells.
function _removeCells(state, cellsToRemove) {
    return state
}

exports.move = move
