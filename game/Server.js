const GAME_NAME = "Cupido"
const {State} = require("./State");
const {move} = require("./Logic");
const {visualize} = require("./Interface");
const { io } = require("socket.io-client");
const socket = io("https://browserjam-event-server.herokuapp.com/" + GAME_NAME);
const players = new Map()
let currentState = {}
let lines = ""

function joinGame(roomName, playerName) {
    socket.emit('join', {
        room: roomName,
        player: { name: playerName }
    });
}

function leaveGame() {
    socket.emit('leave');
    addLog("Left the game")
}

function doMoveAndUpdateState(cell1, cell2) {
    if (socket.id === currentState.turn) {
        let newState = move(currentState, cell1, cell2)
        currentState = newState
        socket.emit('state', currentState);
    }
}

function myTurn() {
    return currentState.turn == socket.id
}

socket.on('join', player => {
    players[player.id] = player;
    addLog(JSON.stringify(player) + " joined the game")

    if ( player.id !== socket.id && Object.keys(players).length === 2 ) {
        currentState = new State(41)
        currentState.turn = Object.keys(players)[Math.floor(Math.random(0, players.length))]
        socket.emit('state', currentState);
    }

    if (players.size > 2) {
        socket.emit('message', { message: 'intruder!' });
    }
});

socket.on('state', (state, player) => {
    currentState = state
    addLog("New state: " + JSON.stringify(currentState))
    visualize(currentState)
});

socket.on('leave', player => {
    addLog(JSON.stringify(player) + " left the game")
});

function addLog(message) {
    lines = lines + "<br/><br/>" + message
    document.querySelector('#debugp').textContent = lines
    document.querySelector('#debugp').innerHTML = lines
}

exports.joinGame = joinGame
exports.doMoveAndUpdateState = doMoveAndUpdateState
exports.myTurn = myTurn
exports.leaveGame = leaveGame
