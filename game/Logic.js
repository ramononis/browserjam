function move(state, cell1, cell2) {
    // Check that selected cells are adjacent
    if !_cellsAreAdjacent(state, cell1, cell2) {
        // invalid move,
        // TODO: emit something?
        return;
    }

    // Swap cells
    _swapCells(state, cell1, cell2)

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
function _cellsAreAdjecten(state, cell1, cell2) {
    return true
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
