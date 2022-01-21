function visualize(state) {
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
    dragged = event.target;
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

            break;
        }
        target = target.parentNode
    }
}, false);


exports.visualize = visualize
