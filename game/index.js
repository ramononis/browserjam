const {State} = require("./State");
const {visualize} = require("./Interface");
const {joinGame} = require("./Server");
const {doMoveAndUpdateState} = require("./Server");
const {leaveGame} = require("./Server");

let state = new State(1)

document.addEventListener("DOMContentLoaded", () => {
    let playerNameInput = document.querySelector('#playername')
    let playerNameLabel = document.querySelector('#playernamelabel')
    let roomNameInput = document.querySelector('#roomname')
    let roomNameLabel = document.querySelector('#roomnamelabel')
    let join = document.querySelector('#join')
    join.addEventListener("click", () => {
        if (join.textContent === "Join") {
            joinGame(roomNameInput.value, playerNameInput.value)
            join.textContent = "Leave"
            playerNameInput.disabled = true
            roomNameInput.disabled = true
            playerNameLabel.disabled = true
            roomNameLabel.disabled = true
        } else {
            leaveGame()
            join.textContent = "Join"
            playerNameInput.disabled = false
            roomNameInput.disabled = false
            playerNameLabel.disabled = false
            roomNameLabel.disabled = false
        }
    })
    document.querySelector('#leave').addEventListener("click", () => { leaveGame() })
})


