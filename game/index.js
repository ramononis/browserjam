const {State} = require("./State");
const {visualize} = require("./Interface");
const {joinGame} = require("./Server");
const {doMoveAndUpdateState} = require("./Server");
const {leaveGame} = require("./Server");

let state = new State(1)

document.addEventListener("DOMContentLoaded", () => {
    // visualize({})
    document.querySelector('#join').addEventListener("click", () => { joinGame("testRoomFour", "player" + Math.floor(Math.random() * 1000)) })
    document.querySelector('#move').addEventListener("click", () => { doMoveAndUpdateState({}, {}) })
    document.querySelector('#leave').addEventListener("click", () => { leaveGame() })
})


