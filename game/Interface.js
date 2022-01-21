// TODO: index.html en visualize implementeren
function visualize(state) {
    const table = document.querySelector('#table-board')
    console.log(state)

    state.board.forEach((stateRow, row) => {
        console.log(stateRow);
        let tableRow = table.insertRow();
        stateRow.forEach((stateCell, col) => {
            let tableCell = tableRow.insertCell();
            tableCell.classList.add('dropzone')
            tableCell.id = `c-${row}-${col}`

            let cell = document.createElement('div')
            cell.classList.add('draggable',`type-${stateCell}`)
            cell.setAttribute('draggable', 'true')

            tableCell.appendChild(cell)
        })
    })
}

exports.visualize = visualize