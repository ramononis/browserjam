function visualize(state) {
    if (!state) return
    const table = document.querySelector('#table-board')
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    console.log(state)

    state.board.forEach((stateRow, row) => {
        console.log(stateRow);
        let tableRow = table.insertRow();
        stateRow.forEach((stateCell, col) => {
            let tableCell = tableRow.insertCell();
            tableCell.classList.add('dropzone')
            tableCell.id = `c-${row}-${col}`
            tableCell.setAttribute('row', `${row}`)
            tableCell.setAttribute('col', `${col}`)

            let cell = document.createElement('div')
            cell.classList.add('draggable',`type-${stateCell}`)
            cell.setAttribute('draggable', 'true')
            cell.innerText = stateCell

            tableCell.appendChild(cell)
        })
    })
}

let dragged;

// /* events fired on the draggable target */
// document.addEventListener("drag", function(event) {
//
// }, false);

document.addEventListener("dragstart", function(event) {
    dragged = event.target.parentNode;
    event.target.style.opacity = '.5';
}, false);

document.addEventListener("dragend", function(event) {
    event.target.style.opacity = "";
}, false);

document.addEventListener("dragover", function(event) {
    event.preventDefault();
}, false);

document.addEventListener("dragenter", function(event) {
    let target = event.target
    while(target) {
        if (event.target.className === "dropzone") {
            event.target.style.background = "purple";
            break;
        }
        target = target.parentNode
    }

}, false);

document.addEventListener("dragleave", function(event) {
    // reset background of potential drop target when the draggable element leaves it
    let target = event.target
    while(target) {
        if (event.target.className === "dropzone") {
            event.target.style.background = "";
            break;
        }
        target = target.parentNode
    }
}, false);

document.addEventListener("drop", function(event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target

    let target = event.target
    while(target) {
        if (event.target.className === "dropzone") {
            event.target.style.background = "";
            let row1 = dragged.getAttribute('row')
            let col1 = dragged.getAttribute('col')
            let row2 = target.getAttribute('row')
            let col2 = target.getAttribute('col')
            doMoveAndUpdateState(row1, col1, row2, col2)
            break;
        }
        target = target.parentNode
    }
}, false);


exports.visualize = visualize
