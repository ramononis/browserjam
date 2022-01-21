const GAME_NAME = "Cupido"
const {State} = require("./State");
const {move} = require("./Logic");
const {visualize} = require("./Interface");
const { io } = require("socket.io-client");
const socket = io("https://browserjam-event-server.herokuapp.com/" + GAME_NAME);
const players = new Map()
let currentState = {}
let lines = ""
let idOtherPlayer = ""

function joinGame(roomName, playerName) {
    socket.emit('join', {
        room: roomName,
        player: { name: playerName }
    });
}

function leaveGame() {
    socket.emit('leave');
    addLog("Leaving the game")
}

function doMoveAndUpdateState(row1, col1, row2, col2) {
    if (socket.id === currentState.turn) {
        let newState = move(currentState, col1, row1, col2, row2)
        currentState = newState
        currentState.turn = idOtherPlayer
        socket.emit('state', currentState);
    }
}

function myTurn() {
    return currentState.turn == socket.id
}

socket.on('join', player => {
    players[player.id] = player;
    addLog(player.id + " joined the game")

    if (player.id !== socket.id) {
        idOtherPlayer = player.id
    }

    if ( player.id !== socket.id && Object.keys(players).length === 2 ) {
        currentState = move(new State(41), 0, 0, 0, 1)
        currentState.score1 = 0
        currentState.turn = idOtherPlayer
        socket.emit('state', currentState);
    }

    if (players.size > 2) {
        socket.emit('message', { message: 'intruder!' });
    }
});

socket.on('state', (state, player) => {
    currentState = state
    visualize(currentState)
});

socket.on('leave', player => {
    addLog(player.id + " left the game")
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
