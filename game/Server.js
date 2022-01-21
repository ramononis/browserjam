const GAME_NAME = "Cupido"

const {State} = require("./State");
const {move} = require("./Logic");
const {visualize} = require("./Interface");
const { io } = require("socket.io-client");
const socket = io("https://browserjam-event-server.herokuapp.com/" + GAME_NAME);
const players = {}
let currentState = {}

function joinGame(roomName, playerName) {
    socket.emit('join', {
        room: roomName,
        player: { name: playerName }
    });
}

function doMoveAndUpdateState(cell1, cell2) {
    let newState = move(currentState, cell1, cell2)
    socket.emit('state', newState);
}

function myTurn() {
    return currentState.turn == socket.id
}

socket.on('join', player => {
    players[player.id] = player;

    if ( player.id !== socket.id && players.size === 2 ) {
        currentState = new State(41)
        currentState.turn = players.keys[Math.floor(Math.random(0, players.length))]
        socket.emit('state', currentState);
    }

    if (players.size > 2) {
        socket.emit('message', { message: 'intruder!' });
    }
});

socket.on('state', (state, player) => {
    currentState = state
    if (player.id === socket.id) {
        // ignore, player last moved
    } else {
        visualize(state)
    }
});
